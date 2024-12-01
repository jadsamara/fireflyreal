import React, { useContext } from "react";
import { View, Text, ScrollView } from "react-native";
import styled from "styled-components/native";

import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";

import {
  ProgressBar,
  ContinueButton,
  BackArrow,
} from "../../Components/PreAuthentication";

import { SafeArea } from "../../Components/GlobalComponents/SafeArea";

import { PageEightSections } from "./Components/PageEightSections";
import { SubmitUser } from "./ConfigFunctions/SubmitUser";

export const CreateAccountPageEight = ({ navigation }) => {
  const onHandleNavigate = () => {
    // navigation.navigate("CreateAccountPageEight");
  };

  return (
    <SafeArea>
      <Scroll>
        <BackArrow navigation={navigation} />

        <Container>
          <TitleContainer>
            <Title>We’re almost there!</Title>
          </TitleContainer>
          <HeaderContainer>
            <HeaderText>
              Before you finish signing up, please remember
            </HeaderText>
          </HeaderContainer>

          <PageEightSections />

          <FooterHeaderContainer>
            <Label>If this sounds like your community,</Label>
            <GreenLabel>press continue</GreenLabel>
          </FooterHeaderContainer>

          <FooterContainer>
            <SubmitUser />
            <ProgressBar width={"95%"} />
          </FooterContainer>
        </Container>
      </Scroll>
    </SafeArea>
  );
};

const Scroll = styled(ScrollView)`
  flex: 1;
`;

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const TitleContainer = styled(View)`
  justify-content: flex-end;
`;

const Title = styled(Text)`
  font-size: 25px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const HeaderContainer = styled(View)`
  margin-top: 18px;
`;

const HeaderText = styled(Text)`
  font-size: 16px;
  color: black;
  font-family: poppins-300;
  text-align: center;
`;

const FooterHeaderContainer = styled(View)`
  align-items: center;
  margin-top: 60px;
`;

const Label = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: poppins-500;
`;

const GreenLabel = styled(Text)`
  font-size: 12px;
  color: #79d17c;
  font-family: poppins-600;
`;

const FooterContainer = styled(View)`
  margin-top: 220px;
`;
