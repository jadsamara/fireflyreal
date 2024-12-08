import React, { useContext } from "react";
import { View, TextInput, Text, Alert } from "react-native";
import styled from "styled-components/native";

import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";

import {
  ProgressBar,
  ContinueButton,
  BackArrow,
  GenderButtons,
} from "../../Components/PreAuthentication";

import { SafeArea } from "../../Components/GlobalComponents/SafeArea";

export const CreateAccountPageTwo = ({ navigation }) => {
  const { name, setName, gender, setGender } = useContext(
    AuthenticationStackContext
  );

  const onHandleNavigate = () => {
    if (name && gender) {
      navigation.navigate("AddPhotosOne");
    } else {
      Alert.alert("Need name and gender");
    }
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <Title>Tell us about yourself.</Title>
        <HeaderOneText>What is your name and gender?</HeaderOneText>
        <InputContainer>
          <NameTextInput
            onChangeText={setName}
            value={name}
            maxLength={14}
            placeholder="Name"
            placeholderTextColor="gray"
            returnKeyType={"default"}
          />
        </InputContainer>
        <GenderContainer>
          <GenderButtons setGender={setGender} gender={gender} />
        </GenderContainer>
        <ContinueButton onPress={onHandleNavigate} bottom={120} />
        <ProgressBar width={"10%"} bottom={0} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
  margin-top: 10px;
`;

const Title = styled(Text)`
  font-size: 38px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const HeaderOneText = styled(Text)`
  font-size: 22px;
  color: #686868;
  font-family: poppins-500;
  margin-top: 12px;
  margin-left: 15px;
`;

const InputContainer = styled(View)`
  width: 100%;
  height: 70px;
  align-items: center;
  margin-top: 45px;
`;

const NameTextInput = styled(TextInput)`
  width: 90%;
  height: 50px;
  background-color: #ebebeb;
  border-radius: 16px;
  padding-left: 20px;
`;

const GenderContainer = styled(View)`
  width: 100%;
  height: 25%;
  flex-direction: row;
  justify-content: space-evenly;
  margin-top: 10px;
`;
