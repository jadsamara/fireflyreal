import { Alert, Text, TouchableOpacity, Linking } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { MaterialIcons } from "@expo/vector-icons";

export const TabCard = ({ res }) => {
  const getLegalPageWebsite = (res) => {
    switch (res) {
      case "Terms of Use":
        return "https://fireflywebsite-ab43b.web.app/termsofuse.html";
      case "Privacy Policy":
        return "https://fireflywebsite-ab43b.web.app/privacypolicy.html";
      case "Cookies Policy":
        return "https://fireflywebsite-ab43b.web.app/cookiespolicy.html";

      default:
        return res;
    }
  };

  const goToLink = () => {
    const url = getLegalPageWebsite(res);
    Linking.openURL(url).catch((err) =>
      Alert.alert("Error", "Unable to open the link. Please try again.")
    );
  };

  return (
    <TabContainer key={res} onPress={goToLink}>
      <TabTitle>{res}</TabTitle>
      <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
    </TabContainer>
  );
};

const TabContainer = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding: 10px;

  border-bottom-width: 0.3px;
  border-color: gray;
  justify-content: space-between;
`;

const TabTitle = styled(Text)`
  font-size: 15px;
  color: black;
  font-family: poppins-400;
`;
