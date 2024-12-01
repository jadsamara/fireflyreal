import { View, Text } from "react-native";
import React from "react";

import styled from "styled-components";

import { getBackgroundColor } from "../../../../../../Functions/ArrivalTimeFunctions";

export const Header = ({ spark, timeState }) => {
  return (
    <Container backgroundColor={getBackgroundColor(timeState)}>
      <HeaderText>{spark.sparkTitle} - Here!</HeaderText>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  background-color: ${({ backgroundColor }) => backgroundColor};
  width: 75%;
  height: 50px;
  z-index: 99999;
  top: 10%;
  left: 12.5%;
  justify-content: center;
  align-items: center;
  border-radius: 50px;
`;

const HeaderText = styled(Text)`
  color: white;
  font-family: "poppins-800";
  font-size: 14px;
`;
