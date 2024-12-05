import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export const GetVerifiedComponent = () => {
  return (
    <Container>
      <Col>
        <Title>Get verified</Title>
        <SubTitle>Want to ensure users know you’re real? </SubTitle>
      </Col>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  width: 95%;
  border-bottom-width: 0.3px;
  border-top-width: 0.3px;
  padding: 10px;
  border-color: gray;
  margin-top: 10px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: space-between;
`;

const Col = styled(View)``;

const Title = styled(Text)`
  font-size: 15px;
  color: black;
  font-family: poppins-500;
`;

const SubTitle = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: poppins-300;
  margin-left: 10px;
`;
