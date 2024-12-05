import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const WhenHostCancels = () => {
  return (
    <View>
      <FaqCardText>
        Hosts are humans as well. In the case of a cancellation of a Spark by a
        Host, we ensure that Sparks continue seamlessly. If a host cancels a
        Spark, the participant who was first accepted into the Spark will
        automatically become the new host. This process helps maintain the
        continuity of the event and ensures that the Spark can still take place.
      </FaqCardText>
      <Br />
      <FaqCardText>
        To support participants during this transition, we provide a grace
        period. During the 12 hours following the original host’s cancellation,
        all participants—including the new host—will have the opportunity to
        cancel their participation in the Spark without any penalty. This grace
        period allows everyone to reassess their commitment under the new
        circumstances.
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
