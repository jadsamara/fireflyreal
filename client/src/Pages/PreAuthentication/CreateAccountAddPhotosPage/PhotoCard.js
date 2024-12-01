import { Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components";

import FastImage from "react-native-fast-image";

export const PhotoCard = ({ id, selectedPhoto, photo, navigation }) => {
  let startX = 0;
  let startY = 0;

  useEffect(() => {
    FastImage.preload([{ uri: photo.picture }]);
  }, [photo]);

  const handleStart = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    startX = pageX;
    startY = pageY;
  };

  const handleRelease = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    const dx = Math.abs(pageX - startX);
    const dy = Math.abs(pageY - startY);

    // Trigger onPress only if movement is minimal (not a swipe)
    if (dx < 10 && dy < 10) {
      // selectImageFromGallery()

      navigation.navigate("AddPhotosPrompts", {
        uri: "",
        selectedPhoto: id,
      });
    }
  };

  return (
    <PhotoCardButton
      activeOpacity={0.8}
      onPressIn={handleStart}
      onPressOut={handleRelease}
    >
      {photo.picture ? (
        <ProfilePictureImage
          source={{ uri: photo.picture }}
          resizeMode={FastImage.resizeMode.cover}
          style={
            selectedPhoto === id
              ? {
                  borderWidth: 3,
                  borderColor: "green",
                }
              : {}
          }
        />
      ) : (
        <PlusText>+</PlusText>
      )}
    </PhotoCardButton>
  );
};

const PhotoCardButton = styled(TouchableOpacity)`
  flex: 1;
  background-color: #e3e1e1;
  text-align: center;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const ProfilePictureImage = styled(FastImage)`
  width: 100%;
  border-radius: 10px;
  height: 100%;
`;

const PlusText = styled(Text)`
  color: #bababa;
  font-family: "poppins-600";
  font-size: 72px;
  text-align: center;
`;
