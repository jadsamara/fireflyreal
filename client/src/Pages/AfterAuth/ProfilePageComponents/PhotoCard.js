import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components";
import FastImage from "react-native-fast-image";
import { DoubleTap } from "../../../Components/GlobalComponents/DoubleTap";

export const PhotoCard = React.memo(
  ({
    id,
    photo,
    selectedPhoto,
    navigation,
    setSelectedPhoto,
    onHandleDeletePhoto,
  }) => {
    useEffect(() => {
      if (photo.picture) {
        FastImage.preload([{ uri: photo.picture }]);
      }
    }, [photo]);

    const onPressOnce = () => {
      setSelectedPhoto(id);
      navigation.navigate("AddPhotosPrompts", {
        uri: photo.picture,
        selectedPhoto: id,
        type: "photo",
      });
    };

    const onPressTwice = () => {
      setSelectedPhoto(id);
    };

    const blankFunc = () => {};

    if (!photo.picture) {
      return (
        <DoubleTap onPressOnce={onPressOnce} onPressTwice={blankFunc}>
          <PhotoCardButton>
            <PlusText>+</PlusText>
          </PhotoCardButton>
        </DoubleTap>
      );
    }

    return (
      <>
        <DeleteButton
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
          onPress={() => onHandleDeletePhoto(id)}
        >
          <DeleteText>x</DeleteText>
        </DeleteButton>
        <DoubleTap onPressOnce={onPressOnce} onPressTwice={onPressTwice}>
          <PhotoCardButton>
            <ProfilePictureImage
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: photo.picture }}
              style={
                selectedPhoto === id
                  ? {
                      borderWidth: 3,
                      borderColor: "green",
                    }
                  : {}
              }
            />
          </PhotoCardButton>
        </DoubleTap>
      </>
    );
  },
  (prevProps, nextProps) =>
    prevProps.photo.picture === nextProps.photo.picture &&
    prevProps.selectedPhoto === nextProps.selectedPhoto
);

const PhotoCardButton = styled(View)`
  height: 110px;
  width: 110px;
  justify-content: center;
  align-items: center;
  background-color: gray;
  border-radius: 10px;
  position: relative;
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

const DeleteButton = styled(TouchableOpacity)`
  height: 25px;
  width: 25px;
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
  position: absolute;
  z-index: 999999;
  top: -7px;
  right: 0px;
`;

const DeleteText = styled(Text)`
  color: green;
  font-family: "poppins-800";
  font-size: 12px;
`;
