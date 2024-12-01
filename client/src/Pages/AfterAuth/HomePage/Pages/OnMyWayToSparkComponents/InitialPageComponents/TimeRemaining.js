import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";

export const TimeRemaining = ({ spark }) => {
  const [timeRemaining, setTimeRemaining] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = spark.chosenTime - Date.now();
      setTimeRemaining(remaining);
    }, 1000);

    return () => clearInterval(timer);
  }, [spark]);

  const formatTime = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((milliseconds % (1000 * 60)) / 1000);

    return `${hours} hr : ${minutes} min : ${seconds} sec`;
  };

  return (
    <TimeContainer>
      <FontAwesome5 name="hourglass-end" size={14} color="white" />
      <TimeText>{formatTime(timeRemaining)}</TimeText>
    </TimeContainer>
  );
};

const TimeContainer = styled(View)`
  position: absolute;
  background-color: #ffce5a;
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
