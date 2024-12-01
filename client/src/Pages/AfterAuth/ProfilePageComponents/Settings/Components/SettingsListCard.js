import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";

export const SettingsListCard = ({ res, onHandleNavigateTree }) => {
  const getTabTitle = (res) => {
    switch (res) {
      case "Privacy":
        return "Privacy & Data";
      case "Community":
        return "Community Guidelines";
      case "Legal":
        return "Legal & Policies";
      case "Help":
        return "Help & Support";
      case "About":
        return "About Us";
      default:
        return res;
    }
  };

  const getIconName = (res) => {
    switch (res) {
      case "Account":
        return "account-circle";
      case "Notifications":
        return "notifications";
      case "Privacy":
        return "lock";
      case "Community":
        return "group";
      case "Language":
        return "language";
      case "Legal":
        return "gavel";
      case "Help":
        return "help-outline";
      case "About":
        return "info";
      default:
        return "settings";
    }
  };

  return (
    <TabContainer key={res} onPress={() => onHandleNavigateTree(res)}>
      <Row>
        <MaterialIcons name={getIconName(res)} size={28} color="#527e65" />
        <TabTitle>{getTabTitle(res)}</TabTitle>
      </Row>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </TabContainer>
  );
};

const TabContainer = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 15px;
  border-bottom-width: 0.3px;
  border-color: gray;
  justify-content: space-between;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const TabTitle = styled(Text)`
  font-size: 15px;
  color: black;
  font-family: poppins-400;
  margin-left: 10px;
`;
