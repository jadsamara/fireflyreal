import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";

export const SectionComponent = ({ title, children }) => {
  return (
    <SectionContainer>
      <SectionTitle>{title}</SectionTitle>
      <SectionLine />
      <Container>{children}</Container>
    </SectionContainer>
  );
};

const SectionContainer = styled(View)`
  width: 100%;
  align-self: center;
  padding-top: 25px;
  padding-left: 25px;
  padding-right: 25px;
`;

const SectionTitle = styled(Text)`
  font-size: 14px;
  color: black;
  font-family: poppins-500;
`;

const SectionLine = styled(View)`
  width: 100%;
  height: 0.3px;
  background-color: gray;
  align-self: center;
`;

const Container = styled(View)`
  width: 100%;
  padding: 10px;
`;
