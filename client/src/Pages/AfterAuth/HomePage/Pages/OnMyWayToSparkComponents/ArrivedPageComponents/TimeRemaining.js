import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";

import {
  getBackgroundColor,
  getType,
} from "../../../../../../Functions/ArrivalTimeFunctions";

export const TimeRemaining = ({ timeState }) => {
  return (
    <TimeContainer backgroundColor={getBackgroundColor(timeState)}>
      <FontAwesome5 name="hourglass-end" size={14} color="white" />
      <TimeText>{getType(timeState)}</TimeText>
    </TimeContainer>
  );
};

const TimeContainer = styled(View)`
  position: absolute;
  background-color: ${({ backgroundColor }) => backgroundColor};
  z-index: 999;
  bottom: 230px;
  right: 10px;
  align-items: center;
  flex-direction: row;
  border-radius: 16px;
  padding: 5px;
  padding-left: 20px;
  padding-right: 20px;
  justify-content: center;
`;

const TimeText = styled(Text)`
  color: white;
  font-family: "poppins-600";
  font-size: 10px;
  margin-left: 5px;
`;
