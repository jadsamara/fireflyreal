import React, { useState, useContext, useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../Components/GlobalComponents/SafeArea";
import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";
import * as FileSystem from "expo-file-system";
import { ProgressBar, BackArrow } from "../../Components/PreAuthentication";
import { FontAwesome } from "@expo/vector-icons";

import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

export const CreateAccountPageThree = ({ navigation }) => {
  const {
    setProfilePictureURI,
    profilePictureURI,
    profilePicture,
    setIsPhotoIDVerified,
  } = useContext(AuthenticationStackContext);

  const device = useCameraDevice("front"); // Use the back camera
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isProcessing, setIsProcessing] = useState(false);
  const [retakePhoto, setRetakePhoto] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    const checkPermission = async () => {
      // Explicitly request permission if not determined
      if (hasPermission.status === "notDetermined" || hasPermission === false) {
        await requestPermission();
      }
    };

    checkPermission();
  }, [hasPermission.status, requestPermission]);

  const takePicture = async () => {
    if (cameraRef.current && device) {
      try {
        const photo = await cameraRef.current.takePhoto({
          qualityPrioritization: "quality",
          flash: "off",
        });
        const uri = photo.path;
        setIsProcessing(true);
        await performQuickScan(uri);
        navigation.navigate("FaceScanSuccessPage");

        setIsProcessing(false);
      } catch (error) {
        setIsProcessing(false);
        setRetakePhoto(true);
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture. Please try again.");
      }
    }
  };

  const clearPictureURI = () => {
    setProfilePictureURI("");
    setRetakePhoto(false);
  };

  const performQuickScan = async (uri) => {
    try {
      const fileUri = FileSystem.documentDirectory + "image.jpg";
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      const base64Image = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setProfilePictureURI(base64Image);
      // await performIDScan(base64Image);
    } catch (error) {
      console.error("Error performing quick scan:", error);
      Alert.alert("Error", "Failed to perform quick scan. Please try again.");
    }
  };

  const performIDScan = async (base64Image) => {
    try {
      const apiKey = "injFW5TCX0aUihI6zGIVOypSO0KSQAtb";
      const url = "https://api2.idanalyzer.com/face";

      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({
          face: base64Image,
          reference: profilePicture,
          saveFile: true,
          region: "US", // Replace with appropriate region code
        }),
      };

      const response = await fetch(url, options);
      const responseData = await response.json();

      if (responseData) {
        setIsPhotoIDVerified(1);
      }
    } catch (e) {
      setRetakePhoto(true);
    }
  };

  const onHandleNavigate = () => {
    // navigation.navigate("CreateAccountPageFour");
    navigation.navigate("FaceScanSuccessPage");
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
              ref={cameraRef}
              device={device}
              isActive={true}
              photo={true}
              video={false} // Set to true if video recording is needed
              audio={false}
              style={{
                transform: [{ scale: 1.5 }], // Adjust scaleX for horizontal stretch
              }}
            />
          </CameraContainer>
        ) : (
          <CameraContainer>
            <TakenSelfieCheckImage
              source={{ uri: `data:image/jpeg;base64,${profilePictureURI}` }}
            />
          </CameraContainer>
        )}

        {!profilePictureURI && !isProcessing && !retakePhoto ? (
          <CaptureButton onPress={takePicture}>
            <CaptureText>Capture</CaptureText>
          </CaptureButton>
        ) : isProcessing && profilePictureURI && !retakePhoto ? (
          <Row>
            <ProcessedText>Processing Photo</ProcessedText>
            <ActivityIndicator color="#000" />
          </Row>
        ) : retakePhoto ? (
          <CaptureButton onPress={clearPictureURI}>
            <CaptureText>Retake</CaptureText>
          </CaptureButton>
        ) : (
          <Row>
            <ProcessedText>Done</ProcessedText>

            <FontAwesome name="check" size={22} color="#79d17c" />
          </Row>
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

      <ProgressBar width={"10%"} bottom={0} />
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  align-items: center;
`;

const Title = styled(Text)`
  font-size: 30px;
  color: black;
  font-family: poppins-900;
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

const Row = styled(View)`
  position: absolute;
  bottom: 200px;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

const ProcessedText = styled(Text)`
  color: black;
  font-size: 14px;
  font-family: "poppins-500";
  margin-right: 10px;
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
