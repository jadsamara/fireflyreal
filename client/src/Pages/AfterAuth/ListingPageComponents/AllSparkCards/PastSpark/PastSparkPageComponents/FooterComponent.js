import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import {
  getBackgroundColor,
  onHandleRefundString,
  getType,
} from "../../../../../../Functions/ArrivalTimeFunctions";

import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

export const FooterComponent = ({ spark, arrivalData }) => {
  return (
    <Container>
      <MoneyDepositContainer>
        <MoneyDepositText>+{spark.luminsPrice}</MoneyDepositText>
        <CoinsLogo name="coins" size={14} color="#79D17C" />
        <MoneyDepositText>refunded </MoneyDepositText>
        <MoneyDepositText>
          and {onHandleRefundString(arrivalData.timeState)}
        </MoneyDepositText>
        <CoinsLogo name="coins" size={14} color="#79D17C" />
        <MoneyDepositText> for being</MoneyDepositText>
        <MoneyDepositTextState
          color={getBackgroundColor(arrivalData.timeState)}
        >
          {" "}
          "{getType(arrivalData.timeState)}"
        </MoneyDepositTextState>
      </MoneyDepositContainer>
      <SparkStatusContainer>
        <SparkStatusText>Completed</SparkStatusText>
      </SparkStatusContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 50px;
  align-self: center;
  align-items: center;
`;

const MoneyDepositContainer = styled(View)`
  width: 100%;
  margin-top: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MoneyDepositText = styled(Text)`
  color: #79d17c;
  font-size: 11px;
  font-family: poppins-600;
`;

const MoneyDepositTextState = styled(Text)`
  font-size: 11px;
  font-family: poppins-600;
  color: ${({ color }) => color};
`;

const CoinsLogo = styled(FontAwesome5)`
  margin-left: 3px;
  margin-right: 5px;
`;

const SparkStatusContainer = styled(View)`
  margin-top: 20px;
  align-self: center;
  background-color: #707070;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const SparkStatusText = styled(Text)`
  color: white;
  font-size: 10px;
  font-family: poppins-500;
`;
