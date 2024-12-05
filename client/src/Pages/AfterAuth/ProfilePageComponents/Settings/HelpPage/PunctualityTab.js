import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { TableComponent } from "./TableComponent";

export const PunctualityTab = () => {
  const leftColumn = {
    title: "Earning Lumins (+)",
    data: [
      {
        title: "Arriving On Time (+/- 10 minutes)",
        body: "Reward: Full deposit returned + 2 Lumins bonus",
      },
      {
        title: "Reward for hosts",
        body: "Full deposit returned + 5 Lumins bonus",
      },
    ],
  };

  const rightColumn = {
    title: "Losing Lumins (-)",
    data: [
      {
        title: "Arriving Little Late (10 - 15 minutes)",
        body: "Penalty: -2 Lumins from your deposit",
      },
      {
        title: "Running Late (15 - 30 minutes)",
        body: "Penalty: -4 Lumins from your deposit",
      },
      {
        title: "Late (30 - 45 minutes)",
        body: "Penalty: -6 Lumins from your deposit",
      },
      {
        title: "Very Late (45 - 60 minutes)",
        body: "Penalty: -8 Lumins from your deposit",
      },
      {
        title: "No Show (more than 1 hour late)",
        body: "Penalty: Forfeit your entire deposit",
      },
    ],
  };

  return (
    <Container>
      <FaqCardText>
        Lumins serve to reduce the likelihood of flaking and lack of commitment
        in online meet ups. Lumins are earned or lost depending on how punctual
        users are when attending Sparks.
      </FaqCardText>
      <Br />
      <TableComponent
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        leftColor="#4CAF50"
        rightColor="#FF5252"
      />
    </Container>
  );
};

const Container = styled(View)`
  margin-bottom: 10px;
`;

const Br = styled(View)`
  margin-top: 10px;
  margin-bottom: 10px;
`;

const FaqCardText = styled(Text)`
  font-size: 8px;
  color: #527e65;
  font-family: poppins-400;
  margin-left: 10px;
`;
