import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";

export const HangoutTimesComponent = ({
  dateObj = {},
  currentID,
  setCurrentID,
}) => {
  const { date = "July 10th", time = "12:00 pm", id = 0, userCount } = dateObj;

  const onHandleChangeCurrentDate = () => {
    setCurrentID(id);
  };

  if (currentID === id) {
    return (
      <Container>
        <PersonContainer>
          <Ionicons name="person" size={32} color="#B1B1B1" />
          <PersonCircle>
            <PersonCircleText>{userCount}</PersonCircleText>
          </PersonCircle>
        </PersonContainer>
        <CurrentButtonContainer onPress={onHandleChangeCurrentDate}>
          <FirstHalf>
            <FontAwesome name="calendar" size={18} color="white" />
            <DateText>{date}</DateText>
          </FirstHalf>
          <SecondHalf>
            <TimeContainer>
              <AntDesign name="clockcircle" size={18} color="white" />
              <TimeText>{time}</TimeText>
            </TimeContainer>
          </SecondHalf>
        </CurrentButtonContainer>
      </Container>
    );
  } else {
    return (
      <Container>
        <PersonContainer>
          <Ionicons name="person" size={32} color="#B1B1B1" />
          <PersonCircle>
            <PersonCircleText>{userCount}</PersonCircleText>
          </PersonCircle>
        </PersonContainer>
        <ButtonContainer onPress={onHandleChangeCurrentDate}>
          <FirstHalf>
            <FontAwesome name="calendar" size={18} color="white" />
            <DateText>{date}</DateText>
          </FirstHalf>
          <SecondHalf>
            <TimeContainer>
              <AntDesign name="clockcircle" size={18} color="white" />
              <TimeText>{time}</TimeText>
            </TimeContainer>
          </SecondHalf>
        </ButtonContainer>
      </Container>
    );
  }
};

const Container = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  flex-direction: row;
`;

const PersonContainer = styled(View)`
  margin-right: 10px;
  position: relative;
`;

const PersonCircle = styled(View)`
  width: 14px;
  height: 14px;
  border-radius: 100px;
  background-color: #79d17c;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  right: 0px;
`;

const PersonCircleText = styled(Text)`
  color: white;
  font-family: poppins-600;
  font-size: 8px;
`;

const CurrentButtonContainer = styled(TouchableOpacity)`
  width: 70%;
  height: 30px;
  background-color: #79d17c;
  flex-direction: row;
  border-radius: 20px;
  padding: 5px;
`;

const ButtonContainer = styled(TouchableOpacity)`
  width: 70%;
  height: 30px;
  background-color: gray;
  flex-direction: row;
  border-radius: 20px;
  padding: 5px;
`;

const FirstHalf = styled(View)`
  width: 40%;
  flex-direction: row;
  justify-content: start;
  padding-left: 3px;
`;

const DateText = styled(Text)`
  color: white;
  font-family: poppins-800;
  font-size: 12px;
  margin-left: 8px;
`;

const SecondHalf = styled(View)`
  width: 60%;
  flex-direction: row;
  padding-left: 20px;
  justify-content: space-between;
`;

const TimeText = styled(Text)`
  color: white;
  font-family: poppins-800;
  font-size: 12px;
  margin-left: 5px;
`;

const TimeContainer = styled(View)`
  flex-direction: row;
`;
