import React, {
  useState,
  useEffect,
  useRef,
  useContext,
  useCallback,
} from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import styled from "styled-components/native";
import * as FileSystem from "expo-file-system";
import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";
import {
  Camera,
  useCameraDevice,
  useCameraPermission,
} from "react-native-vision-camera";

import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

import { LoadingScreen } from "../../Components/GlobalComponents/LoadingScreen";

export const CreateAccountPageThree = ({ navigation, route }) => {
  const { idType } = route.params;

  const { profilePictureURI, front, setFront, setIsPhotoIDVerified } =
    useContext(AuthenticationStackContext);
  const device = useCameraDevice("back"); // Use the back camera
  const { hasPermission, requestPermission } = useCameraPermission();
  const [isProcessing, setIsProcessing] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    const checkPermission = async () => {
      // Explicitly request permission if not determined
      if (hasPermission.status === "notDetermined") {
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
        setIsProcessing(false);
      } catch (error) {
        setIsProcessing(false);
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
      setFront(base64Image);
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
          document: base64Image,
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
        setFront("");
      } else if (
        responseData &&
        responseData.data.documentType[0].value === "P"
      ) {
        setIsPhotoIDVerified(2);
        navigation.navigate("CreateAccountPageEight");
      } else {
        navigation.navigate("CreateAccountPageFive", {
          idType,
        });
      }
    } catch (error) {
      setFront("");
      console.error("Error performing ID scan:", error);
      Alert.alert("Error", "Failed to perform ID scan. Please try again.");
    }
  };

  const focus = useCallback((point) => {
    const c = cameraRef.current;
    if (c == null) return;
    c.focus(point);
  }, []);

  const gesture = Gesture.Tap().onEnd(({ x, y }) => {
    runOnJS(focus)({ x, y });
  });

  if (isProcessing && front) {
    return <LoadingScreen />;
  }

  return (
    <GestureDetector gesture={gesture}>
      <Container>
        <Title>Upload {idType.title}</Title>
        <SubTitle>
          Place your ID inside the frame and take a picture. Make sure it is not
          cut or has any glare.
        </SubTitle>
        <CameraComponent
          ref={cameraRef}
          device={device}
          isActive={true}
          photo={true}
          video={false}
          audio={false}
        />

        <Hole />
        <CaptureButton onPress={takePicture}>
          <CaptureButtonTwo />
        </CaptureButton>
      </Container>
    </GestureDetector>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
  z-index: 99999999;
  overflow: hidden;
`;

const Title = styled(Text)`
  position: absolute;
  top: 80px;
  color: white;
  font-family: "poppins-600";
  font-size: 22px;
  z-index: 999999;
  text-align: center;
  align-self: center;
`;

const SubTitle = styled(Text)`
  position: absolute;
  top: 140px;
  color: white;
  font-family: "poppins-400";
  font-size: 16px;
  z-index: 999999;
  text-align: center;
  align-self: center;
  width: 80%;
`;

const CameraComponent = styled(Camera)`
  width: 100%;
  height: 100%;
`;

const Hole = styled(View)`
  height: 230px;
  width: 85%;
  position: absolute;
  top: 300px;
  border-radius: 40px;
  border-width: 3px;
  border-color: white;
  align-self: center;
  background-color: transparent;
  z-index: 999999;
`;

const CaptureButton = styled(TouchableOpacity)`
  position: absolute;
  bottom: 100px;
  width: 90px;
  height: 90px;
  background-color: white;
  border-radius: 50px;
  justify-content: center;
  align-items: center;
  align-self: center;
`;

const CaptureButtonTwo = styled(View)`
  width: 80px;
  height: 80px;
  background-color: white;
  border-radius: 50px;
  border-width: 1px;
`;

const TakenSelfieCheckImage = styled(Image)`
  width: 100%;
  height: 100%;
  flex: 1;
  z-index: 10000;
`;
