import React, { useState, useContext } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../Components/GlobalComponents/";

import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";
import { confirmCode } from "./ConfigFunctions/VerificationCodes";

import {
  ProgressBar,
  ContinueButton,
  BackArrow,
} from "../../Components/PreAuthentication";

export const VerifyCodePage = ({ navigation }) => {
  const { verificationId } = useContext(AuthenticationStackContext);

  const [verificationCode, setVerificationCode] = useState("");

  const onHandleSubmitVerification = () => {
    confirmCode({
      verificationCode,
      verificationId,
      setVerificationCode,
      navigation,
    });
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />
      <Container>
        <Title>We sent a code.</Title>
        <HeaderOneText>Please enter the code you received.</HeaderOneText>

        <InputContainer>
          <VerificationCodeInput
            value={verificationCode}
            onChangeText={setVerificationCode}
            maxLength={6}
            keyboardType="phone-pad"
            placeholder="Code"
            placeholderTextColor="gray"
            returnKeyType={"done"}
          />
          <ResendCodeButton>
            <ResendCodeText>Resend Code</ResendCodeText>
          </ResendCodeButton>
        </InputContainer>
        <ContinueButton onPress={onHandleSubmitVerification} />
        <ProgressBar width={"20%"} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const Title = styled(Text)`
  font-size: 40px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const HeaderOneText = styled(Text)`
  font-size: 23px;
  color: #686868;
  font-family: poppins-500;
  margin-top: 12px;
  margin-left: 15px;
`;

const InputContainer = styled(View)`
  margin-top: 120px;
  align-items: center;
  width: 70%;
  align-self: center;
`;

const VerificationCodeInput = styled(TextInput)`
  width: 100%;
  height: 50px;
  background-color: #cac8c8;
  border-radius: 16px;
  padding-left: 20px;
  font-family: poppins-400;
`;

const ResendCodeButton = styled(TouchableOpacity)`
  margin-top: 10px;
  align-self: flex-end;
`;

const ResendCodeText = styled(Text)`
  font-size: 13px;
  color: #ff0000;
  font-family: poppins-300;
`;
