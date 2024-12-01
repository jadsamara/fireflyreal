import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";

export const ProgressBar = ({ width }) => {
  return (
    <Container>
      <Bar>
        <FilledPortion width={width} />
      </Bar>
      <LabelContainers>
        <Label>First things first</Label>
        <Label>Build your profile</Label>
        <Label>Verified!</Label>
      </LabelContainers>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  align-self: center;
  align-items: center;
  width: 85%;
  height: 50px;
  bottom: 20px;
`;

const Bar = styled(View)`
  width: 100%;
  height: 8px;
  border-radius: 5px;
  border-width: 0.5px;
  border-color: #91ffc1;
`;

const FilledPortion = styled(View)`
  width: ${(props) => props.width || "0%"};
  height: 100%; /* Adjusted height to match the bar */
  background-color: #b0cc99;
  border-radius: 5px;
`;

const LabelContainers = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin-top: 10px;
`;

const Label = styled(Text)`
  font-size: 8px;
  color: #527e65;
  font-family: poppins-700;
`;
