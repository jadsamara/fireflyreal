import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { SectionComponent } from "../Components";

export const PrivacyPolicy = () => {
  return (
    <SectionComponent title="Privacy Policy">
      <PrivacyPolicyButton>
        <PrivacyPolicyButtonText>REQUEST DATA</PrivacyPolicyButtonText>
      </PrivacyPolicyButton>
    </SectionComponent>
  );
};

const PrivacyPolicyButton = styled(TouchableOpacity)`
  background-color: #79d17c;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 24px;
  align-self: flex-start;
  margin-top: 10px;
  margin-bottom: 24px;
`;

const PrivacyPolicyButtonText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-400;
`;
