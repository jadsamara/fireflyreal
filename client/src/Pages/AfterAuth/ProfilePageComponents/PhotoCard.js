import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components";
import FastImage from "react-native-fast-image";
import { DoubleTap } from "../../../Components/GlobalComponents/DoubleTap";

export const PhotoCard = React.memo(
  ({ id, photo, selectedPhoto, navigation, setSelectedPhoto, isDragging }) => {
    useEffect(() => {
      if (photo.picture) {
        FastImage.preload([{ uri: photo.picture }]);
      }
    }, [photo]);

    const onPressOnce = () => {
      navigation.navigate("AddPhotosPrompts", {
        uri: photo.picture,
        selectedPhoto: id,
      });
    };

    const onPressTwice = () => {
      setSelectedPhoto(id);
    };

    return (
      // <DoubleTap onPressOnce={onPressOnce} onPressTwice={onPressTwice}>
      <PhotoCardButton>
        {photo.picture ? (
          <ProfilePictureImage
            resizeMode={FastImage.resizeMode.cover}
            source={{ uri: photo.picture }}
          />
        ) : (
          <PlusText>+</PlusText>
        )}
      </PhotoCardButton>
      // </DoubleTap>
    );
  },
  (prevProps, nextProps) =>
    prevProps.photo.picture === nextProps.photo.picture &&
    prevProps.selectedPhoto === nextProps.selectedPhoto
);

const PhotoCardButton = styled(View)`
  height: 100px;
  width: 100px;
  justify-content: center;
  align-items: center;
  margin: 10px;
  background-color: gray;
  border-radius: 10px;
`;

const ProfilePictureImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 10px;
`;

const PlusText = styled(Text)`
  color: white;
  font-family: "poppins-600";
  font-size: 42px;
`;
