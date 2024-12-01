import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { format } from "date-fns";

import {
  getBackgroundColor,
  getType,
} from "../../../../../../../Functions/ArrivalTimeFunctions";

export const BodyComponent = ({ spark, arrivalData }) => {
  const formattedTime = arrivalData.timeInMs
    ? format(new Date(arrivalData.timeInMs), "h:mm a")
    : "";

  return (
    <Container>
      <TitleText>Arrived</TitleText>
      <Row>
        <TimeText>{formattedTime}</TimeText>
        <OnTimeTag backgroundColor={getBackgroundColor(arrivalData.timeState)}>
          <OnTimeText>{getType(arrivalData.timeState)}</OnTimeText>
        </OnTimeTag>
      </Row>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 5px;
  padding: 15px;
`;

const TitleText = styled(Text)`
  font-size: 16px;
  font-family: poppins-500;
  margin-left: 10px;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 90%;
  align-self: center;
  margin-top: 10px;
  align-items: center;
`;

const TimeText = styled(Text)`
  font-size: 14px;
  font-family: poppins-500;
  margin-left: 10px;
`;

const OnTimeTag = styled(View)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  height: 20px;
  border-radius: 10px;
  margin-left: 10px;
  justify-content: center;
  align-items: center;
  padding-left: 5px;
  padding-right: 5px;
`;

const OnTimeText = styled(Text)`
  font-size: 9px;
  font-family: poppins-500;
  color: white;
`;
