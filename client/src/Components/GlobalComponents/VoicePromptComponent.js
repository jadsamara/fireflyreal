import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

import { Audio } from "expo-av";
import {
  MaterialCommunityIcons,
  FontAwesome5,
  FontAwesome,
} from "@expo/vector-icons";

export const VoicePromptComponent = ({ voiceAudioObj }) => {
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayPauseAudio = async () => {
    try {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        if (!sound) {
          setIsPlaying(true);
          const { sound: newSound } = await Audio.Sound.createAsync({
            uri: voiceAudioObj.recordedAudioLink,
          });
          setSound(newSound);

          await newSound.playAsync();

          newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setIsPlaying(false);
              setSound(null);
            }
          });
        } else {
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <VoiceContainer>
      <VoiceTitle>Listen to voice prompt</VoiceTitle>
      <BoxContainer>
        <PromptText>"{voiceAudioObj.voicePrompt}"</PromptText>
        <GreenBox
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // For Android
          }}
        >
          <PlayPauseButton onPress={handlePlayPauseAudio}>
            {!isPlaying ? (
              <FontAwesome5
                name="play"
                size={24}
                color="white"
                style={{ marginLeft: 5 }}
              />
            ) : (
              <FontAwesome name="pause" size={24} color="white" />
            )}
          </PlayPauseButton>
          <View
            style={{
              marginLeft: 10,
              flexDirection: "row",
            }}
          >
            <MaterialCommunityIcons name="waveform" size={32} color="#527e65" />
            <MaterialCommunityIcons name="waveform" size={32} color="#527e65" />
            <MaterialCommunityIcons name="waveform" size={32} color="#527e65" />
            <MaterialCommunityIcons name="waveform" size={32} color="#527e65" />
            <MaterialCommunityIcons name="waveform" size={32} color="#527e65" />
            <MaterialCommunityIcons name="waveform" size={32} color="#527e65" />
            <MaterialCommunityIcons name="waveform" size={32} color="#527e65" />
          </View>
        </GreenBox>
      </BoxContainer>
    </VoiceContainer>
  );
};

const BoxContainer = styled(View)`
  width: 100%;
  border-color: gray;
  align-self: center;
  border-radius: 10px;
  margin-bottom: 10px;
  margin-top: 10px;
`;

const PromptText = styled(Text)`
  font-size: 12px;
  color: #527e65;
  font-family: poppins-500;
`;

const GreenBox = styled(View)`
  width: 90%;
  height: 70px;
  background-color: #00ffba;
  margin-top: 15px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
`;

const PlayPauseButton = styled(TouchableOpacity)`
  height: 44px;
  width: 44px;
  border-radius: 1000px;
  background-color: #79d17c;
  justify-content: center;
  align-items: center;
`;

const VoiceContainer = styled(View)`
  width: 100%;
  border-bottom-width: 0.3px;
  padding: 10px;
  border-color: gray;
  align-self: center;
  margin-top: 10px;
`;

const VoiceTitle = styled(Text)`
  font-size: 16px;
  color: black;
  font-family: poppins-600;
`;
