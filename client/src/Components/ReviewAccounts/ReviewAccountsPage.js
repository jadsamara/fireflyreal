import { View, ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";

import styled from "styled-components";

import { Header } from "./ReviewAccountComponents/Header";
import { Body } from "./ReviewAccountComponents/Body";
import { BodyReviewOne } from "./ReviewAccountComponents/BodyReviewOne";

import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
} from "firebase/firestore";
import { auth, database } from "../../Config/firebase";

import { onHandleRefundInteger } from "../../Functions/ArrivalTimeFunctions";
import { useDispatch } from "react-redux";
import { updateUserLumins } from "../../Slices/userSlice";

export const ReviewAccountsPage = ({ navigation, route }) => {
  const { spark, arrivalData } = route.params;
  const [participants, setParticipants] = useState([]);
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentParticipantIndex, setCurrentParticipantIndex] = useState(0); // Index to track which participant is being reviewed
  const [participant, setParticipant] = useState(null); // Initially null, will be set later
  const dispatch = useDispatch();

  const userNumber = auth.currentUser.phoneNumber;

  useEffect(() => {
    const fetchParticipantInfo = async () => {
      if (!spark.userReviewList || spark.userReviewList.length === 0) {
        console.log("No users left to review.");
        setParticipants([]); // Clear participant info if no users
        return;
      }

      try {
        // Fetch participant info for each user in the userReviewList
        const participantData = await Promise.all(
          spark.userReviewList.map(async (reviewEntry) => {
            if (reviewEntry.user === userNumber) {
              const { personLeft } = reviewEntry; // Assuming the field is named personLeft
              const userDocRef = doc(database, "Users", personLeft); // Fetch user document from Firebase
              const userDoc = await getDoc(userDocRef);

              if (userDoc.exists()) {
                return { id: personLeft, ...userDoc.data() }; // Include the user ID and data
              } else {
                console.warn(`User with ID ${personLeft} not found.`);
                return { id: personLeft, error: "User not found" };
              }
            }
          })
        );

        setParticipants(participantData); // Update state with participant data
      } catch (error) {
        console.error("Error fetching participant info:", error);
        setParticipants([]); // Clear participant info on error
      }
    };

    fetchParticipantInfo();
  }, []);

  useEffect(() => {
    if (participants.length > 0) {
      setParticipant(participants[currentParticipantIndex]);
    }
  }, [currentParticipantIndex, participants]);

  const goToNextParticipant = async () => {
    if (participant) {
      // Mark the current participant as reviewed
      await markParticipantAsReviewed(participant.id);
    }
    if (currentParticipantIndex < participants.length - 1) {
      // markParticipantAsReviewed(participant)
      setCurrentParticipantIndex(currentParticipantIndex + 1);
    } else {
      try {
        const userDocRefSpark = doc(database, "Sparks", spark.currentDocID);
        await updateDoc(userDocRefSpark, {
          isCompleted: arrayUnion(userNumber),
        });

        const userDocRef = doc(database, "Users", userNumber);
        await updateDoc(userDocRef, {
          currentActiveSparks: arrayRemove(spark.currentDocID),
        });
        if (userNumber === spark.host) {
          await updateDoc(userDocRef, {
            postedSparksByUser: arrayRemove(spark.currentDocID),
          });
        }
        await updateDoc(userDocRef, {
          pastSparks: arrayUnion(spark.currentDocID),
        });

        onHandleUpdateUserLuminsSystem(userDocRef);

        navigation.navigate("DoneSparkPage");
      } catch (error) {
        console.error("Error updating user data: ", error);
      }
    }
  };

  const onHandleUpdateUserLuminsSystem = async (userDocRef) => {
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // Retrieve the current userLumins value
      const currentLumins = userDocSnapshot.data().userLumins || 0;

      // Calculate the updated userLumins value
      const updatedLumins =
        currentLumins +
        spark.luminsPrice +
        onHandleRefundInteger(arrivalData.timeState);

      // Update the userLumins field in the Firestore document'
      dispatch(updateUserLumins(updatedLumins));

      await updateDoc(userDocRef, {
        userLumins: updatedLumins,
      });
    }
  };

  const markParticipantAsReviewed = async (reviewedParticipantId) => {
    try {
      const sparkDocRef = doc(database, "Sparks", spark.currentDocID);

      // Fetch the latest userReviewList from Firestore
      const sparkDocSnapshot = await getDoc(sparkDocRef);
      const userReviewList = sparkDocSnapshot.exists()
        ? sparkDocSnapshot.data().userReviewList || []
        : [];

      // Remove the reviewed participant from the review list
      const updatedReviewList = userReviewList.filter(
        (entry) =>
          entry.personLeft !== reviewedParticipantId ||
          entry.user !== userNumber
      );

      // Update Firestore
      await updateDoc(sparkDocRef, {
        userReviewList: updatedReviewList,
      });
    } catch (error) {
      console.error("Error marking participant as reviewed:", error);
    }
  };

  if (!participant) {
    return (
      <Container>
        <ActivityIndicator size="large" color="#0000ff" />
      </Container>
    );
  }

  return (
    <Container>
      <Header navigation={navigation} participant={participant} />

      {!isModalActive ? (
        <Body
          navigation={navigation}
          setIsModalActive={setIsModalActive}
          participant={participant}
        />
      ) : (
        <BodyReviewOne
          navigation={navigation}
          setIsModalActive={setIsModalActive}
          participant={participant}
          goToNextParticipant={goToNextParticipant}
        />
      )}
    </Container>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
`;
