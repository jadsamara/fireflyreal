import React, { useContext } from "react";
import { View, TextInput, Text } from "react-native";
import styled from "styled-components/native";

import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";

import {
  ProgressBar,
  ContinueButton,
  BackArrow,
} from "../../Components/PreAuthentication";

import { SafeArea } from "../../Components/GlobalComponents/SafeArea";

export const CreateAccountPageSeven = ({ navigation }) => {
  const { setBio, bio } = useContext(AuthenticationStackContext);

  const onHandleNavigate = () => {
    navigation.navigate("ViewProfilePage");
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <TitleContainer>
          <Title>Create your bio</Title>
        </TitleContainer>
        <HeaderContainer>
          <HeaderText>Some questions to consider…</HeaderText>
          <PreQuestionsText>
            What are some things people should know about you?
          </PreQuestionsText>
          <PreQuestionsText>What brings you to Firefly?</PreQuestionsText>
          <PreQuestionsText>Who do you want to meet?</PreQuestionsText>
        </HeaderContainer>
        <InputContainer>
          <BioInput
            onChangeText={setBio}
            value={bio}
            placeholder="Start typing here"
            placeholderTextColor="black"
            multiline={true}
            textAlignVertical="top"
            blurOnSubmit={true}
          />
          <MaxCharText>{bio.length}/250 char</MaxCharText>
        </InputContainer>

        <ContinueButton onPress={onHandleNavigate} />
        <ProgressBar width={"80%"} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const TitleContainer = styled(View)`
  justify-content: flex-end;
`;

const Title = styled(Text)`
  font-size: 30px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const HeaderContainer = styled(View)`
  margin-top: 18px;
`;

const HeaderText = styled(Text)`
  font-size: 18px;
  color: black;
  font-family: poppins-300;
  margin-left: 15px;
`;

const PreQuestionsText = styled(Text)`
  font-size: 13px;
  color: gray;
  font-family: poppins-300;
  margin-left: 15px;
  margin-top: 7px;
`;

const InputContainer = styled(View)`
  width: 100%;
  align-items: center;
  margin-top: 45px;
  position: relative;
`;

const BioInput = styled(TextInput)`
  width: 90%;
  height: 170px;
  background-color: #e0dfdf;
  border-radius: 20px;
  text-align: left;
  padding: 18px;
  font-family: poppins-400;
  font-size: 15px;
`;

const MaxCharText = styled(Text)`
  font-family: poppins-400;
  font-size: 14px;
  position: absolute;
  bottom: 10px;
  right: 40px;
`;
