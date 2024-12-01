import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { SafeArea } from "../../../Components/GlobalComponents";
import { SparkCard } from "./Components/SparkCard";

export const PostSparkSeven = ({ navigation }) => {
  const onHandleNavigate = () => {
    navigation.navigate("Home");
  };

  return (
    <SafeArea>
      <Header>Your Spark is now active!</Header>

      <Container>
        <SparkCard />
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
  padding: 15px;
  justify-content: center;
`;

const Header = styled(Text)`
  font-size: 28px;
  font-family: poppins-800;
  margin-top: 20px;
  text-align: center;
  width: 90%;
  align-self: center;
`;

const HomeButton = styled(TouchableOpacity)`
  background-color: #79d17c;
  align-self: center;
  padding-left: 30px;
  padding-right: 30px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 30px;
  margin-top: 40px;
`;

const HomeButtonText = styled(Text)`
  font-size: 18px;
  font-family: poppins-800;
  color: white;
`;
