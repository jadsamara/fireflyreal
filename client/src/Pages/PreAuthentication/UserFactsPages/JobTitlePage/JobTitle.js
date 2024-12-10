import React, { useContext } from "react";
import { View, TextInput, Text, Switch } from "react-native";
import styled from "styled-components/native";

import { AuthenticationStackContext } from "../../../../Context/AuthenticationStackContext";

import {
  ProgressBar,
  ContinueButton,
  BackArrow,
} from "../../../../Components/PreAuthentication";

import { SafeArea } from "../../../../Components/GlobalComponents/SafeArea";

export const JobTitle = ({ navigation }) => {
  const { userJobTitle, setUserJobTitle } = useContext(
    AuthenticationStackContext
  );

  const onHandleNavigate = () => {
    navigation.navigate("CreateAccountPageSix");
  };

  const onChangeText = (res) => {
    setUserJobTitle((prevState) => ({
      ...prevState,
      title: res,
    }));
  };

  const toggleHidden = () => {
    setUserJobTitle((prevState) => ({
      ...prevState,
      isHidden: !prevState.isHidden,
    }));
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <Title>What's your job title?</Title>
        <HeaderContainer>
          <HeaderText>Please enter your position in the company.</HeaderText>
        </HeaderContainer>
        <InputContainer>
          <TextInputComponent
            onChangeText={onChangeText}
            value={userJobTitle.title}
            maxLength={60}
            placeholder="Add job title"
            placeholderTextColor="gray"
            returnKeyType={"default"}
          />
        </InputContainer>

        <IsHiddenContainer>
          <Row>
            <Switch
              value={!userJobTitle.isHidden}
              onValueChange={toggleHidden}
            />
            <IsHiddenText>Visible on profile?</IsHiddenText>
          </Row>
        </IsHiddenContainer>

        <ContinueButton onPress={onHandleNavigate} bottom={80} />
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
  font-size: 28px;
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
  background-color: #ebebeb;
  border-radius: 16px;
  padding-left: 20px;
  font-family: poppins-500;
`;

const IsHiddenContainer = styled(View)`
  border-top-width: 1px;
  border-top-color: gray;
  margin-top: 60px;
  width: 90%;
  align-self: center;
`;

const Row = styled(View)`
  flex-direction: row;
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

const IsHiddenText = styled(Text)`
  color: black;
  font-family: poppins-500;
  font-size: 14px;
  margin-left: 12px;
`;
