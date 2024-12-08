import React, { useState, useContext, useRef } from "react";
import { View, Text, TextInput, Alert } from "react-native"; // Correct import for Text component

import styled from "styled-components";
import { SafeArea } from "../../Components/GlobalComponents/SafeArea";

import { CountryCodeButton } from "../../Components/CountryCodeButton/CountryCodeButton";
import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";

import { sendVerification } from "./ConfigFunctions/VerificationCodes";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";

import { firebaseConfig } from "../../Config/firebase";
import {
  BackArrow,
  ProgressBar,
  ContinueButton,
} from "../../Components/PreAuthentication";

export const LoginPage = ({ navigation }) => {
  const { setVerificationId, countryCode } = useContext(
    AuthenticationStackContext
  );

  const [phoneNumber, setPhoneNumber] = useState("");

  const recaptchaVerifier = useRef(null);

  const onHandleSubmitNumber = () => {
    if (phoneNumber) {
      sendVerification({
        setPhoneNumber,
        phoneNumber,
        setVerificationId,
        countryCode,
        recaptchaVerifier,
        navigation,
      }).then((res) => {
        console.log(res);
      });
    } else {
      Alert.alert("Missing Phone Number");
    }
  };

  const formatPhoneNumber = (input) => {
    // Remove all non-digit characters from the input
    let formattedNumber = input.replace(/\D/g, "");

    // Apply the desired formatting
    const phoneNumberPattern = /(\d{1,3})(\d{1,3})?(\d{1,4})?/;
    const matches = formattedNumber.match(phoneNumberPattern);

    if (matches) {
      formattedNumber = "(" + matches[1];
      if (matches[2]) {
        formattedNumber += ") " + matches[2];
      }
      if (matches[3]) {
        formattedNumber += "-" + matches[3];
      }
    }

    return formattedNumber;
  };

  const handlePhoneNumberChange = (input) => {
    const formattedNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedNumber);
  };

  return (
    <SafeArea>
      <Container>
        <TitleText>Welcome to Firefly.</TitleText>
        <HeaderOneText>To get started, enter your phone number.</HeaderOneText>
        <SMSText>SMS rates may apply.</SMSText>
        <FirebaseRecaptchaVerifierModal
          ref={recaptchaVerifier}
          firebaseConfig={firebaseConfig}
        />
        <InputContainer>
          <CountryCodeButton navigation={navigation} />
          <PhoneNumberInput
            value={phoneNumber}
            onChangeText={handlePhoneNumberChange}
            maxLength={14}
            keyboardType="phone-pad"
            placeholder="Your phone number"
            placeholderTextColor="gray"
            returnKeyType={"done"}
          />
        </InputContainer>

        <MessageText>
          We will message you a code to validate your number
        </MessageText>
        <ContinueButton onPress={onHandleSubmitNumber} bottom={120} />
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

const TitleText = styled(Text)`
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

const SMSText = styled(Text)`
  font-size: 10px;
  color: black;
  font-family: poppins-200;
  margin-top: 12px;
  margin-left: 15px;
`;

const InputContainer = styled(View)`
  width: 100%;
  height: 70px;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  margin-left: 15px;
`;

const PhoneNumberInput = styled(TextInput)`
  width: 70%;
  height: 50px;
  background-color: #ebebeb;
  margin-left: 10px;
  border-radius: 16px;
  padding-left: 20px;
  font-family: poppins-400;
`;

const MessageText = styled(Text)`
  font-size: 16px;
  color: #686868;
  font-family: poppins-500;
  margin-top: 40px;
  text-align: center;
  z-index: -9999;
  width: 80%;
  align-self: center;
`;
