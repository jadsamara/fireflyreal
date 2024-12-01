import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { FontAwesome, AntDesign, Ionicons } from "@expo/vector-icons";

export const HangoutTimesComponent = ({ dateObj = {} }) => {
  const { date = "July 10th", time = "12:00 pm", id = 0 } = dateObj;

  return (
    <Container>
      <CurrentButtonContainer>
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
};

const Container = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  flex-direction: row;
`;

const CurrentButtonContainer = styled(View)`
  width: 80%;
  height: 30px;
  background-color: #415f74;
  flex-direction: row;
  border-radius: 20px;
  padding: 5px;
`;

const FirstHalf = styled(View)`
  width: 40%;
  flex-direction: row;
  justify-content: start;
  padding-left: 10px;
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
  padding-left: 40px;
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
