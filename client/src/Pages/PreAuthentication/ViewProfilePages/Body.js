import {
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Animated,
} from "react-native";
import React, { useState, useContext, useRef, useEffect } from "react";
import styled from "styled-components/native";
import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";

import { BottomDrawer } from "./BottomDrawer";

import FastImage from "react-native-fast-image";

export const Body = ({ navigation, setIsModalActive }) => {
  const { allPhotos, profilePicture } = useContext(AuthenticationStackContext);

  const [currentIndex, setCurrentIndex] = useState(0);

  const screenWidth = Dimensions.get("window").width;
  const validPhotos = allPhotos.filter((res) => res.picture);
  const indexBarWidth = screenWidth / validPhotos.length - 20; // Adjust the width to account for margin

  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity is 1

  useEffect(() => {
    validPhotos.forEach((photo) => {
      FastImage.preload([{ uri: photo.picture }]);
    });
    if (profilePicture) {
      FastImage.preload([{ uri: profilePicture }]);
    }
  }, [validPhotos, profilePicture]);

  const handleNextPhoto = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out
      duration: 100, // Faster fade-out duration
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % validPhotos.length);
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in
        duration: 100, // Faster fade-in duration
        useNativeDriver: true,
      }).start();
    });
  };

  const handlePreviousPhoto = () => {
    Animated.timing(fadeAnim, {
      toValue: 0, // Fade out
      duration: 100, // Faster fade-out duration
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? validPhotos.length - 1 : prevIndex - 1
      );
      Animated.timing(fadeAnim, {
        toValue: 1, // Fade in
        duration: 100, // Faster fade-in duration
        useNativeDriver: true,
      }).start();
    });
  };

  const onHandleContinue = () => {
    navigation.navigate("CreateAccountPageEight");
  };

  return (
    <Container>
      <AnimatedPhotoImage
        style={{ opacity: fadeAnim }}
        source={{ uri: validPhotos[currentIndex]?.picture }}
        resizeMode={FastImage.resizeMode.cover}
      />
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
      <ProfilePictureContainer>
        <ProfilePictureImage
          source={{
            uri: profilePicture,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </ProfilePictureContainer>
      <ContinueButton onPress={onHandleContinue}>
        <ContinueButtonText>Looks Good!</ContinueButtonText>
      </ContinueButton>
      <BottomDrawer setIsModalActive={setIsModalActive} />
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
  z-index: 9999;
  position: absolute;
  align-self: center;
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

const ProfilePictureContainer = styled(View)`
  height: 70px;
  width: 70px;
  position: absolute;
  bottom: 120px;
  left: 20px;
`;

const ProfilePictureImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 100px;
  z-index: 100000;
  border-width: 2px;
  border-color: #79d17c;
`;

const ContinueButton = styled(TouchableOpacity)`
  width: 150px;
  height: 50px;
  background-color: #527e65;
  position: absolute;
  bottom: 130px;
  right: 20px;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
`;

const ContinueButtonText = styled(Text)`
  font-size: 16px;
  color: white;
  font-family: poppins-500;
`;

const AnimatedPhotoImage = styled(Animated.createAnimatedComponent(FastImage))`
  width: 100%;
  height: 100%;
`;
