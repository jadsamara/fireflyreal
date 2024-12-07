import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import styled from "styled-components/native";
import { MaterialIcons } from "@expo/vector-icons";

export const MyGlowCard = ({ title, content, isHidden, onPress }) => {
  return (
    <ButtonContainer onPress={onPress}>
      <Col>
        <Title>{title}</Title>
        <SubTitle>{content}</SubTitle>
      </Col>
      <Row>
        <HiddenText>{isHidden ? "Hidden" : "Visible"}</HiddenText>
        <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
      </Row>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(TouchableOpacity)`
  width: 95%;
  border-top-width: 0.3px;
  padding: 5px;
  border-color: gray;
  margin-top: 10px;
  flex-direction: row;
  align-self: center;
  align-items: center;
  justify-content: space-between;
`;

const Col = styled(View)``;

const Title = styled(Text)`
  font-size: 13px;
  color: black;
  font-family: poppins-500;
`;

const SubTitle = styled(Text)`
  font-size: 10px;
  color: black;
  font-family: poppins-300;
  margin-left: 10px;
  margin-top: 5px;
`;

const Row = styled(View)`
  flex-direction: row;
`;

const HiddenText = styled(Text)`
  font-size: 10px;
  color: gray;
  font-family: poppins-300;
  margin-top: 5px;
  margin-right: 10px;
`;
