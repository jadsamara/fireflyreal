import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { FontAwesome6 } from "@expo/vector-icons";

export const IDTab = ({ res, navigation }) => {
  const navigateToNextPage = () => {
    navigation.navigate("CreateAccountPageThree", {
      idType: res,
    });
  };

  return (
    <Container
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.15,
        shadowRadius: 3.84,
        elevation: 5, // For Android
      }}
      onPress={navigateToNextPage}
    >
      <IconCircle>
        <FontAwesome6 name={res.icon} size={16} color="white" />
      </IconCircle>
      <Col>
        <Title>{res.title}</Title>
        <HeaderOneText>{res.subtitle}</HeaderOneText>
      </Col>
    </Container>
  );
};

const Container = styled(TouchableOpacity)`
  width: 90%;
  border-color: rgba(112, 112, 112, 0.3);
  border-width: 0.5px;
  border-radius: 20px;
  background-color: white;
  flex-direction: row;
  padding: 25px;
  align-items: center;
  margin-top: 30px;
`;

const Col = styled(View)`
  margin-left: 30px;
  align-items: flex-start;
`;

const Title = styled(Text)`
  font-size: 16px;
  color: black;
  font-family: poppins-600;
`;

const HeaderOneText = styled(Text)`
  font-size: 12px;
  color: #686868;
  font-family: poppins-400;
`;

const IconCircle = styled(View)`
  background-color: #6236ff;
  width: 38px;
  height: 38px;
  border-radius: 20px;
  border-color: darkgray;
  border-width: 2px;
  justify-content: center;
  align-items: center;
`;
