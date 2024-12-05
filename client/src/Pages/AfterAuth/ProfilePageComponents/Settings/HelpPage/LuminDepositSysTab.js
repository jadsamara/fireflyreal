import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const LuminDepositSysTab = () => {
  return (
    <View>
      <FaqCardText>
        When you participate in a Spark, your deposited Lumins are in holding
        until the event concludes. Your punctuality affects how many Lumins you
        get back.
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
