import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";

import styled from "styled-components";

export const DurationComponent = ({ arrivalData }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime(); // Get current time in ms
      const timeDifference = now - arrivalData.timeInMs; // Calculate elapsed time since arrivalData.timeInMs

      const totalMinutes = Math.floor(timeDifference / (1000 * 60));
      const totalHours = Math.floor(totalMinutes / 60);

      setHours(totalHours);
      setMinutes(totalMinutes % 60);
    };

    // Run timer update immediately, then every minute
    updateTimer();
    const interval = setInterval(updateTimer, 60000); // Update every minute

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [arrivalData]);

  return (
    <Container>
      <TitleText>Duration</TitleText>

      <TimeContainer>
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
      </TimeContainer>
      <DaysTextContainer>
        <DaysTextHours>hours</DaysTextHours>
        <DaysTextMins>minutes</DaysTextMins>
      </DaysTextContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 5px;
  padding: 15px;
`;

const TitleText = styled(Text)`
  font-size: 16px;
  font-family: poppins-500;
  margin-left: 10px;
`;

const TimeContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  margin-top: 30px;

  align-items: center;
  align-self: center;
  justify-content: center;
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
  justify-content: center;
`;

const DaysTextHours = styled(Text)`
  font-size: 12px;
  font-family: poppins-400;
  margin-right: 45px;
`;

const DaysTextMins = styled(Text)`
  font-size: 12px;
  font-family: poppins-400;
  margin-left: 45px;
`;
