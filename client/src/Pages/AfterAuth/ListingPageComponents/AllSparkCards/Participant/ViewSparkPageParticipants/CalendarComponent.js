import React from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import styled from "styled-components";
import { format } from "date-fns";
import { HangoutTimesComponent } from "./HangoutTimesComponent";
import { HangoutTimesComponentConfirmed } from "./HangoutTimesConfirmed";
import { auth } from "../../../../../../Config/firebase";

export const CalendarSectionComponent = ({ spark }) => {
  const userNumber = auth.currentUser.phoneNumber;
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
  let formattedData = [];

  // Prepare markedDates based on spark.chosenTime
  const markedDates = {};
  if (spark.chosenTime) {
    const chosenDate = new Date(spark.chosenTime);
    const dateString = chosenDate.toISOString().split("T")[0];
    markedDates[dateString] = { selected: true, selectedColor };
  } else {
    const requester = spark.allRequesters.find((r) => r.user === userNumber);
    const availableTimes = requester
      ? Array.isArray(requester.availableTimesFromRequester)
        ? requester.availableTimesFromRequester
        : [requester.availableTimesFromRequester]
      : [];

    formattedData = spark.selectedDateOnCalendar.map((timestamp) => {
      const date = new Date(timestamp.time);
      const formattedDate = format(date, "MMM do"); // Short month name and day
      const formattedTime = format(date, "h:mm a"); // 12-hour time with AM/PM

      // Check if the timestamp id is in availableTimes
      const isAvailable = availableTimes.includes(timestamp.id);

      // Mark dates only if they match the available times
      const dateString = date.toISOString().split("T")[0];
      markedDates[dateString] = {
        selected: isAvailable ? true : false,
        selectedColor: isAvailable ? selectedColor : undefined, // Apply selectedColor only if available
      };

      return {
        id: timestamp.id,
        date: formattedDate,
        time: formattedTime,
        isAvailable, // Optional: can be used to indicate availability in the data structure
      };
    });
  }

  return (
    <Container>
      <CalendarSubTitleContainer>
        <CalendarSubTitle>Dates</CalendarSubTitle>
        <CalendarLabel>
          <CalendarLabelSubTitle>
            {spark.chosenTime ? "Confirmed" : "Flexible"}
          </CalendarLabelSubTitle>
        </CalendarLabel>
      </CalendarSubTitleContainer>
      <CalendarTimeContainer>
        <CalendarComponent theme={customTheme} markedDates={markedDates} />

        {spark.chosenTime ? (
          <HangoutTimesComponentConfirmed
            dateObj={{
              id: spark.chosenTime,
              date: format(new Date(spark.chosenTime), "MMM do"),
              time: format(new Date(spark.chosenTime), "h:mm a"),
            }}
          />
        ) : (
          formattedData.map((res, index) => (
            <HangoutTimesComponent key={index} dateObj={res} spark={spark} />
          ))
        )}
      </CalendarTimeContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
`;

const CalendarSubTitleContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const CalendarSubTitle = styled(Text)`
  font-size: 14px;
  font-family: poppins-500;
`;

const CalendarLabel = styled(View)`
  color: #79d17c;
  right: 60px;
  position: absolute;
  background-color: #79d17c;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 20px;
`;

const CalendarLabelSubTitle = styled(Text)`
  font-size: 8px;
  font-family: poppins-700;
  color: white;
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
