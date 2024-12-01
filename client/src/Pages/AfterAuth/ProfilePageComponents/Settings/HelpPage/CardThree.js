import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const CardThree = () => {
  return (
    <View>
      <FaqCardText>
        Lumins serve to reduce the likelihood of flaking and lack of commitment
        in online meet ups. Lumins are earned or lost depending on how punctual
        users are when attending Sparks.
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
