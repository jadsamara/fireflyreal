import React, { useContext, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  PanResponder,
} from "react-native";

import styled from "styled-components";

import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { calculateAge } from "../../../Functions/GetAgeNew";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";

import { Audio } from "expo-av";

export const BottomDrawerActive = ({ setIsModalActive }) => {
  const { bio, name, age, voicePrompt, recordedAudioLink } = useContext(
    AuthenticationStackContext
  );

  const [sound, setSound] = useState(null); // State to manage sound instance
  const [isPlaying, setIsPlaying] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;

  const ratings = 0;
  const numberOfSparks = 0;
  const address = "Markham, Ontario, CA";

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dy: translateY,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 50) {
          // Swipe down detected
          setIsModalActive(false);
        }
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  const handlePlayPauseAudio = async () => {
    try {
      if (isPlaying) {
        // Pause the audio
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        if (!sound) {
          setIsPlaying(true);
          // Load the sound if it hasn't been initialized
          const { sound: newSound } = await Audio.Sound.createAsync({
            uri: recordedAudioLink,
          });
          setSound(newSound);

          // Play the audio
          await newSound.playAsync();

          // Set playback finish listener
          newSound.setOnPlaybackStatusUpdate((status) => {
            if (status.didJustFinish) {
              setIsPlaying(false);
              setSound(null); // Unload the sound when playback finishes
            }
          });
        } else {
          // Resume playback if sound is already loaded
          await sound.playAsync();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <Container>
      <Animated.View
        style={{
          transform: [
            {
              translateY: translateY.interpolate({
                inputRange: [0, 100],
                outputRange: [0, 50],
                extrapolate: "clamp",
              }),
            },
          ],
        }}
        {...panResponder.panHandlers}
      >
        <CenteredView>
          <AntDesign name="caretdown" size={14} color="gray" />
        </CenteredView>
        <NameText>
          {name}, {calculateAge(age)}
        </NameText>
        <Row>
          <AntDesign name="star" size={18} color="black" />
          <BodyOneText>
            {parseFloat(ratings).toFixed(1)} ({numberOfSparks} sparks)
          </BodyOneText>
        </Row>
        <Row>
          <FontAwesome6 name="house-chimney" size={14} color="black" />
          <BodyOneText>{address}</BodyOneText>
        </Row>
        <ListenRow>
          <ListenRowTwo onPress={handlePlayPauseAudio}>
            <MaterialCommunityIcons
              name={isPlaying ? "volume-high" : "play-pause"}
              size={20}
              color={isPlaying ? "#00ceff" : "black"}
            />
            <BodyTwoText
              color={isPlaying ? "#00ceff" : "black"}
              ellipsizeMode="tail"
            >
              "{voicePrompt}"
            </BodyTwoText>
          </ListenRowTwo>
          <TouchableOpacity onPress={handlePlayPauseAudio}>
            <BodyThreeText color={isPlaying ? "#00ceff" : "black"}>
              {isPlaying ? "(pause audio)" : "(play audio)"}
            </BodyThreeText>
          </TouchableOpacity>
        </ListenRow>
        <BioText>{bio}</BioText>
      </Animated.View>
    </Container>
  );
};

const Container = styled(View)`
  height: 350px;
  width: 100%;
  background-color: white;
  position: absolute;
  bottom: 0px;
  border-radius: 30px;
  padding: 20px;
`;

const CenteredView = styled(View)`
  width: 100%;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const NameText = styled(Text)`
  font-size: 22px;
  font-family: poppins-800;
  margin-top: 10px;
`;

const BodyOneText = styled(Text)`
  font-size: 12px;
  font-family: poppins-500;
  margin-left: 10px;
`;

const BodyTwoText = styled(Text)`
  font-size: 10px;
  font-family: poppins-500;
  margin-left: 5px;
  color: ${({ color }) => color};
`;

const BodyThreeText = styled(Text)`
  font-size: 10px;
  font-family: poppins-500;
  color: ${({ color }) => color};
`;

const BioText = styled(Text)`
  font-size: 14px;
  font-family: poppins-500;
  margin-top: 20px;
  width: 90%;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
  align-items: center;
`;

const ListenRow = styled(View)`
  flex-direction: row;
  width: 100%;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
`;

const ListenRowTwo = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
`;
