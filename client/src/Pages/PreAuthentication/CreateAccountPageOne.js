import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../Components/GlobalComponents/";

import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";

import {
  ProgressBar,
  ContinueButton,
  BackArrow,
} from "../../Components/PreAuthentication";
import DatePicker from "react-native-date-picker";

import { calculateAge } from "../../Functions/GetAgeNew";

export const CreateAccountPageOne = ({ navigation }) => {
  const { age, setAge } = useContext(AuthenticationStackContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const date = new Date(selectedDate);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    };
    setAge(date.toLocaleDateString("en-GB", options)); // en-GB locale for day/month/year format
  }, [selectedDate]);

  const onHandleNavigate = () => {
    if (calculateAge(age) > 17) {
      navigation.navigate("CreateAccountPageTwo");
    } else {
      Alert.alert("Need to be older than 17");
    }
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />
      <Container>
        <DatePicker
          mode="date"
          modal
          open={open}
          maximumDate={new Date()}
          date={selectedDate}
          onConfirm={(selected) => {
            setOpen(false);
            setSelectedDate(selected);
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <Title>How old are you?</Title>
        <HeaderOneText>Please enter your birthday.</HeaderOneText>

        <InputContainer>
          <AgeButton onPress={() => setOpen(true)}>
            <AgeText>{age}</AgeText>
          </AgeButton>
          <ResendCodeText>*We require all users to be 17+</ResendCodeText>
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
  width: 90%;
  align-self: center;
`;

const AgeButton = styled(TouchableOpacity)`
  width: 100%;
  height: 50px;
  background-color: #e8e8e8;
  border-radius: 16px;
  padding-left: 15px;
  justify-content: center;
`;

const AgeText = styled(Text)`
  color: #527e65;
`;

const ResendCodeText = styled(Text)`
  font-size: 13px;
  color: #686868;
  font-family: poppins-500;
  margin-top: 10px;
  align-self: flex-end;
`;
