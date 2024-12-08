import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";

export const ContinueButton = ({ onPress, bottom }) => {
  return (
    <ContinueTouchable
      onPress={onPress}
      bottom={bottom}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
      }}
    >
      <ContinueButtonText>Continue</ContinueButtonText>
    </ContinueTouchable>
  );
};

const ContinueTouchable = styled(TouchableOpacity)`
  width: 165px;
  height: 40px;
  border-radius: 26px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: ${({ bottom }) => (bottom ? `${bottom}px` : `0px`)};
  right: 20px;
  background-color: #527e65;
`;

const ContinueButtonText = styled(Text)`
  color: white;
  font-size: 20px;
  font-family: poppins-600;
`;
