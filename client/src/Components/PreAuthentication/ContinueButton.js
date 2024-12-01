import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";

export const ContinueButton = ({ onPress }) => {
  return (
    <ContinueTouchable onPress={onPress}>
      <ContinueButtonText>Continue</ContinueButtonText>
    </ContinueTouchable>
  );
};

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
