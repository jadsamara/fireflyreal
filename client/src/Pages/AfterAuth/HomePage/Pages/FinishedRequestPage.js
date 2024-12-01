import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../../../Components/GlobalComponents";
import { Ionicons } from "@expo/vector-icons";

export const FinishedRequestPage = ({ navigation }) => {
  const onHandleNavigate = () => {
    navigation.navigate("HomeStack");
  };

  return (
    <SafeArea>
      <Container>
        <TextContainer>
          <Header>Request Sent!</Header>
          <SubTitle>
            Sit back, relax, and wait for the good news to roll in!
          </SubTitle>
        </TextContainer>

        <Ionicons name="checkmark-circle" size={146} color="#79d17c" />

        <HomeButton onPress={onHandleNavigate}>
          <HomeButtonText>Home</HomeButtonText>
        </HomeButton>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const TextContainer = styled(View)`
  top: 20px;
  left: 20px;
  position: absolute;
`;

const Header = styled(Text)`
  font-size: 28px;
  font-family: poppins-800;
`;

const SubTitle = styled(Text)`
  font-size: 16px;
  font-family: poppins-400;
  margin-top: 30px;
  text-align: start;
  width: 70%;
`;

const HomeButton = styled(TouchableOpacity)`
  background-color: #527e65;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 30px;
  position: absolute;
  bottom: 100px;
  align-self: center;
`;

const HomeButtonText = styled(Text)`
  font-size: 18px;
  font-family: poppins-800;
  color: white;
`;
