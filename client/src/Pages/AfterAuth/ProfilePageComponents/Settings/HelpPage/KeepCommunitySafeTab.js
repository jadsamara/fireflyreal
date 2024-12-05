import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

export const KeepCommunitySafeTab = () => {
  return (
    <View>
      <FaqCardText>
        Your safety is our top priority. Here’s how we ensure a secure
        environment:
      </FaqCardText>
      <Br />
      <FaqCardText>
        Two-Factor Authentication: Every user undergoes two-factor verification
        to confirm their identity.
      </FaqCardText>
      <Br />
      <FaqCardText>
        ID Verification: We employ an ID verification system for an added layer
        of security.
      </FaqCardText>
      <Br />
      <FaqCardText>
        Address Visibility Options: Hosts can choose to keep the exact address
        of their Spark private, sharing it only with accepted participants.
      </FaqCardText>
      <Br />
      <FaqCardText>
        Mandatory Review System: After each Spark, participants are required to
        leave a review. This holds everyone accountable and helps maintain a
        trustworthy community.
      </FaqCardText>
      <Br />
      <FaqCardText>
        By implementing these measures, we strive to create a safe and enjoyable
        experience for all our users.
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
