import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components/native";

import FaceRecognition from "../../Assets/face-recognition.png";
import { SafeArea } from "../../Components/GlobalComponents";
import { BackArrow, ContinueButton } from "../../Components/PreAuthentication";

import { Entypo } from "@expo/vector-icons";

export const FaceScanSuccessPage = ({ navigation }) => {
  const onHandleNavigate = () => {
    navigation.navigate("GoExtraStepPage");
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />
      <TitleText>Success!</TitleText>

      <Container>
        <ImageContainer source={FaceRecognition} />
        <Row>
          <SubtitleText>Screen Completed!</SubtitleText>
          <Entypo name="check" size={20} color="green" />
        </Row>
        <BottomFooterText>
          Thank you for completing the screening and keeping Firefly a safe
          space.
        </BottomFooterText>
      </Container>
      <ContinueButton onPress={onHandleNavigate} bottom={120} />
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 10px;
  align-items: center;
  justify-content: center;
`;

const TitleText = styled(Text)`
  font-size: 34px;
  color: black;
  font-family: poppins-700;
  width: 100%;
  text-align: center;
`;

const ImageContainer = styled(Image)`
  height: 128px;
  width: 128px;
  align-self: center;
`;

const Row = styled(View)`
  flex-direction: row;
  margin-top: 10px;
  justify-content: center;
  margin-top: 12px;
  align-items: center;
`;

const SubtitleText = styled(Text)`
  font-size: 12px;
  font-family: poppins-400;
  margin-right: 15px;
`;

const BottomFooterText = styled(Text)`
  text-align: center;
  font-size: 12px;
  width: 95%;
  font-family: poppins-400;
  align-self: center;
  margin-top: 100px;
  margin-bottom: 80px;
`;
