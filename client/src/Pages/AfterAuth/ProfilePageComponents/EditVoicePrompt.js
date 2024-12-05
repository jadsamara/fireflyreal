import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { useSelector } from "react-redux";
import { FontAwesome } from "@expo/vector-icons";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { auth, storage } from "../../../Config/firebase";
import { Audio } from "expo-av";

export const EditVoicePrompt = () => {
  const userData = useSelector((state) => state.user.userData);
  const voiceAudioObj = userData?.voiceAudioObj;
  const voicePrompt = voiceAudioObj?.voicePrompt;
  const voiceAudioLink = voiceAudioObj.recordedAudioLink;

  return (
    <Container>
      <Title>Voice Prompt</Title>
      <BoxContainer>
        <DeleteButton
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 5, height: 5 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <DeleteText>x</DeleteText>
        </DeleteButton>
        <PromptText>"{voicePrompt}"</PromptText>
        <GreenBox>
          <PlayPauseButton>
            <FontAwesome name="play" size={24} color="white" />
          </PlayPauseButton>
        </GreenBox>
      </BoxContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 95%;
  border-bottom-width: 0.3px;
  padding: 10px;
  border-color: gray;
  align-self: center;
`;

const Title = styled(Text)`
  font-size: 15px;
  color: black;
  font-family: poppins-500;
`;

const BoxContainer = styled(View)`
  width: 100%;
  border-width: 0.4px;
  border-color: gray;
  align-self: center;
  border-radius: 20px;
  margin-top: 10px;
  padding: 20px;
  margin-bottom: 10px;
`;

const PromptText = styled(Text)`
  font-size: 10px;
  color: green;
  font-family: poppins-500;
`;

const GreenBox = styled(View)`
  width: 100%;
  height: 70px;
  align-self: center;
  background-color: #00ffba;
  margin-top: 10px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const PlayPauseButton = styled(TouchableOpacity)`
  height: 50px;
  width: 50px;
  border-radius: 1000px;
  background-color: #79d17c;
  justify-content: center;
  align-items: center;
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
  font-size: 11px;
`;
