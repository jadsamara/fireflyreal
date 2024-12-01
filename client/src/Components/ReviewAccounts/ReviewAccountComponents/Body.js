import {
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text,
} from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";

import { calculateAge } from "../../../Functions/GetAgeNew";

export const Body = ({ navigation, setIsModalActive, participant = {} }) => {
  const { allPhotos = [], age, name, userBio } = participant;

  const [currentIndex, setCurrentIndex] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const validPhotos = allPhotos.filter((res) => res.picture);
  const indexBarWidth = screenWidth / validPhotos.length - 20; // Adjust the width to account for margin

  const handleNextPhoto = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % validPhotos.length);
  };

  const handlePreviousPhoto = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? validPhotos.length - 1 : prevIndex - 1
    );
  };

  const onHandleOpenReview = () => {
    setIsModalActive(true);
  };

  return (
    <Container>
      <PhotoImage source={{ uri: validPhotos[currentIndex].picture }}>
        <GoToNextPhotoButton onPress={handleNextPhoto} />
        <GoToPreviousPhotoButton onPress={handlePreviousPhoto} />

        <IndexBarRow>
          {validPhotos.map((res, index) => (
            <IndexBar
              key={index}
              width={indexBarWidth}
              isCurrent={index === currentIndex}
            />
          ))}
        </IndexBarRow>
        <ProfileInformationContainer>
          <Row>
            <ProfileInformationHeaderText>
              {name}, {calculateAge(age)}
            </ProfileInformationHeaderText>
          </Row>
          <BioText>{userBio}</BioText>
        </ProfileInformationContainer>

        <ReviewTagContainer>
          <ReviewTag onPress={onHandleOpenReview}>
            <ReviewText>Review</ReviewText>
          </ReviewTag>
        </ReviewTagContainer>
      </PhotoImage>
    </Container>
  );
};

const Container = styled(View)`
  height: 85%;
  width: 100%;
`;

const IndexBarRow = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  justify-content: center;
`;

const IndexBar = styled(View)`
  height: 3px;
  width: ${(props) => props.width}px;
  background-color: ${(props) => (props.isCurrent ? "red" : "white")};
  margin-left: 10px;
`;

const GoToNextPhotoButton = styled(TouchableOpacity)`
  width: 30%;
  height: 100%;
  position: absolute;
  right: 0px;
`;

const GoToPreviousPhotoButton = styled(TouchableOpacity)`
  width: 30%;
  height: 100%;
  position: absolute;
  left: 0px;
`;

const PhotoImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
  position: relative;
`;

const ProfileInformationContainer = styled(View)`
  position: absolute;
  bottom: 220px;
  left: 30px;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const ProfileInformationHeaderText = styled(Text)`
  font-size: 24px;
  color: white;
  font-family: poppins-600;
`;

const IsHostText = styled(Text)`
  font-size: 10px;
  color: white;
  font-family: poppins-600;
  margin-left: 10px;
  margin-top: 10px;
`;

const BioText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-300;
`;

const ReviewTagContainer = styled(View)`
  position: absolute;
  bottom: 100px;
  width: 100%;
  align-items: center;
`;

const ReviewTag = styled(TouchableOpacity)`
  background-color: #415f74;
  width: 100px;
  height: 30px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const ReviewText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-600;
`;
