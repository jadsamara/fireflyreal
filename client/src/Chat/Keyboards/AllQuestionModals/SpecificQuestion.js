import { View, Text, TouchableOpacity, TextInput, Modal } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

export const SpecificQuestion = ({
  handleSendMessage,
  onHandleSpecificQuestionModal,
}) => {
  const [messageValue, setMessageValue] = useState("");

  const onHandleMergeMessage = () => {
    handleSendMessage(messageValue);
  };

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Confirm important details</HeaderTitle>
      </HeaderContainer>
      <ChatKeyboardGobackContainer>
        <PromptContainerInitial onPress={onHandleSpecificQuestionModal}>
          <AntDesign
            name="caretleft"
            size={12}
            color="#527E65"
            style={{ marginRight: 10 }}
          />
          <PromptText>Specific Question</PromptText>
        </PromptContainerInitial>
      </ChatKeyboardGobackContainer>
      <ChatKeyboardContainer>
        <TextMessageInput
          value={messageValue}
          onChangeText={setMessageValue}
          placeholder={"Type Here"}
          style={{
            fontFamily: "poppins-400",
          }}
        />
        <RegularText>?</RegularText>
      </ChatKeyboardContainer>
      <SendMessageButton
        onPress={onHandleMergeMessage}
        style={{
          backgroundColor: messageValue ? "#79D17C" : "#CCCCCC",
        }}
        disabled={!messageValue} // Corrected to selectedValue
      >
        <SendMessageText>Send message</SendMessageText>
        <MaterialIcons name="send" size={18} color="black" />
      </SendMessageButton>
    </Container>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
  background-color: #9a9999;
`;

const HeaderContainer = styled(View)`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const HeaderTitle = styled(Text)`
  color: black;
  font-family: poppins-600;
  font-size: 14px;
`;

const ChatKeyboardGobackContainer = styled(View)`
  width: 90%;
  align-items: self-start;
  align-self: center;
  justify-content: center;
`;

const ChatKeyboardContainer = styled(View)`
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 40px;
  flex-direction: row;
`;

const PromptContainerInitial = styled(TouchableOpacity)`
  height: 40px;
  padding-left: 10px;
  padding-right: 20px;
  background-color: #ebebeb;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const PromptText = styled(Text)`
  color: black;
  font-family: poppins-700;
  font-size: 12px;
`;

const RegularText = styled(Text)`
  color: black;
  font-family: poppins-600;
  font-size: 14px;
  margin-left: 10px;
`;

const TextMessageInput = styled(TextInput)`
  height: 30px;
  width: 75%;
  font-size: 9px;
  background-color: white;
  color: black;
  border-radius: 40px;
  text-align: center;
`;

const SendMessageButton = styled(TouchableOpacity)`
  justify-content: space-between;
  align-items: center;
  margin-top: 40px;
  width: 40%;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 10px;
  padding-right: 10px;
  align-self: center;
  border-radius: 20px;
  flex-direction: row;
`;

const SendMessageText = styled(Text)`
  color: black;
  font-family: poppins-600;
  font-size: 11px;
`;
