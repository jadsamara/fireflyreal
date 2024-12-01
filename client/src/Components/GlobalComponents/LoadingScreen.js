import { View } from "react-native";
import React from "react";

import styled from "styled-components/native";

import { ActivityIndicator } from "react-native-paper";

export const LoadingScreen = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#fff" />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #79d17c;
  align-items: center;
  justify-content: center;
`;
