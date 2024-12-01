import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";

import { getBackgroundColor } from "../../../../../../Functions/ArrivalTimeFunctions";

export const TimeRemaining = ({ timeRemaining, timeState }) => {
  const formatTime = (milliseconds) => {
    const isNegative = milliseconds < 0; // Check if the value is negative
    const absoluteMilliseconds = Math.abs(milliseconds); // Use absolute value

    const hours = Math.floor(absoluteMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor(
      (absoluteMilliseconds % (1000 * 60 * 60)) / (1000 * 60)
    );
    const seconds = Math.floor((absoluteMilliseconds % (1000 * 60)) / 1000);

    const sign = isNegative ? "-" : ""; // Determine the sign for output

    return `${sign} ${hours} hr : ${minutes} min : ${seconds} sec`;
  };

  return (
    <TimeContainer backgroundColor={getBackgroundColor(timeState)}>
      <FontAwesome5 name="hourglass-end" size={14} color="white" />
      <TimeText>{formatTime(timeRemaining)}</TimeText>
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
  justify-content: center;
  width: 160px;
`;

const TimeText = styled(Text)`
  color: white;
  font-family: "poppins-600";
  font-size: 9px;
  margin-left: 5px;
`;
