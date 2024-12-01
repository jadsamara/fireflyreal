import { View, Text } from "react-native";
import React from "react";

import styled from "styled-components";

export const Header = ({ spark }) => {
  return (
    <Container>
      <HeaderText>{spark.sparkTitle} - Starting Soon</HeaderText>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  background-color: #ffce5a;
  width: 75%;
  height: 50px;
  z-index: 99999;
  top: 10%;
  left: 12.5%;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
  padding: 15px;
`;

const HeaderText = styled(Text)`
  color: white;
  font-family: "poppins-800";
  font-size: 12px;
`;
