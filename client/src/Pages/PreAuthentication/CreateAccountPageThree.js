import React, { useState, useContext, useEffect, useRef } from "react";
import { View, Text, TouchableOpacity, Image, Alert } from "react-native";
import styled from "styled-components/native";

import { Camera } from "expo-camera";

import { SafeArea } from "../../Components/GlobalComponents/SafeArea";

import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";

import * as FileSystem from "expo-file-system";

import { ProgressBar, BackArrow } from "../../Components/PreAuthentication";

export const CreateAccountPageThree = ({ navigation }) => {
  const [hasPermission, setHasPermission] = useState(null);

  const { setProfilePictureURI, profilePictureURI } = useContext(
    AuthenticationStackContext
  );

  const cameraRef = useRef(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };

    requestCameraPermission();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        await performQuickScan(uri);
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture. Please try again.");
      }
    }
  };

  const clearPictureURI = () => {
    setProfilePictureURI("");
  };

  const performQuickScan = async (uri) => {
    try {
      const fileUri = FileSystem.documentDirectory + "image.jpg";
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      const base64Image = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      setProfilePictureURI(base64Image);
      console.log(base64Image);
    } catch (error) {
      console.error("Error performing quick scan:", error);
      Alert.alert("Error", "Failed to perform quick scan. Please try again.");
    }
  };

  const onHandleNavigate = () => {
    navigation.navigate("CreateAccountPageFour");
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <Title>Take A Selfie</Title>

        {hasPermission === null ? (
          <Text>Requesting camera permission...</Text>
        ) : hasPermission === false ? (
          <Text>No access to camera.</Text>
        ) : !profilePictureURI ? (
          <CameraContainer>
            <CameraComponent
              autoFocus={"on"}
              ref={cameraRef}
              type={Camera.Constants.Type.front}
            ></CameraComponent>
          </CameraContainer>
        ) : (
          <CameraContainer>
            <TakenSelfieCheckImage
              source={{ uri: `data:image/jpeg;base64,${profilePictureURI}` }}
            />
          </CameraContainer>
        )}

        {!profilePictureURI ? (
          <CaptureButton onPress={takePicture}>
            <CaptureText>Capture</CaptureText>
          </CaptureButton>
        ) : (
          <CaptureButton onPress={clearPictureURI}>
            <CaptureText>Retake</CaptureText>
          </CaptureButton>
        )}

        {!profilePictureURI ? (
          <ContinueTouchableDisabled>
            <ContinueButtonText>Continue</ContinueButtonText>
          </ContinueTouchableDisabled>
        ) : (
          <ContinueTouchable onPress={onHandleNavigate}>
            <ContinueButtonText>Continue</ContinueButtonText>
          </ContinueTouchable>
        )}
      </Container>
      <ProgressBar width={"60%"} />
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;

const Title = styled(Text)`
  position: absolute;
  top: 10px;
  left: 30px;
  color: black;
  font-family: "poppins-900";
  font-size: 34px;
`;

const CameraContainer = styled(View)`
  height: 320px;
  width: 280px;
  overflow: hidden;
  border-radius: 160.5px; /* Half of the width */
  position: absolute;
  top: 120px;
`;

const CameraComponent = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const CaptureButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 200px;
  width: 165px;
  height: 40px;
  background-color: #79d17c;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

const CaptureText = styled(Text)`
  color: white;
  font-size: 16px;
  font-weight: bold;
`;

const ContinueTouchableDisabled = styled(View)`
  width: 165px;
  height: 40px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 90px;
  right: 20px;
  background-color: gray;
`;

const ContinueTouchable = styled(TouchableOpacity)`
  width: 165px;
  height: 40px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 90px;
  right: 20px;
  background-color: #527e65;
`;

const ContinueButtonText = styled(Text)`
  color: white;
  font-size: 18px;
  font-family: poppins-600;
`;

const TakenSelfieCheckImage = styled(Image)`
  width: 100%;
  height: 100%;
  flex: 1;
  z-index: 10000;
`;
