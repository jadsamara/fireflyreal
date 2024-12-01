import React, { useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import styled from "styled-components";
import { HangoutTimesComponent } from "./HangoutTimesComponent";
import { format } from "date-fns";

export const CalendarSectionComponent = ({ currentTimeInMS, currentID }) => {
  const customTheme = {
    textDayFontFamily: "poppins-700",
    textMonthFontFamily: "poppins-600",
    textDayHeaderFontFamily: "poppins-600",
    arrowColor: "black",
    backgroundColor: "#E1E1E1",
    calendarBackground: "#E1E1E1",
    selectedDayTextColor: "white",
    todayTextColor: "black",
  };

  const selectedColor = "#415F74";

  const markedDates = {};
  const date = new Date(currentTimeInMS);
  const dateString = date.toISOString().split("T")[0];
  markedDates[dateString] = { selected: true, selectedColor };

  const formattedDate = format(date, "MMM do"); // Use 'MMM' for short month name
  const formattedTime = format(date, "h:mm a");

  const formattedData = {
    id: currentID,
    date: formattedDate,
    time: formattedTime,
  };

  return (
    <Container>
      <CalendarTimeContainer>
        <CalendarComponent theme={customTheme} markedDates={markedDates} />

        <HangoutTimesComponent dateObj={formattedData} />
      </CalendarTimeContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
`;

const CalendarTimeContainer = styled(View)`
  width: 90%;
  background-color: #e1e1e1;
  border-radius: 15px;
  padding-bottom: 20px;
  align-self: center;
  margin-top: 20px;
`;

const CalendarComponent = styled(Calendar)`
  border-radius: 15px;
`;
