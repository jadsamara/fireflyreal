import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";

import styled from "styled-components/native";

import { SparkCard } from "./ArrivalPageComponents/SecondArrivedComponents/SparkCard";

import { FontAwesome } from "@expo/vector-icons";

export const SecondArrivedPage = ({ route, navigation }) => {
  const { spark, arrivalData } = route.params;

  const navigateToThirdArrivedPage = () => {
    navigation.navigate("ThirdArrivedPage", {
      spark,
      arrivalData,
    });
  };

  const onHandleGoBack = () => {
    navigation.goBack();
  };

  return (
    <ScrollContainer>
      <TitleText>What a Day!</TitleText>
      <SubTitle>
        Take a moment to review and rate your spark to keep our community safe
      </SubTitle>

      <SparkCardBackground>
        <SparkCard spark={spark} arrivalData={arrivalData} />
      </SparkCardBackground>
      <Row>
        <EndHangoutButton onPress={onHandleGoBack}>
          <EndHangoutText>Hangout hasn't ended</EndHangoutText>
        </EndHangoutButton>
        <ContinueHangoutButton onPress={navigateToThirdArrivedPage}>
          <ContinueHangoutText>Let's go</ContinueHangoutText>
          <FontAwesome name="arrow-circle-right" size={30} color="green" />
        </ContinueHangoutButton>
      </Row>
    </ScrollContainer>
  );
};

const ScrollContainer = styled(ScrollView)`
  height: 100%;
  width: 100%;
`;

const TitleText = styled(Text)`
  font-size: 30px;
  font-family: poppins-600;
  margin-top: 80px;
  margin-left: 30px;
`;

const SubTitle = styled(Text)`
  font-size: 14px;
  font-family: poppins-500;
  margin-top: 30px;
  text-align: center;
`;

const SparkCardBackground = styled(View)`
  width: 95%;
  background-color: rgba(222, 222, 222, 1);
  margin-top: 20px;
  align-self: center;
  border-radius: 20px;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 100%;
  margin-top: 80px;
  justify-content: space-around;
  align-items: center;
`;

const EndHangoutButton = styled(TouchableOpacity)``;

const EndHangoutText = styled(Text)`
  font-size: 10px;
  font-family: poppins-400;
  color: red;
`;

const ContinueHangoutButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ContinueHangoutText = styled(Text)`
  font-size: 20px;
  font-family: poppins-600;
  color: #527e65;
  margin-right: 10px;
`;
