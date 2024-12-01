import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components";

import { HangoutTimesComponent } from "./HangoutTimesComponent";

export const UserSelectedDates = ({ availableTimesSelected }) => {
  return (
    <Container>
      <Title>Selected Dates</Title>
      {availableTimesSelected.map((res) => {
        return <HangoutTimesComponent dateObj={res} />;
      })}
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 40px;
`;

const Title = styled(Text)`
  font-size: 20px;
  font-family: poppins-400;
`;
