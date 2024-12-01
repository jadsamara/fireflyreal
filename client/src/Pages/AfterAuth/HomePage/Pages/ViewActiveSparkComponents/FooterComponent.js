import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

export const FooterComponent = ({
  spark,
  navigation,
  setToggleCancelModal,
}) => {
  const onHandleNavigate = () => {
    navigation.navigate("OnMyWayToSparkPage", {
      spark: spark,
    });
  };

  const cancelSpark = async () => {
    setToggleCancelModal(true);
  };

  return (
    <Container>
      <SparkLockInButtonsContainer>
        <TouchableOpacity onPress={cancelSpark}>
          <CantMakeItText>I can’t make it.</CantMakeItText>
        </TouchableOpacity>
        <OnMyWayButton onPress={onHandleNavigate}>
          <OnMyWayText>On My Way!</OnMyWayText>
        </OnMyWayButton>
      </SparkLockInButtonsContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 90%;
  margin-top: 20px;
  margin-bottom: 50px;
  align-items: center;
  align-self: center;
`;

const SparkLockInButtonsContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 50px;
`;

const CantMakeItText = styled(Text)`
  font-size: 12px;
  font-family: "poppins-400";
  color: red;
`;

const OnMyWayButton = styled(TouchableOpacity)`
  background-color: #82d0c2;
  padding: 15px;
  width: 150px;
  border-radius: 28px;
  justify-content: center;
  align-items: center;
`;

const OnMyWayText = styled(Text)`
  font-size: 14px;
  font-family: "poppins-500";
  color: white;
`;
