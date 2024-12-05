import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const WhatAreLuminsTab = () => {
  return (
    <View>
      <FaqCardText>
        Lumins are our in-app currency designed to foster commitment and enhance
        your experience. Every user starts with 30 Lumins. To host or join a
        Spark (our term for an event or meetup), you need to deposit a minimum
        of 10 Lumins.
      </FaqCardText>
      <Br />
      <FaqCardText>
        This system ensures that all participants are serious about attending,
        making your interactions more reliable and enjoyable.
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
