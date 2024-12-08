import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";
import {
  ProgressBar,
  ContinueButton,
  BackArrow,
} from "../../Components/PreAuthentication";
import { SafeArea } from "../../Components/GlobalComponents/SafeArea";
import { MicrophoneComponent } from "./Components/MicrophoneComponent";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, storage } from "../../Config/firebase";

export const CreateAccountPageSix = ({ navigation }) => {
  const { voicePrompt, setRecordedAudioLink } = useContext(
    AuthenticationStackContext
  );

  const [recordedURI, setRecordedURI] = useState(null);

  const onHandleNavigate = async () => {
    if (recordedURI) {
      await uploadVoiceAudioToFirebase(recordedURI);
      navigation.navigate("CreateAccountPageSeven");
    } else {
      Alert.alert("Need both fields");
    }
  };

  const onHandleNavigatePrompts = () => {
    navigation.navigate("PageSixPrompts");
  };

  const uploadVoiceAudioToFirebase = async (audioUri) => {
    try {
      if (audioUri) {
        // If audioUri is provided, upload the image and update the picture and prompt
        const response = await fetch(audioUri);
        const blob = await response.blob();

        const fileName = `${auth.currentUser.uid}-voiceAudio.jpg`;
        const storageRef = ref(storage, `audio-prompts/${fileName}`);

        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);

        // Update the photo with the new picture and prompt

        console.log("Audio uploaded successfully:", downloadURL);
        setRecordedAudioLink(downloadURL); // Update the context state
      }
    } catch (error) {
      console.error("Error updating prompt or uploading image:", error);
    }
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <TitleContainer>
          <Title>Let others hear your voice!</Title>
        </TitleContainer>

        <InputContainer>
          <VoicePromptButton onPress={onHandleNavigatePrompts}>
            <VoicePromptText>{voicePrompt}</VoicePromptText>
            <MaterialCommunityIcons
              name="pencil-circle-outline"
              size={32}
              color="#3A7C78"
            />
          </VoicePromptButton>

          <MicrophoneComponent
            recordedURI={recordedURI}
            setRecordedURI={setRecordedURI}
          />
        </InputContainer>

        <ContinueButton onPress={onHandleNavigate} bottom={80} />
        <ProgressBar width={"10%"} bottom={0} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const TitleContainer = styled(View)`
  justify-content: flex-end;
`;

const Title = styled(Text)`
  font-size: 35px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const InputContainer = styled(View)`
  width: 100%;
  height: 55%;
  align-items: center;
  margin-top: 15px;
  position: relative;
`;

const VoicePromptButton = styled(TouchableOpacity)`
  width: 90%;
  height: 60px;
  padding: 5px;
  border-color: rgba(112, 112, 112, 0.3);
  border-width: 0.5px;
  border-radius: 10px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const VoicePromptText = styled(Text)`
  font-size: 12px;
`;
