import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";

export const HangoutTimesComponent = ({ dateObj = {}, spark }) => {
  const {
    date = "July 10th",
    time = "12:00 pm",
    id = 0,
    isAvailable = "false",
  } = dateObj;

  if (isAvailable) {
    return (
      <Container>
        <ButtonContainerChecked>
          <FirstHalf>
            <FontAwesome name="calendar" size={18} color="white" />
            <DateText>{date}</DateText>
          </FirstHalf>
          <SecondHalf>
            <TimeContainer>
              <AntDesign name="clockcircle" size={18} color="white" />
              <TimeText>{time}</TimeText>
            </TimeContainer>

            <Circle>
              <FontAwesome name="check" size={14} color="green" />
            </Circle>
          </SecondHalf>
        </ButtonContainerChecked>
      </Container>
    );
  } else {
    return (
      <Container>
        <ButtonContainer>
          <FirstHalf>
            <FontAwesome name="calendar" size={18} color="white" />
            <DateText>{date}</DateText>
          </FirstHalf>
          <SecondHalf>
            <TimeContainer>
              <AntDesign name="clockcircle" size={18} color="white" />
              <TimeText>{time}</TimeText>
            </TimeContainer>

            <Circle />
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
`;

const ButtonContainerChecked = styled(TouchableOpacity)`
  width: 80%;
  height: 30px;
  background-color: #527e65;
  flex-direction: row;
  border-radius: 20px;
  padding: 5px;
`;

const ButtonContainer = styled(TouchableOpacity)`
  width: 80%;
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
  padding-left: 5px;
  align-items: center;
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
  align-items: center;
`;

const Circle = styled(View)`
  height: 20px;
  width: 20px;
  background-color: white;
  border-radius: 1000000px;
  justify-content: center;
  align-items: center;
`;
