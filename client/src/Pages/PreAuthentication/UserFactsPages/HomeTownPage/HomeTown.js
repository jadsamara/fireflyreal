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
import { Entypo } from "@expo/vector-icons";

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
          <HeaderText>Please enter your hometown.</HeaderText>
        </HeaderContainer>
        <InputContainer>
          <TextInputContainer>
            <Entypo name="home" size={24} color="#527e65" />
            <TextInputComponent
              onChangeText={setHomeTown}
              value={homeTown}
              maxLength={60}
              placeholder="City"
              placeholderTextColor="gray"
              returnKeyType={"default"}
            />
          </TextInputContainer>
        </InputContainer>

        <ContinueButton onPress={onHandleNavigate} bottom={120} />
        <ProgressBar width={"10%"} bottom={0} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const Title = styled(Text)`
  font-size: 38px;
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
  justify-content: center;
  margin-top: 45px;
`;

const TextInputContainer = styled(View)`
  width: 90%;
  height: 50px;
  background-color: #ebebeb;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
`;

const TextInputComponent = styled(TextInput)`
  width: 90%;
  height: 50px;
  background-color: #ebebeb;
  border-radius: 16px;
  font-family: poppins-600;
  padding-left: 10px;
`;
