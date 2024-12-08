import React, { useRef, useState } from "react";
import {
  View,
  Text,
  PanResponder,
  Animated,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styled from "styled-components";
import {
  AntDesign,
  FontAwesome6,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { calculateAge } from "../../../Functions/GetAgeNew";
import { Audio } from "expo-av";

export const BottomDrawerActive = ({ setIsModalActive, participant = {} }) => {
  const {
    userBio = "",
    name = "",
    age = "",
    voiceAudioObj = {},
    averageUserRating,
    pastSparks,
    homeTown,
  } = participant;

  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const translateY = useRef(new Animated.Value(0)).current;

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
      </Animated.View>

      <NameText>
        {name}, {calculateAge(age)}
      </NameText>
      <Row>
        <AntDesign name="star" size={18} color="black" />
        <BodyOneText>
          {parseFloat(averageUserRating).toFixed(1)} ({pastSparks.length}{" "}
          sparks)
        </BodyOneText>
      </Row>
      <Row>
        <FontAwesome6 name="house-chimney" size={14} color="black" />
        <BodyOneText>{homeTown}</BodyOneText>
      </Row>
      <ListenRow>
        <ListenRowTwo onPress={handlePlayPauseAudio}>
          <MaterialCommunityIcons
            name={isPlaying ? "volume-high" : "play-pause"}
            size={20}
            color={isPlaying ? "#00ceff" : "black"}
          />
          <BodyTwoText color={isPlaying ? "#00ceff" : "black"}>
            "{voiceAudioObj.voicePrompt}"
          </BodyTwoText>
        </ListenRowTwo>
        <TouchableOpacity onPress={handlePlayPauseAudio}>
          <BodyThreeText color={isPlaying ? "#00ceff" : "black"}>
            {isPlaying ? "(pause audio)" : "(play audio)"}
          </BodyThreeText>
        </TouchableOpacity>
      </ListenRow>
      <BioText>{userBio}</BioText>
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
  height: 50px;
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
