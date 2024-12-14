import React, { useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../Components/GlobalComponents/SafeArea";
import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";
import { ProgressBar, BackArrow } from "../../Components/PreAuthentication";

import { useFace } from "@biopassid/face-sdk-react-native";

import { useCameraPermission } from "react-native-vision-camera";

export const CreateAccountPageThree = ({ navigation }) => {
  const { takeFace } = useFace();

  const { setProfilePictureURI, profilePicture, setIsPhotoIDVerified } =
    useContext(AuthenticationStackContext);

  const { hasPermission, requestPermission } = useCameraPermission();

  useEffect(() => {
    const checkPermission = async () => {
      // Explicitly request permission if not determined
      if (hasPermission.status === "notDetermined" || hasPermission === false) {
        await requestPermission();
      }
    };

    checkPermission();
  }, [hasPermission.status, requestPermission]);

  const onPress = async () => {
    await takeFace({
      config: {
        licenseKey: "NWK5-KPH4-5MGS-NHFA",
      },
      onFaceCapture: async (image) => {
        const prefixedBase64Image = `data:image/jpeg;base64,${image}`;
        await performIDScan(prefixedBase64Image);
      },
    });
  };

  const performIDScan = async (base64Image) => {
    try {
      setProfilePictureURI(base64Image);
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
        navigation.navigate("FaceScanSuccessPage");
      }
    } catch (e) {}
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <TouchableOpacity onPress={onPress}>
          <Text>hi</Text>
        </TouchableOpacity>
      </Container>

      <ProgressBar width={"10%"} bottom={0} />
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
