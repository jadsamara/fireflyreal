import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

export const FooterComponentLive = ({ setToggleCancelModal }) => {
  const cancelSpark = async () => {
    setToggleCancelModal(true);
  };

  return (
    <Container>
      <CancelSparkButton onPress={cancelSpark}>
        <CancelSparkText>Cancel Spark</CancelSparkText>
      </CancelSparkButton>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  flex-direction: row;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: center;
`;

const CancelSparkButton = styled(TouchableOpacity)`
  background-color: red;
  padding-right: 20px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const CancelSparkText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: white;
`;
