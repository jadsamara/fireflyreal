import React, { useContext } from "react";
import { View, TextInput, Text } from "react-native";
import styled from "styled-components/native";

import { AuthenticationStackContext } from "../../../../Context/AuthenticationStackContext";

import {
  ProgressBar,
  ContinueButton,
  BackArrow,
} from "../../../../Components/PreAuthentication";

import { SafeArea } from "../../../../Components/GlobalComponents/SafeArea";

export const HomeTown = ({ navigation }) => {
  const { homeTown, setHomeTown } = useContext(AuthenticationStackContext);

  const onHandleNavigate = () => {
    navigation.navigate("LanguagePage");
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <Title>Where are you from?</Title>
        <HeaderContainer>
          <HeaderText>
            Please enter your hometown or the place where you live currently.
          </HeaderText>
        </HeaderContainer>
        <InputContainer>
          <TextInputComponent
            onChangeText={setHomeTown}
            value={homeTown}
            maxLength={60}
            placeholder="City, Country"
            placeholderTextColor="gray"
            returnKeyType={"default"}
          />
        </InputContainer>

        <ContinueButton onPress={onHandleNavigate} />
        <ProgressBar width={"30%"} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const Title = styled(Text)`
  font-size: 39px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const HeaderContainer = styled(View)`
  margin-top: 28px;
  position: relative;
`;

const HeaderText = styled(Text)`
  font-size: 16px;
  color: #686868;
  font-family: poppins-500;
  margin-left: 15px;
`;

const InputContainer = styled(View)`
  width: 100%;
  height: 70px;
  align-items: center;
  margin-top: 45px;
`;

const TextInputComponent = styled(TextInput)`
  width: 90%;
  height: 50px;
  background-color: #cac8c8;
  border-radius: 16px;
  padding-left: 20px;
`;
