import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "../../Components/GlobalComponents/";
import { CameraView, useCameraPermissions } from "expo-camera/next";
import * as FileSystem from "expo-file-system";
import { ProgressBar, BackArrow } from "../../Components/PreAuthentication";
import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";
import { FontAwesome } from "@expo/vector-icons";

export const CreateAccountPageFive = ({ navigation }) => {
  const [hasPermission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false);
  const [retakePhoto, setRetakePhoto] = useState(false);

  const { profilePictureURI, front, isPhotoIDVerified, back, setBack } =
    useContext(AuthenticationStackContext);
  const cameraRef = useRef(null);

  useEffect(() => {
    if (!hasPermission) {
      requestPermission();
    }
  }, [hasPermission, requestPermission]);

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const { uri } = await cameraRef.current.takePictureAsync();
        setIsProcessing(true);
        await performQuickScan(uri);
        setIsProcessing(false);
      } catch (error) {
        setIsProcessing(false);
        setRetakePhoto(true);
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture. Please try again.");
      }
    }
  };

  const performQuickScan = async (uri) => {
    try {
      const fileUri = FileSystem.documentDirectory + "image.jpg";
      await FileSystem.copyAsync({ from: uri, to: fileUri });

      const base64Image = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      setBack(base64Image);
      await performIDScan(base64Image);
    } catch (error) {
      console.error("Error performing quick scan:", error);
      Alert.alert("Error", "Failed to perform quick scan. Please try again.");
    }
  };

  const performIDScan = async (base64Image) => {
    try {
      const apiKey = "injFW5TCX0aUihI6zGIVOypSO0KSQAtb";
      const url = "https://api2.idanalyzer.com/scan";

      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "X-API-KEY": apiKey,
        },
        body: JSON.stringify({
          face: profilePictureURI,
          document: front,
          documentBack: base64Image,
          saveFile: true,
          region: "US", // Replace with appropriate region code
        }),
      };

      const response = await fetch(url, options);
      const responseData = await response.json();

      if (
        responseData &&
        responseData.warning[0].code === "UNRECOGNIZED_DOCUMENT"
      ) {
        setRetakePhoto(true);
      } else if (responseData) {
        navigation.navigate("AddPhotosOne");
      }

      Alert.alert("Scan Result", "ID scan completed successfully!");
    } catch (error) {
      setRetakePhoto(true);

      console.error("Error performing ID scan:", error);
      Alert.alert("Error", "Failed to perform ID scan. Please try again.");
    }
  };

  const clearPictureURI = () => {
    setBack("");
    setRetakePhoto(false);
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <Title>Take A Picture of Your ID</Title>
        {hasPermission === null ? (
          <Text>Requesting camera permission...</Text>
        ) : hasPermission === false ? (
          <Text>No access to camera.</Text>
        ) : !back ? (
          <CameraContainer>
            <CameraComponent ref={cameraRef} type="back" />
          </CameraContainer>
        ) : (
          <CameraContainer>
            <TakenSelfieCheckImage
              source={{ uri: `data:image/jpeg;base64,${back}` }}
            />
          </CameraContainer>
        )}

        <SubTitle>Back Side</SubTitle>

        {!back && !isProcessing && !retakePhoto ? (
          <CaptureButton onPress={takePicture}>
            <CaptureText>Capture</CaptureText>
          </CaptureButton>
        ) : isProcessing && back && !retakePhoto ? (
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
      </Container>
      <ProgressBar width={"70%"} />
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled(Text)`
  position: absolute;
  top: 20px;
  left: 30px;
  color: black;
  font-family: "poppins-900";
  font-size: 28px;
`;

const SubTitle = styled(Text)`
  color: black;
  font-family: "poppins-600";
  font-size: 14px;
  position: absolute;
  bottom: 300px;
`;

const CameraContainer = styled(View)`
  height: 230px;
  width: 85%;
  overflow: hidden;
  position: absolute;
  top: 150px;
  border-radius: 40px;
`;

const CameraComponent = styled(CameraView)`
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
  font-family: "poppins-700";
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

const TakenSelfieCheckImage = styled(Image)`
  width: 100%;
  height: 100%;
  flex: 1;
  z-index: 10000;
`;

const CheckMarkView = styled(View)``;
