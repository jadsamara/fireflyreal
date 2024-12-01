import { Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";
import { CardOne, CardTwo, CardThree, CardFour, CardFive, CardSix } from ".";

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
          {res === "What are Lumins?" && <CardOne />}
          {res === "Lumin deposit system" && <CardTwo />}
          {res === "Earning and losing Lumins" && <CardThree />}
          {res === "Cancelling Sparks" && <CardFour />}
          {res === "What’s with the chat?" && <CardFive />}
          {res === "Keeping our community safe" && <CardSix />}
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
