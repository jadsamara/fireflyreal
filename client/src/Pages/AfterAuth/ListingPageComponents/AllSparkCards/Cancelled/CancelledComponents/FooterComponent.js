import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";

import { FontAwesome5 } from "@expo/vector-icons";

export const FooterComponent = ({ spark, penalty }) => {
  return (
    <Container>
      <MoneyDepositContainer>
        <MoneyDepositText>Lumins lost ({penalty})</MoneyDepositText>
        <CoinsLogo name="coins" size={14} color="red" />
      </MoneyDepositContainer>
      <SparkStatusContainer>
        <SparkStatusText>Cancelled</SparkStatusText>
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
  color: red;
  font-size: 11px;
  font-family: poppins-600;
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
