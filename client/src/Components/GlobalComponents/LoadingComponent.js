import { View } from "react-native";
import React from "react";

import styled from "styled-components/native";

import { ActivityIndicator } from "react-native-paper";

export const LoadingComponent = () => {
  return (
    <Container>
      <ActivityIndicator size="large" color="#79d17c" />
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: absolute;
`;
