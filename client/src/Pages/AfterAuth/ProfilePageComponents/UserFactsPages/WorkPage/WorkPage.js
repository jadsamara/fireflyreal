import React, { useState } from "react";
import { View, TextInput, Text, Switch } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../../../Components/GlobalComponents/SafeArea";

import { BackArrow } from "../../../../../Components/PreAuthentication";
import { useSelector } from "react-redux";
import { SaveButton } from "../SaveButton";

export const WorkPage = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);
  const initialObj = userData.userInformation[6];

  const [userWork, setUserWork] = useState(initialObj);

  const onChangeText = (res) => {
    setUserWork((prevState) => ({
      ...prevState,
      company: res,
    }));
  };

  const toggleHidden = () => {
    setUserWork((prevState) => ({
      ...prevState,
      isHidden: !prevState.isHidden,
    }));
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <Title>Where do you work?</Title>
        <HeaderContainer>
          <HeaderText>Please enter the company you work at.</HeaderText>
        </HeaderContainer>
        <InputContainer>
          <TextInputComponent
            onChangeText={onChangeText}
            value={userWork.company}
            maxLength={60}
            placeholder="Add a workspace"
            placeholderTextColor="gray"
            returnKeyType={"default"}
          />
        </InputContainer>

        <IsHiddenContainer>
          <Row>
            <Switch value={!userWork.isHidden} onValueChange={toggleHidden} />
            <IsHiddenText>Visible on profile?</IsHiddenText>
          </Row>
        </IsHiddenContainer>
        <SaveButton
          backgroundColor={
            initialObj.company === userWork.company &&
            userWork.isHidden === initialObj.isHidden
              ? "gray"
              : "#527e65"
          }
          disabled={
            initialObj.company === userWork.company &&
            userWork.isHidden === initialObj.isHidden
          }
          indexToUpdate={6}
          newInfo={userWork}
          navigation={navigation}
          userData={userData}
        />
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
