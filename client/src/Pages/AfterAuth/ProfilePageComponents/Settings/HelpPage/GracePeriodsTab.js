import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const GracePeriodsTab = () => {
  return (
    <View>
      <FaqCardText>
        At Firefly, we understand that unexpected changes can occur. To ensure
        fairness and flexibility for all participants, we have established a
        grace period following a host’s cancellation of a spark.
      </FaqCardText>
      <Br />
      <FaqCardText>
        Automatic Host Transfer: The participant who was first accepted into the
        spark will automatically become the new host. This helps maintain the
        continuity of the event.
      </FaqCardText>
      <Br />
      <FaqCardText>
        12-Hour Grace Period: A grace period of 12 hours begins immediately
        after the original host’s cancellation.
      </FaqCardText>
      <Br />
      <FaqCardText>During this 12-hour grace period:</FaqCardText>
      <Br />

      <FaqCardText>
        Penalty-Free Cancellation: All participants, including the new host,
        have the option to cancel their participation in the spark without any
        penalty.
      </FaqCardText>
      <Br />

      <FaqCardText>
        Opportunity to Reassess: This period allows everyone to reconsider their
        commitment under the new circumstances, whether it’s taking on the
        hosting role or continuing as a participant.
      </FaqCardText>
      <Br />
      <FaqCardText>After the Grace Period Ends:</FaqCardText>
      <Br />
      <FaqCardText>
        Penalties Apply: Once the 12-hour grace period has concluded, standard
        cancellation policies resume. Penalties for late cancellations and
        arrivals will apply as per our standard policy, including any lumins
        deductions associated with cancelling or arriving late to a spark.
      </FaqCardText>
      <Br />

      <FaqCardText>
        We believe this grace period offers a fair opportunity for all members
        to adjust their plans without repercussions. It ensures that no one is
        penalized for changes outside of their control while keeping the spirit
        of our community alive.
      </FaqCardText>

      <Br />
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
