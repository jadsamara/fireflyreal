import React from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import styled from "styled-components";
import { format } from "date-fns";
import { HangoutTimesComponentConfirmed } from "./HangoutTimesConfirmed";

export const CalendarSectionComponent = ({ spark }) => {
  const customTheme = {
    textDayFontFamily: "poppins-700",
    textMonthFontFamily: "poppins-600",
    textDayHeaderFontFamily: "poppins-600",
    arrowColor: "black",
    backgroundColor: "#E1E1E1",
    calendarBackground: "#E1E1E1",
    selectedDayTextColor: "black",
    todayTextColor: "black",
    selectedDayBackgroundColor: "#77e8a7",
  };

  const selectedColor = "#77e8a7";

  // Prepare markedDates based on spark.chosenTime
  const markedDates = {};
  const chosenDate = new Date(spark.chosenTime);
  const dateString = chosenDate.toISOString().split("T")[0];
  markedDates[dateString] = { selected: true, selectedColor };

  return (
    <Container>
      <CalendarSubTitleContainer>
        <CalendarSubTitle>Date</CalendarSubTitle>
      </CalendarSubTitleContainer>
      <CalendarTimeContainer>
        <CalendarComponent theme={customTheme} markedDates={markedDates} />

        <HangoutTimesComponentConfirmed
          dateObj={{
            id: spark.chosenTime,
            date: format(new Date(spark.chosenTime), "MMM do"),
            time: format(new Date(spark.chosenTime), "h:mm a"),
          }}
        />
      </CalendarTimeContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 15px;
`;

const CalendarSubTitleContainer = styled(View)`
  width: 100%;
`;

const CalendarSubTitle = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  margin-left: 15px;
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
