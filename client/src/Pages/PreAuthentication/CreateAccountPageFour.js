import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "../../Components/GlobalComponents/";
import { BackArrow } from "../../Components/PreAuthentication";

import { PassportSVG } from "./Components/PassportSVG";

export const CreateAccountPageFour = ({ navigation }) => {
  const navigateToNextPage = () => {
    navigation.navigate("ChooseIdPage");
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />
      <Title>Verify Identity</Title>
      <HeaderOneText>
        We need some information to help us confirm your identity.
      </HeaderOneText>

      <Container>
        <PassportSVG />
        <ChooseIDTypeButton
          onPress={navigateToNextPage}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 5 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5, // For Android
          }}
        >
          <ButtonText>Choose document type</ButtonText>
        </ChooseIDTypeButton>
        <HeaderTwoText>
          We need some information to help us confirm your identity.
        </HeaderTwoText>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  align-items: center;
  margin-top: 60px;
`;

const Title = styled(Text)`
  font-size: 34px;
  color: black;
  font-family: poppins-700;
  text-align: center;
  margin-top: 20px;
`;

const HeaderOneText = styled(Text)`
  font-size: 18px;
  color: #686868;
  font-family: poppins-500;
  margin-top: 12px;
  text-align: center;
`;

const HeaderTwoText = styled(Text)`
  font-size: 14px;
  color: #686868;
  font-family: poppins-500;
  margin-top: 20px;
  text-align: center;
  align-self: center;
  width: 80%;
`;

const ChooseIDTypeButton = styled(TouchableOpacity)`
  padding: 20px;
  width: 80%;
  background-color: #527e65;
  border-radius: 12px;
  align-self: center;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
`;

const ButtonText = styled(Text)`
  font-size: 16px;
  font-family: poppins-500;
  color: #fff;
`;
