import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

import { BackArrow } from "../../../../../Components/PreAuthentication";

export const SettingsHeader = ({ navigation, title, icon }) => {
  return (
    <Container>
      <BackArrow navigation={navigation} />
      <TitleText>{title}</TitleText>
      <MaterialIcons
        name={icon}
        size={28}
        color="#527e65"
        style={{ marginLeft: 8 }}
      />
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
`;

const TitleText = styled(Text)`
  font-size: 18px;
  font-family: poppins-700;
  margin-left: 18px;
`;
