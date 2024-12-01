import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import { SafeArea } from "../GlobalComponents";

import CoffeeImage from "../../Assets/coffee.png";

import styled from "styled-components/native";

export const DoneSparkPage = ({ navigation }) => {
  const onHandleGoHome = () => {
    navigation.navigate("HomeStack");
  };

  return (
    <SafeArea>
      <Container>
        <TitleText>You did great!</TitleText>
        <SubTitleText>
          Take a break, get some rest, and be ready for the next hangout!
        </SubTitleText>
        <Coffee source={CoffeeImage} />
        <HomeButton onPress={onHandleGoHome}>
          <HomeButtonText>Home</HomeButtonText>
        </HomeButton>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  width: 100%;
  height: 100%;
`;

const TitleText = styled(Text)`
  font-size: 32px;
  color: black;
  font-family: poppins-600;
  margin-top: 50px;
  margin-left: 20px;
`;

const SubTitleText = styled(Text)`
  font-size: 16px;
  color: black;
  font-family: poppins-300;
  margin-top: 30px;
  margin-left: 20px;
  width: 85%;
`;

const DarkOverlay = styled(View)`
  background-color: rgba(0, 0, 0, 0.5);
`;

const Coffee = styled(Image)`
  width: 250px;
  height: 200px;
  resize-mode: contain;
  align-self: center;
  margin-top: 100px;
  tint-color: rgba(0, 0, 0, 0.3);
`;

const HomeButton = styled(TouchableOpacity)`
  width: 180px;
  height: 50px;
  background-color: #79d17c;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  align-self: center;
  margin-top: 100px;
`;

const HomeButtonText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: white;
`;
