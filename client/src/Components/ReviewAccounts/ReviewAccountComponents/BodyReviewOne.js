import {
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text,
  PanResponder,
} from "react-native";
import React, { useState, useRef } from "react";
import styled from "styled-components/native";

import Icon from "react-native-vector-icons/FontAwesome";
import { MaterialIcons } from "@expo/vector-icons";
import { ReportPageComponent } from "./ReportPageComponent";

import { database } from "../../../Config/firebase";
import { doc, getDoc, updateDoc, increment } from "firebase/firestore";

export const BodyReviewOne = ({
  setIsModalActive,
  participant = {},
  goToNextParticipant,
}) => {
  const { allPhotos = [], name } = participant;
  const [rating, setRating] = useState(0);
  const [reportModal, setReportModal] = useState(false);

  const starSize = 50;
  const starSpacing = 10;
  const starCount = 5;
  const totalWidth = starCount * (starSize + starSpacing) - starSpacing;
  const screenWidth = Dimensions.get("window").width;

  // Create a PanResponder to handle drag gestures

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        // Calculate the rating based on the gesture's X position
        const xPos = gestureState.moveX - (screenWidth - totalWidth) / 2;
        const calculatedRating = Math.max(
          0,
          Math.min(starCount, xPos / (starSize + starSpacing))
        );

        // Set rating, rounding to the nearest half star
        setRating(Math.round(calculatedRating * 2) / 2);
      },
      onPanResponderRelease: () => {
        // Ensure the rating is finalized after drag
        setRating((prevRating) => Math.round(prevRating * 2) / 2);
      },
    })
  ).current;

  // Function to handle taps directly on a star
  const handleStarPress = (star) => {
    setRating(star);
  };

  const onHandleOpenReport = () => {
    setReportModal(true);
  };

  const onHandleSubmitReview = async () => {
    try {
      const userDocRef = doc(database, "Users", participant.userNumber); // Reference to the document

      // Get the current document data
      const userDocSnap = await getDoc(userDocRef);

      if (userDocSnap.exists()) {
        // Fetch current values from the document
        const currentNumberOfRatings = userDocSnap.data().numberOfRatings || 0;
        const currentAverageUserRating =
          userDocSnap.data().averageUserRating || 0;

        // Calculate the new average user rating
        const newAverageUserRating =
          (currentAverageUserRating * currentNumberOfRatings + rating) /
          (currentNumberOfRatings + 1);

        // Update the number of ratings and average user rating
        await updateDoc(userDocRef, {
          numberOfRatings: increment(1), // Increment numberOfRatings by 1
          averageUserRating: newAverageUserRating, // Update the average rating
        });

        goToNextParticipant();
        setIsModalActive(false); // Close the modal after updating
        console.log(
          "User's rating count and average rating updated successfully."
        );
      } else {
        console.log("User document does not exist.");
      }
    } catch (error) {
      console.error(
        "Error updating numberOfRatings and averageUserRating:",
        error
      );
    }
  };

  if (reportModal) {
    return (
      <Container>
        <PhotoImage source={{ uri: allPhotos[0].picture }}>
          <DarkTint>
            <ReportPageComponent
              participant={participant}
              setReportModal={setReportModal}
            />
          </DarkTint>
        </PhotoImage>
      </Container>
    );
  }

  return (
    <Container>
      <PhotoImage source={{ uri: allPhotos[0].picture }}>
        <DarkTint>
          <HeaderText>How was {name}?</HeaderText>
          <ReviewContainer>
            <SubTitleOne>Rate {name} out of five stars</SubTitleOne>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
              {...panResponder.panHandlers} // Attach panHandlers to the View
            >
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => handleStarPress(star)}
                >
                  <Icon
                    name={
                      rating >= star
                        ? "star"
                        : rating >= star - 0.5
                        ? "star-half-full"
                        : "star-o"
                    }
                    size={starSize}
                    color={rating >= star ? "#32CD32" : "#ccc"} // Green for filled, gray for empty
                    style={{ marginHorizontal: starSpacing / 2 - 1 }}
                  />
                </TouchableOpacity>
              ))}
            </View>

            <SubTitleTwo>Saw something you didn't like?</SubTitleTwo>
            <ReportButton onPress={onHandleOpenReport}>
              <MaterialIcons name="report" size={26} color="white" />
              <ReportText>Report {name}</ReportText>
            </ReportButton>
          </ReviewContainer>
          <ContinueButtonContainer>
            <ContinueButton
              onPress={onHandleSubmitReview}
              backgroundColor={rating === 0 ? "gray" : "#79d17c"}
              disabled={rating === 0}
            >
              <ContinueButtonText>Continue</ContinueButtonText>
            </ContinueButton>
          </ContinueButtonContainer>
        </DarkTint>
      </PhotoImage>
    </Container>
  );
};

const Container = styled(View)`
  height: 85%;
  width: 100%;
`;

const PhotoImage = styled(ImageBackground).attrs({
  blurRadius: 50,
})`
  width: 100%;
  height: 100%;
  position: relative;
`;

const DarkTint = styled(View)`
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  background-color: rgba(0, 0, 0, 0.6);
`;

const HeaderText = styled(Text)`
  font-size: 26px;
  color: white;
  font-family: poppins-700;
  margin-top: 35px;
  margin-left: 20px;
`;

const ReviewContainer = styled(View)`
  margin-top: 50px;
`;

const SubTitleOne = styled(Text)`
  font-size: 17px;
  color: white;
  font-family: poppins-700;
  text-align: center;
`;

const SubTitleTwo = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-600;
  text-align: center;
  margin-top: 80px;
`;

const ReportButton = styled(TouchableOpacity)`
  flex-direction: row;
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const ReportText = styled(Text)`
  font-size: 18px;
  color: white;
  font-family: poppins-400;
  margin-left: 5px;
`;

const ContinueButtonContainer = styled(View)`
  position: absolute;
  bottom: 130px;
  width: 100%;
  align-items: center;
`;

const ContinueButton = styled(TouchableOpacity)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 200px;
  height: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const ContinueButtonText = styled(Text)`
  font-size: 16px;
  color: white;
  font-family: poppins-600;
`;
