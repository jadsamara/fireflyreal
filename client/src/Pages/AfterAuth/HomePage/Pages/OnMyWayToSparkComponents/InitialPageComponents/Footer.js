import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";

import styled from "styled-components";
import { FontAwesome5, MaterialIcons, Ionicons } from "@expo/vector-icons";

export const Footer = ({ spark }) => {
  return (
    <Container>
      <FirstRow>
        <FontAwesome5 name="running" size={44} color="white" />
        <HeaderText>Verifying location . . .</HeaderText>
      </FirstRow>
      <LastRow>
        <ShareLocationButton>
          <MaterialIcons name="my-location" size={20} color="#2ca8ff" />

          <ShareLocationButtonText>Share Location</ShareLocationButtonText>
        </ShareLocationButton>
      </LastRow>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  background-color: rgba(83, 184, 255, 0.6);
  z-index: 99999;
  bottom: 0px;
  width: 100%;
  height: 200px;
  padding: 15px;
  justify-content: space-between;
`;

const FirstRow = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const HeaderText = styled(Text)`
  color: white;
  font-family: "poppins-800";
  font-size: 18px;
  margin-left: 20px;
`;

const LastRow = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;

const ShareLocationButton = styled(TouchableOpacity)`
  width: 60%;
  height: 50px;
  background-color: white;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-width: 1px;
  border-color: white;
`;

const ShareLocationButtonText = styled(Text)`
  color: #2ca8ff;
  font-family: "poppins-600";
  font-size: 14px;
`;
