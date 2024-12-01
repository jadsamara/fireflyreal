import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from "react-native-date-picker";

export const UserRequestDuration = ({ date, setDate }) => {
  const [open, setOpen] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const now = new Date();
    const timeDifference = date - now;
    const totalMinutes = Math.floor(timeDifference / (1000 * 60));
    const totalHours = Math.floor(totalMinutes / 60);
    const totalDays = Math.floor(totalHours / 24);

    setDays(totalDays);
    setHours(totalHours % 24);
    setMinutes(totalMinutes % 60);
  }, [date]);

  return (
    <Container>
      <DatePicker
        modal
        open={open}
        minimumDate={new Date(Date.now() + 10 * 60 * 1000)}
        date={date}
        onConfirm={(selectedDate) => {
          setOpen(false);
          setDate(selectedDate);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
      <Title>Request Duration</Title>
      <TimeContainerButton onPress={() => setOpen(true)}>
        <TimeRectangleView>
          <TimeText>{String(Math.floor(days / 10))}</TimeText>
        </TimeRectangleView>
        <TimeRectangleView>
          <TimeText>{String(days % 10)}</TimeText>
        </TimeRectangleView>
        <ColonText>:</ColonText>
        <TimeRectangleView>
          <TimeText>{String(Math.floor(hours / 10))}</TimeText>
        </TimeRectangleView>
        <TimeRectangleView>
          <TimeText>{String(hours % 10)}</TimeText>
        </TimeRectangleView>
        <ColonText>:</ColonText>
        <TimeRectangleView>
          <TimeText>{String(Math.floor(minutes / 10))}</TimeText>
        </TimeRectangleView>
        <TimeRectangleView>
          <TimeText>{String(minutes % 10)}</TimeText>
        </TimeRectangleView>
      </TimeContainerButton>
      <DaysTextContainer>
        <DaysText>days</DaysText>
        <DaysText>hours</DaysText>
        <DaysText>minutes</DaysText>
      </DaysTextContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 40px;
`;

const Title = styled(Text)`
  font-size: 20px;
  font-family: poppins-400;
`;

const TimeContainerButton = styled(TouchableOpacity)`
  width: 100%;
  flex-direction: row;
  margin-top: 30px;
  align-items: center;
`;

const TimeRectangleView = styled(View)`
  width: 45px;
  height: 65px;
  border-radius: 10px;
  background-color: gray;
  margin-left: 5px;
  justify-content: center;
  align-items: center;
`;

const TimeText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: white;
`;

const ColonText = styled(Text)`
  font-size: 34px;
  font-family: poppins-600;
  margin-left: 10px;
  margin-right: 5px;
`;

const DaysTextContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  justify-content: space-around;
`;

const DaysText = styled(Text)`
  font-size: 12px;
  font-family: poppins-400;
`;
