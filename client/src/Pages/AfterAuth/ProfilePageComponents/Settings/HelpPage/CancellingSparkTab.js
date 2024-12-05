import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { TableComponent } from "./TableComponent";

export const CancellingSparkTab = () => {
  const leftColumn = {
    title: "As Host",
    data: [
      {
        title: "More than 24 hours before Spark",
        body: "Penalty: Lose 2 Lumins",
      },
      {
        title: "24 - 18 hours before Spark",
        body: "Penalty: Lose 4 Lumins",
      },
      {
        title: "18 - 12 hours before Spark",
        body: "Penalty: Lose 6 Lumins",
      },
      {
        title: "12 - 6 hours before Spark",
        body: "Penalty: Lose 8 Lumins",
      },
      {
        title: "Less than 6 hours before Spark",
        body: "Penalty: Forfeit your entire deposit",
      },
    ],
  };

  const rightColumn = {
    title: "As Participant",
    data: [
      {
        title: "More than 24 hours before Spark",
        body: "Penalty: None, full deposit refunded",
      },
      {
        title: "24 - 18 hours before Spark",
        body: "Penalty: Lose 2 Lumins",
      },
      {
        title: "18 - 12 hours before Spark",
        body: "Penalty: Lose 4 Lumins",
      },
      {
        title: "12 - 6 hours before Spark",
        body: "Penalty: Lose 6 Lumins",
      },
      {
        title: "Less than 6 hours before Spark",
        body: "Penalty: Forfeit your entire deposit",
      },
    ],
  };

  return (
    <Container>
      <FaqCardText>
        Participants may cancel their Spark without penalty as long as it is 24
        hours before the Spark date/time.
      </FaqCardText>
      <Br />
      <FaqCardText>
        If a host cancels a Spark with more than 3 participants, the earliest
        participant to have joined will automatically take over as the new host.
      </FaqCardText>
      <Br />
      <TableTitle>Base Cancellation Penalties</TableTitle>
      <TableComponent
        leftColumn={leftColumn}
        rightColumn={rightColumn}
        leftColor="#FF5252"
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

const TableTitle = styled(Text)`
  font-size: 12px;
  color: #527e65;
  font-family: poppins-700;
  text-align: center;
`;
