import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const CancellationPenalties = () => {
  return (
    <View>
      <FaqCardText>Understanding Penalty Adjustments</FaqCardText>
      <FaqCardText>
        At Firefly, we aim to create a fair and enjoyable experience for all our
        users.
      </FaqCardText>
      <Br />

      <FaqCardText>
        We understand that plans can change unexpectedly, so we’ve designed our
        cancellation policy to be flexible and considerate.
      </FaqCardText>
      <Br />

      <FaqCardText>
        To ensure fairness, we use an algorithm that adjusts penalties based on
        several factors, reflecting group dynamics and promoting equity.
      </FaqCardText>
      <Br />

      <FaqCardText>
        Please note: We have different adjustment algorithms for both hosts and
        participants. We encourage all users to review both to fully understand
        how they may be affected.
      </FaqCardText>
      <Br />
      <Title>Cancellation Penalty Adjustments - Host</Title>

      <FaqCardText>
        At Firefly, we deeply value the commitment our hosts make to create
        unforgettable experiences for our participants. Hosting comes with
        significant rewards, reflecting your essential role in our community. To
        uphold trust and reliability, cancelling a spark as a host carries a
        proportionally greater penalty.
      </FaqCardText>
      <Br />

      <FaqCardText>
        Our cancellation penalties are designed to be equitable, considering
        factors such as how many participants had already joined your Spark, how
        many participants had cancelled prior to your cancellation, and how
        close to the start time you cancelled. Even if you cancel more than 24
        hours before the spark, a base penalty of (-2) lumins will apply.
        However, the penalty may be reduced if participants had already
        cancelled before you did.
      </FaqCardText>
      <Br />

      <FaqCardText>
        We strongly encourage all hosts to honor their sparks to uphold the high
        standards that define Firefly.
      </FaqCardText>
      <Br />

      <Title>Cancellation Penalty Adjustments - Participant</Title>
      <FaqCardText>
        At Firefly, we deeply appreciate the commitment our participants make to
        engage in meaningful Sparks. Participation comes with unique rewards,
        reflecting your essential role in our community. To maintain trust and
        reliability, cancelling your participation in a spark may carry a
        penalty.
      </FaqCardText>
      <Br />

      <FaqCardText>
        Our cancellation penalties are designed to be equitable, considering
        factors such as how many participants had cancelled prior and how close
        to the start time you cancelled. However, there will be no penalty for
        participants who cancel less than 24 hours before the Spark. This policy
        acknowledges that unforeseen circumstances can arise close to the event
        time.
      </FaqCardText>
      <Br />

      <FaqCardText>
        We strongly encourage all participants to honour their commitments to
        uphold the high standards that define Firefly. Thank you for your
        understanding and for contributing to our vibrant community.
      </FaqCardText>
      <Br />
    </View>
  );
};

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

const Title = styled(Text)`
  font-size: 10px;
  color: black;
  font-family: poppins-600;
  margin-left: 10px;
`;
