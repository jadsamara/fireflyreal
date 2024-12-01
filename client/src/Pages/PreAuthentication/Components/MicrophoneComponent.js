import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Animated, Easing } from "react-native";
import styled from "styled-components/native";
import { Audio } from "expo-av";
import { FontAwesome } from "@expo/vector-icons";

export const MicrophoneComponent = ({ recordedURI, setRecordedURI }) => {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [playbackPosition, setPlaybackPosition] = useState(0);
  const [playbackDuration, setPlaybackDuration] = useState(0);
  const [scaleValue] = useState(new Animated.Value(1));

  const [waveAnimation] = useState(new Animated.Value(0)); // Animation control

  useEffect(() => {
    if (recording || isPlaying) {
      startWaveAnimation(); // Start animation when recording or playing
    } else {
      stopWaveAnimation(); // Stop animation otherwise
    }
  }, [recording, isPlaying]);

  const startWaveAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(waveAnimation, {
          toValue: 1,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(waveAnimation, {
          toValue: 0,
          duration: 500,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const stopWaveAnimation = () => {
    waveAnimation.stopAnimation();
  };

  const waveScale = waveAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.5], // Scale wave sizes
  });

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    let interval;
    if (recording) {
      interval = setInterval(() => {
        setRecordingDuration((prev) => prev + 1000); // Increment duration every second
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recording]);

  async function startRecording() {
    try {
      if (!permissionResponse || permissionResponse.status !== "granted") {
        console.log("Requesting permission..");
        await requestPermission();
      }

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log("Starting recording..");
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      setRecordingDuration(0); // Reset timer when starting a new recording
      console.log("Recording started");
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  }

  async function stopRecording() {
    try {
      console.log("Stopping recording..");
      setRecording(undefined);
      await recording.stopAndUnloadAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: false,
      });
      const uri = recording.getURI();
      setRecordedURI(uri);
      setPlaybackDuration(recordingDuration); // Save recording duration for playback
      console.log("Recording stopped and stored at", uri);
    } catch (err) {
      console.error("Error stopping recording", err);
    }
  }

  async function playRecording() {
    if (!recordedURI) return;

    // Handle replay if playback has finished
    if (sound && !isPlaying) {
      const status = await sound.getStatusAsync();
      if (
        status.didJustFinish ||
        status.positionMillis === status.durationMillis
      ) {
        await sound.unloadAsync(); // Unload the previous sound instance
        setSound(null); // Reset sound state
        setPlaybackPosition(0); // Explicitly reset playback position
      }
    }

    if (sound) {
      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await pausePlayback();
        return;
      } else {
        await sound.playAsync();
        setIsPlaying(true);
        return;
      }
    }

    console.log("Playing recording..");
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: recordedURI },
        {
          shouldPlay: true,
          positionMillis: 0, // Start from the beginning
        }
      );
      setSound(newSound);
      setPlaybackPosition(0); // Reset playback position
      setIsPlaying(true);
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.durationMillis) setPlaybackDuration(status.durationMillis); // Update total duration

        if (status.didJustFinish) {
          setIsPlaying(false);
          setPlaybackPosition(0); // Reset position to 0 when playback finishes
          newSound.unloadAsync(); // Unload the sound for replay
          setSound(null); // Reset sound state for replay
        } else {
          // Constrain playbackPosition to not exceed playbackDuration
          setPlaybackPosition(
            Math.min(status.positionMillis, status.durationMillis)
          );
        }
      });
      console.log("Recording is playing..");
    } catch (error) {
      console.error("Failed to play the recording", error);
    }
  }

  async function pausePlayback() {
    try {
      console.log("Pausing playback..");
      if (sound) {
        const status = await sound.getStatusAsync();
        setPlaybackPosition(status.positionMillis);
        await sound.pauseAsync();
        setIsPlaying(false);
        console.log("Playback paused.");
      }
    } catch (error) {
      console.error("Error pausing playback", error);
    }
  }

  const onHandleMicrophoneButton = async () => {
    if (recording) {
      await stopRecording();
    } else if (recordedURI) {
      if (isPlaying) {
        await pausePlayback();
      } else {
        await playRecording();
      }
    } else {
      await startRecording();
    }
  };

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.9,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const resetRecording = async () => {
    if (sound) {
      await sound.unloadAsync(); // Unload the sound if it exists
      setSound(null);
    }
    setRecordedURI(null); // Clear recorded file URI
    setRecording(false);
    setIsPlaying(false);
    setRecordingDuration(0); // Reset recording timer
    setPlaybackPosition(0); // Reset playback timer
    setPlaybackDuration(0); // Reset playback duration
  };

  return (
    <>
      <VoiceRecordContainer>
        <VoiceRecordTimer>
          {recording
            ? formatTime(recordingDuration || 0) // Ensure recordingDuration is valid
            : formatTime(playbackPosition || 0)}{" "}
          / {formatTime(recording ? 30000 : playbackDuration || 0)}
        </VoiceRecordTimer>

        <VoiceWaveContainer>
          {[...Array(5)].map((_, index) => (
            <AnimatedWave
              key={index}
              style={{
                transform: [{ scaleY: waveScale }], // Apply scale animation
              }}
            />
          ))}
        </VoiceWaveContainer>
      </VoiceRecordContainer>

      {recordedURI && !isPlaying && (
        <ResetButton onPress={resetRecording}>
          <FontAwesome name="refresh" size={30} color="white" />
        </ResetButton>
      )}

      <VoiceRecordingView style={{ transform: [{ scale: scaleValue }] }}>
        <VoiceRecordButton
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={onHandleMicrophoneButton}
        >
          {recordedURI ? (
            isPlaying ? (
              <FontAwesome name="pause" size={50} color="white" />
            ) : (
              <FontAwesome name="play" size={50} color="white" />
            )
          ) : !recording ? (
            <FontAwesome name="microphone" size={50} color="white" />
          ) : (
            <FontAwesome name="stop" size={50} color="white" />
          )}
        </VoiceRecordButton>
      </VoiceRecordingView>
      {recording ? (
        <VoiceRecordText>Tap to stop recording</VoiceRecordText>
      ) : (
        <VoiceRecordText>Tap to start recording</VoiceRecordText>
      )}
    </>
  );
};

const VoiceRecordContainer = styled(View)`
  width: 90%;
  height: 230px;
  margin-top: 30px;
  padding: 5px;
  border-color: #707070;
  border-width: 0.5px;
  border-radius: 10px;
  align-items: center;
`;

const VoiceRecordTimer = styled(Text)`
  margin-top: 10px;
  color: #122231;
`;

const VoiceRecordText = styled(Text)`
  font-size: 10px;
  margin-top: 60px;
  color: #122231;
`;

const VoiceRecordingView = styled(Animated.View)`
  height: 90px;
  width: 90px;
  border-radius: 45px;
  background-color: #3a7c78;
  bottom: 0px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const VoiceRecordButton = styled(TouchableOpacity)`
  height: 90px;
  width: 90px;
  border-radius: 45px;
  background-color: #3a7c78;
  bottom: 0px;
  position: absolute;
  align-items: center;
  justify-content: center;
`;

const VoiceWaveContainer = styled(View)`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 80%;
  height: 100px;
  margin-top: 20px;
`;

const AnimatedWave = styled(Animated.View)`
  width: 10px;
  height: 50px;
  background-color: #3a7c78;
  border-radius: 5px;
`;

const ResetButton = styled(TouchableOpacity)`
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: #f44336;

  bottom: 20px;
  position: absolute;
  align-items: center;
  justify-content: center;
  left: 50px;
`;
