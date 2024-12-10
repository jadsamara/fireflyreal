import {
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  Text,
} from "react-native";
import React, { useRef, useEffect } from "react";
import styled from "styled-components/native";
import FastImage from "react-native-fast-image";

export const BodyWithModal = ({
  participant = {},
  currentIndex,
  setCurrentIndex,
}) => {
  const { profilePicture = "", allPhotos = [] } = participant;

  const fadeAnim = useRef(new Animated.Value(1)).current; // Initial opacity is 1

  const screenWidth = Dimensions.get("window").width;
  const validPhotos = allPhotos.filter((res) => res.picture);
  const indexBarWidth = screenWidth / validPhotos.length - 20; // Adjust the width to account for margin

  // Preload images
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

  return (
    <Container>
      <AnimatedPhotoImage
        style={{ opacity: fadeAnim }}
        source={{
          uri: validPhotos[currentIndex]?.picture,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.cover}
      >
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
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </ProfilePictureContainer>
        <MessageBubble>
          <MessageBubbleText>
            {validPhotos[currentIndex]?.prompt}
          </MessageBubbleText>
        </MessageBubble>
      </AnimatedPhotoImage>
    </Container>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

const IndexBarRow = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 60px;
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

const AnimatedPhotoImage = styled(Animated.createAnimatedComponent(FastImage))`
  width: 100%;
  height: 100%;
`;

const ProfilePictureContainer = styled(View)`
  height: 70px;
  width: 70px;
  position: absolute;
  bottom: 380px;
  left: 20px;
  z-index: 100000;
`;

const ProfilePictureImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 100px;
  z-index: 100000;
`;

const MessageBubble = styled(View)`
  background-color: #79d17c;
  position: absolute;
  bottom: 400px;
  left: 100px;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 30px;
`;

const MessageBubbleText = styled(Text)`
  font-size: 14px;
  font-family: poppins-600;
  color: white;
`;
