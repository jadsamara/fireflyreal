import { View, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";

export const AnyQuestionsComponent = () => {
  const handleEmailPress = () => {
    const email = "Firefly@support.com";
    const subject = "Support Request";
    const body = "Hi, I need help with...";
    const mailto = `mailto:${email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    Linking.openURL(mailto).catch((err) =>
      console.error("Failed to open email client:", err)
    );
  };

  return (
    <Container>
      <TitleText>Have any questions? Contact us!</TitleText>
      <ContactButton onPress={handleEmailPress}>
        <Ionicons name="mail" size={24} color="#527e65" />

        <ContactButtonText>Firefly@support.com</ContactButtonText>
      </ContactButton>
    </Container>
  );
};

const Container = styled(View)`
  margin-top: 64px;
`;

const TitleText = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: poppins-700;
`;

const ContactButton = styled(TouchableOpacity)`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 20px;
  padding-bottom: 20px;
  border-width: 1px;
  margin-top: 20px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  border-color: #527e65;
`;

const ContactButtonText = styled(Text)`
  font-size: 12px;
  color: #527e65;
  font-family: poppins-700;
  margin-left: 12px;
`;
