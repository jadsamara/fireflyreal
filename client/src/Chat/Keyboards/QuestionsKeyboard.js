import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

import { AntDesign } from "@expo/vector-icons";

import {
  LocationQuestion,
  PrepartionAndItems,
  SpecificQuestion,
} from "./AllQuestionModals/";

export const QuestionsKeyboard = ({
  onHandleQuestionsModal,
  handleSendMessage,
}) => {
  const [preparationModal, setPreparationModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [specificQuestionModal, setSpecificQuestionModal] = useState(false);

  const onHandlePreparationModal = () => {
    setPreparationModal((res) => !res);
  };

  const onHandleLocationModal = () => {
    setLocationModal((res) => !res);
  };

  const onHandleSpecificQuestionModal = () => {
    setSpecificQuestionModal((res) => !res);
  };

  if (preparationModal) {
    return (
      <PrepartionAndItems
        onHandlePreparationModal={onHandlePreparationModal}
        handleSendMessage={handleSendMessage}
      />
    );
  }
  if (locationModal) {
    return (
      <LocationQuestion
        onHandleLocationModal={onHandleLocationModal}
        handleSendMessage={handleSendMessage}
      />
    );
  }
  if (specificQuestionModal) {
    return (
      <SpecificQuestion
        onHandleSpecificQuestionModal={onHandleSpecificQuestionModal}
        handleSendMessage={handleSendMessage}
      />
    );
  }

  return (
    <Container>
      <HeaderContainer>
        <HeaderTitle>Confirm important details</HeaderTitle>
      </HeaderContainer>
      <ChatKeyboardGobackContainer>
        <PromptContainerInitial onPress={onHandleQuestionsModal}>
          <AntDesign
            name="caretleft"
            size={12}
            color="#527E65"
            style={{ marginRight: 20 }}
          />

          <PromptText>Questions</PromptText>
        </PromptContainerInitial>
      </ChatKeyboardGobackContainer>
      <ChatKeyboardContainer>
        <PromptContainer onPress={onHandlePreparationModal}>
          <PromptText>Preparation and Items</PromptText>

          <AntDesign name="caretright" size={12} color="#527E65" />
        </PromptContainer>
        <PromptContainer onPress={onHandleLocationModal}>
          <PromptText>Location</PromptText>

          <AntDesign name="caretright" size={12} color="#527E65" />
        </PromptContainer>
        <PromptContainer onPress={onHandleSpecificQuestionModal}>
          <PromptText>Specific Question</PromptText>

          <AntDesign name="caretright" size={12} color="#527E65" />
        </PromptContainer>
      </ChatKeyboardContainer>
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
  margin-top: 10px;
`;

const PromptContainerInitial = styled(TouchableOpacity)`
  width: 150px;
  height: 40px;
  padding-left: 10px;

  background-color: #ebebeb;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;

const PromptContainer = styled(TouchableOpacity)`
  width: 250px;
  height: 40px;

  padding-left: 10px;
  padding-right: 10px;

  background-color: #ebebeb;
  border-radius: 25px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
`;

const PromptText = styled(Text)`
  color: black;
  font-family: poppins-700;
  font-size: 12px;
`;
