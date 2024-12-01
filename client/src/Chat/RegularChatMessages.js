import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import styled from "styled-components/native";

import FastImage from "react-native-fast-image";
import { Ionicons } from "@expo/vector-icons";
import { getUserInfo } from "../Functions/GetUserInfo";

const RegularChatMessages = ({
  item,
  userNumber,
  profilePics,
  renderTime,
  navigation,
}) => {
  const onHandleNavigateToProfile = async () => {
    const participant = await getUserInfo(userNumber);

    navigation.navigate("ViewParticipantAccountPage", {
      participant: participant,
    });
  };

  return (
    <>
      {userNumber === item.sender ? (
        <MessageIndexContainer>
          <MessageContainer>
            <MessageText>{item.text}</MessageText>
            <TimeText>{renderTime(item.timestamp)}</TimeText>

            <ReadMarks name="checkmark-done" size={18} color="black" />
          </MessageContainer>
          <TouchableOpacity onPress={onHandleNavigateToProfile}>
            <ProfilePicture
              source={{
                uri: profilePics[item.sender],
                priority: FastImage.priority.high,
              }}
            />
          </TouchableOpacity>
        </MessageIndexContainer>
      ) : (
        <MessageIndexContainerLeft>
          <TouchableOpacity onPress={onHandleNavigateToProfile}>
            <ProfilePictureLeft
              source={{
                uri: profilePics[item.sender],
                priority: FastImage.priority.high,
              }}
            />
          </TouchableOpacity>
          <MessageContainerOthers>
            <MessageTextOthers>{item.text}</MessageTextOthers>
            <TimeText>{renderTime(item.timestamp)}</TimeText>
            <ReadMarks name="checkmark-done" size={18} color="black" />
          </MessageContainerOthers>
        </MessageIndexContainerLeft>
      )}
    </>
  );
};

export default React.memo(RegularChatMessages);

const MessageIndexContainer = styled(View)`
  margin-top: 20px;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;

const MessageContainer = styled(View)`
  background-color: #79d17c;
  width: 75%;
  border-radius: 15px;
  padding-top: 15px;
  padding-left: 15px;
  padding-bottom: 20px;
  position: relative;
`;

const MessageText = styled(Text)`
  color: white;
  font-family: "poppins-500";
  font-size: 12px;
`;

const MessageContainerOthers = styled(View)`
  background-color: #dbdbdb;
  width: 75%;
  border-radius: 15px;
  padding-top: 15px;
  padding-left: 15px;
  padding-bottom: 20px;
  position: relative;
`;

const MessageTextOthers = styled(Text)`
  color: black;
  font-family: "poppins-500";
  font-size: 12px;
`;

const ProfilePicture = styled(FastImage)`
  height: 50px;
  width: 50px;
  border-radius: 30px;
  margin-left: 10px;
  margin-right: 15px;
`;

const MessageIndexContainerLeft = styled(View)`
  margin-top: 20px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const ProfilePictureLeft = styled(FastImage)`
  height: 50px;
  width: 50px;
  border-radius: 30px;
  margin-left: 15px;
  margin-right: 10px;
`;

const TimeText = styled(Text)`
  position: absolute;
  color: black;
  font-family: "poppins-400";
  font-size: 7px;
  bottom: 7px;
  right: 32px;
`;

const ReadMarks = styled(Ionicons)`
  bottom: 5px;
  right: 12px;
  position: absolute;
`;
