import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";

export const BottomDrawer = () => {
  return (
    <CenteredView>
      <SwipeText>Swipe up to learn more about me!</SwipeText>
    </CenteredView>
  );
};

const CenteredView = styled(View)`
  width: 100%;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const SwipeText = styled(Text)`
  font-size: 12px;
  font-family: poppins-500;
  color: black;
`;
