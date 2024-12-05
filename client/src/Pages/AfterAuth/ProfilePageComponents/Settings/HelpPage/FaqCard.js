import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";
import {
  WhatAreLuminsTab,
  LuminDepositSysTab,
  EarningAndLosingLuminsTab,
  CancellingSparkTab,
  WhatsWithChatTab,
  KeepCommunitySafeTab,
  PunctualityTab,
  CancellationPenalties,
  WhenHostCancels,
  GracePeriodsTab,
} from ".";

export const FaqCard = ({ res }) => {
  const [isActive, setIsActive] = useState(false);

  const setFaqCardToActive = () => {
    setIsActive((res) => !res);
  };

  return (
    <Container onPress={setFaqCardToActive}>
      <TabContainer>
        <TabTitle>{res}</TabTitle>
        <MaterialIcons
          name={isActive ? "keyboard-arrow-up" : "keyboard-arrow-down"}
          size={24}
          color="black"
        />
      </TabContainer>
      {isActive ? (
        <View>
          {res === "What are Lumins?" && <WhatAreLuminsTab />}
          {res === "Lumin deposit system" && <LuminDepositSysTab />}
          {res === "Punctuality and Lumins" && <PunctualityTab />}
          {res === "Earning and losing Lumins" && <EarningAndLosingLuminsTab />}
          {res === "Cancelling Sparks" && <CancellingSparkTab />}
          {res === "Cancellation Penalties" && <CancellationPenalties />}
          {res === "When Host Cancels" && <WhenHostCancels />}
          {res === "Grace Periods" && <GracePeriodsTab />}
          {res === "What’s with the chat?" && <WhatsWithChatTab />}
          {res === "Keeping our community safe" && <KeepCommunitySafeTab />}
        </View>
      ) : null}
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  border-bottom-width: 0.3px;
  border-color: gray;
`;

const TabContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
`;

const TabTitle = styled(Text)`
  font-size: 14px;
  color: black;
  font-family: poppins-600;
`;
