import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const CardFive = () => {
  return (
    <View>
      <FaqCardText>
        When you participate in a Spark, your deposited Lumins are in holding
        until the event concludes. Your punctuality affects how many Lumins you
        get back.
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
  font-size: 10px;
  color: #527e65;
  font-family: poppins-400;
`;
