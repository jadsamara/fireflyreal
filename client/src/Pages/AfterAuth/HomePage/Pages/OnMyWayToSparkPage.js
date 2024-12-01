import { View, Text } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";

import styled from "styled-components";

import { InitialPage } from "./OnMyWayToSparkComponents/InitialPageComponents/InitialPage";
import { LivePage } from "./OnMyWayToSparkComponents/LivePageComponents/LivePage";

import { database, auth } from "../../../../Config/firebase";
import {
  doc,
  updateDoc,
  getDoc,
  collection,
  setDoc,
  arrayUnion,
} from "firebase/firestore";

import { getProfilePicture } from "../../../../Functions/GetProfilePicture";
import { ArrivedPage } from "./OnMyWayToSparkComponents/ArrivedPageComponents/ArrivedPage";

import throttle from "lodash.throttle";

import { getTimeState } from "../../../../Functions/ArrivalTimeFunctions";

export const OnMyWayToSparkPage = ({ navigation, route }) => {
  const { spark } = route.params;
  const [myLocation, setMyLocation] = useState(null);
  const [updatedLocation, setUpdatedLocation] = useState(null);
  const [arrivedToLocation, setArrivedToLocation] = useState(false);

  const locationSubscription = useRef(null);

  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const updateUserLocation = async (location) => {
      try {
        if (!auth.currentUser) {
          console.error("User not authenticated");
          return;
        }

        const userId = auth.currentUser.phoneNumber;

        const arrivedPartyDocRef = doc(
          collection(database, "ArrivedParty"),
          spark.currentDocID
        );
        const arrivedPartyDocSnapshot = await getDoc(arrivedPartyDocRef);
        if (arrivedPartyDocSnapshot.exists()) {
          const arrivedPartyData = arrivedPartyDocSnapshot.data();
          const userArrived = arrivedPartyData.arrivals.some(
            (arrival) => arrival.phoneNumber === userId
          );
          if (userArrived) {
            setArrivedToLocation(true);
            console.log("User has already arrived");
            return;
          }
        }

        const userLocationRef = doc(
          database,
          "DeviceLocations",
          spark.currentDocID
        );

        const profilePicture = await getProfilePicture(userId);
        const docSnapshot = await getDoc(userLocationRef);
        let currentData = docSnapshot.exists() ? docSnapshot.data() : {};

        if (!currentData.Array) {
          currentData.Array = [];
        }

        const index = currentData.Array.findIndex(
          (item) => item.userId === userId
        );
        if (index !== -1) {
          currentData.Array[index] = {
            userId,
            latitude: location.latitude,
            longitude: location.longitude,
            timestamp: new Date().getTime(),
            profilePicture,
          };
        } else {
          currentData.Array.push({
            userId,
            latitude: location.latitude,
            longitude: location.longitude,
            timestamp: new Date().getTime(),
            profilePicture,
          });
        }

        await updateDoc(userLocationRef, { Array: currentData.Array });

        const updatedDoc = await getDoc(userLocationRef);
        if (updatedDoc.exists()) {
          setUpdatedLocation(updatedDoc.data());
        } else {
          console.error("Updated document does not exist");
        }
      } catch (error) {
        console.error("Error updating user location:", error);
      }
    };

    const startLocationTracking = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setMyLocation(location.coords);
      updateUserLocation(location.coords);

      locationSubscription.current = await Location.watchPositionAsync(
        { distanceInterval: 1, accuracy: Location.Accuracy.High },
        throttle((newLocation) => {
          setMyLocation(newLocation.coords);
          updateUserLocation(newLocation.coords);
        }, 1)
      );
    };

    if (!arrivedToLocation) {
      startLocationTracking();
    } else if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }
  }, [arrivedToLocation]);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = spark.chosenTime - Date.now();
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [spark]);

  useEffect(() => {
    if (arrivedToLocation) {
      const addArrival = async () => {
        const userId = auth.currentUser.phoneNumber;
        const arrivedPartyRef = collection(database, "ArrivedParty");
        const arrivedPartyDocRef = doc(arrivedPartyRef, spark.currentDocID);
        const timeInMs = new Date().getTime();
        const timeState = getTimeState(timeRemaining); // Get the time state

        const sparkID = spark.currentDocID;
        const sparkRef = doc(database, "Sparks", sparkID);
        const peopleLeftToReview = {
          user: userId,
          peopleLeft: spark.currentlyJoinedProfileParticipants || [], // Ensure it's a flat array
        };
        const flattenedData = peopleLeftToReview.peopleLeft.map((person) => ({
          user: userId,
          personLeft: person,
        }));

        // await updateDoc(sparkRef, {
        //   peopleLeftToReview: peopleLeftToReview, // Add or overwrite peopleLeftToReview field
        // });

        try {
          // Fetch the current document data
          const docSnapshot = await getDoc(arrivedPartyDocRef);

          if (docSnapshot.exists()) {
            const data = docSnapshot.data();
            const arrivals = data.arrivals || [];

            // Check if userId already exists in arrivals
            const userAlreadyExists = arrivals.some(
              (arrival) => arrival.phoneNumber === userId
            );

            if (!userAlreadyExists) {
              // Add arrival if userId is not present
              await updateDoc(arrivedPartyDocRef, {
                arrivals: arrayUnion({
                  phoneNumber: userId,
                  timeInMs,
                  timeState,
                }),
              });
            }
          } else {
            // Initialize the document with the first arrival if it doesn't exist
            await setDoc(arrivedPartyDocRef, {
              arrivals: [{ phoneNumber: userId, timeInMs, timeState }],
            });
          }

          await Promise.all(
            flattenedData.map((entry) =>
              updateDoc(sparkRef, {
                userReviewList: arrayUnion(entry),
              })
            )
          );
        } catch (error) {
          console.error("Error updating arrivals:", error);
        }
      };

      addArrival();
    }
  }, [arrivedToLocation]);

  if (arrivedToLocation) {
    return (
      <Container>
        <ArrivedPage
          spark={spark}
          navigation={navigation}
          timeRemaining={timeRemaining}
        />
      </Container>
    );
  } else if (!updatedLocation) {
    return (
      <Container>
        <InitialPage spark={spark} />
      </Container>
    );
  } else if (updatedLocation && !arrivedToLocation) {
    return (
      <Container>
        <LivePage
          spark={spark}
          myLocation={myLocation}
          updatedLocation={updatedLocation}
          setArrivedToLocation={setArrivedToLocation}
          navigation={navigation}
          setTimeRemaining={setTimeRemaining}
          timeRemaining={timeRemaining}
        />
      </Container>
    );
  }
};

const Container = styled(View)`
  flex: 1;
`;
