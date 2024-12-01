import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";
import styled from "styled-components";

export const Footer = ({
  distanceToTarget,
  updatedLocation,
  navigation,
  spark,
}) => {
  const [isSharedLocationState, setIsSharedLocationState] = useState(true);

  const handleShareLocation = () => {
    setIsSharedLocationState(true);
  };

  const onHandleGoToChatScreen = () => {
    navigation.navigate("ChatScreen", {
      chatRoomId: spark.currentDocID,
      spark: spark,
    });
  };

  return (
    <Container>
      <FirstRow>
        <FontAwesome5 name="running" size={44} color="white" />
        <HeaderText>{parseFloat(distanceToTarget).toFixed(2)} km</HeaderText>
      </FirstRow>
      <LastRow>
        {!isSharedLocationState ? (
          <ShareLocationButton onPress={handleShareLocation}>
            <MaterialIcons name="my-location" size={20} color="#2ca8ff" />
            <ShareLocationButtonText>Share Location</ShareLocationButtonText>
          </ShareLocationButton>
        ) : (
          <SharedLocationTrueContainer>
            <MaterialIcons name="my-location" size={20} color="white" />
            <ShareLocationTextTrue>Sharing Location</ShareLocationTextTrue>
          </SharedLocationTrueContainer>
        )}
        <MessageButton onPress={onHandleGoToChatScreen}>
          <Ionicons name="chatbubbles" size={30} color="white" />
        </MessageButton>
        <ProfilePicturesContainer>
          {updatedLocation.Array.map((location, index) => {
            if (index === 0) {
              return (
                <ProfilePictureYou
                  key={index}
                  source={{
                    uri: location.profilePicture,
                  }}
                />
              );
            } else if (index === 1) {
              return (
                <ProfilePictureHost
                  key={index}
                  source={{
                    uri: location.profilePicture,
                  }}
                />
              );
            }
          })}
        </ProfilePicturesContainer>
      </LastRow>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  background-color: rgba(83, 184, 255, 0.6);
  z-index: 99999;
  bottom: 0px;
  width: 100%;
  height: 200px;
  padding: 15px;
  justify-content: space-between;
`;

const FirstRow = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled(Text)`
  color: white;
  font-family: "poppins-800";
  font-size: 18px;
  margin-left: 20px;
`;

const LastRow = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const ShareLocationButton = styled(TouchableOpacity)`
  width: 60%;
  height: 50px;
  background-color: white;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
`;

const SharedLocationTrueContainer = styled(View)`
  width: 60%;
  height: 50px;
  background-color: #76c4fb;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-width: 1px;
  border-color: white;
`;

const ShareLocationButtonText = styled(Text)`
  color: #2ca8ff;
  font-family: "poppins-600";
  font-size: 14px;
`;

const ShareLocationTextTrue = styled(Text)`
  color: white;
  font-family: "poppins-600";
  font-size: 14px;
`;

const MessageButton = styled(TouchableOpacity)`
  width: 20%;
  height: 50px;
  background-color: #79d17c;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;

const ProfilePicturesContainer = styled(View)`
  width: 20%;
  height: 50px;
  margin-left: 15px;
  position: relative;
`;

const ProfilePictureHost = styled(Image)`
  height: 35px;
  width: 35px;
  border-radius: 10000px;
  position: absolute;
  bottom: 0px;
  right: 20px;
`;

const ProfilePictureYou = styled(Image)`
  height: 35px;
  width: 35px;
  border-radius: 10000px;
  position: absolute;
  top: 0px;
  left: 0px;
`;
