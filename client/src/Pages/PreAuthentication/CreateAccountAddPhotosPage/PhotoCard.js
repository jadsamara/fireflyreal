import { Text, TouchableOpacity, View, Image } from "react-native";
import React, { useEffect } from "react";
import styled from "styled-components";
import FastImage from "react-native-fast-image";
import { DoubleTap } from "../../../Components/GlobalComponents/DoubleTap";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

export const PhotoCard = ({
  id,
  photo,
  selectedPhoto,
  navigation,
  setSelectedPhoto,
  onHandleDeletePhoto,
  filteredData,
}) => {
  useEffect(() => {
    if (photo.picture) {
      FastImage.preload([{ uri: photo.picture }]);
    }
  }, [photo]);

  const onPressOnce = () => {
    setSelectedPhoto(id);
    if (selectedPhoto === id) {
      navigation.navigate("AddPhotosPrompts", {
        uri: photo.picture,
        selectedPhoto: id,
        type: "photo",
      });
    }
  };

  const onPressOnceEmpty = () => {
    if (filteredData !== null && id <= filteredData) {
      setSelectedPhoto(id);
      navigation.navigate("AddPhotosPrompts", {
        uri: photo.picture,
        selectedPhoto: id,
        type: "photo",
      });
    }
  };

  const blankFunc = () => {};

  if (!photo.picture) {
    return (
      <DoubleTap onPressOnce={onPressOnceEmpty} onPressTwice={blankFunc}>
        <PhotoCardButton>
          <FontAwesome5 name="plus" size={24} color="gray" />
        </PhotoCardButton>
      </DoubleTap>
    );
  }

  if (photo.picture) {
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
          <FontAwesome name="close" size={12} color="#527e65" />
        </DeleteButton>
        <DoubleTap onPressOnce={onPressOnce} onPressTwice={blankFunc}>
          <PhotoCardButton>
            <ProfilePictureImage
              resizeMode={FastImage.resizeMode.cover}
              source={{ uri: photo.picture }}
              style={
                selectedPhoto === id
                  ? {
                      borderWidth: 4,
                      borderColor: "#79D17C",
                    }
                  : {}
              }
            />
          </PhotoCardButton>
        </DoubleTap>
      </>
    );
  }
};

const PhotoCardButton = styled(View)`
  height: 110px;
  width: 110px;
  justify-content: center;
  align-items: center;
  background-color: #ebebeb;
  border-radius: 10px;
  position: relative;
`;

const ProfilePictureImage = styled(FastImage)`
  width: 100%;
  border-radius: 10px;
  height: 100%;
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
