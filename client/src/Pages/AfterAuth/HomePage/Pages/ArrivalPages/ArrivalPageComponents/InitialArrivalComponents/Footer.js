import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";

export const Footer = ({ spark, navigation, arrivalData }) => {
  const onHandleSparkEnded = () => {
    navigation.navigate("SecondArrivedPage", {
      spark,
      arrivalData: arrivalData,
    });
  };

  const onHandleGoToChatScreen = () => {
    navigation.navigate("ChatScreen", {
      chatRoomId: spark.currentDocID,
      spark: spark,
    });
  };

  return (
    <Container>
      <ChatButton onPress={onHandleGoToChatScreen}>
        <ChatText>Chat</ChatText>
      </ChatButton>
      <DateEndedButton onPress={onHandleSparkEnded}>
        <DateEndedText>Spark Ended</DateEndedText>
      </DateEndedButton>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 40px;
`;

const ChatButton = styled(TouchableOpacity)`
  background-color: #79d17c;
  justify-content: center;
  align-items: center;
  width: 116px;
  height: 44px;
  border-radius: 20px;
`;

const ChatText = styled(Text)`
  font-size: 16px;
  font-family: poppins-500;
  color: white;
`;

const DateEndedButton = styled(TouchableOpacity)`
  background-color: #527e65;
  justify-content: center;
  align-items: center;
  width: 180px;
  height: 44px;
  border-radius: 20px;
  margin-left: 26px;
`;

const DateEndedText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: white;
`;
