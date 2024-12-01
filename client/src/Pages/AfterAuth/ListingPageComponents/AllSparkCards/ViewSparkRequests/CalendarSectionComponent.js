import React, { useState } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import styled from "styled-components";
import { HangoutTimesComponent } from "./HangoutTimesComponent";
import { format } from "date-fns";

export const CalendarSectionComponent = ({
  spark,
  currentID,
  setCurrentID,
  listOfRequesters,
}) => {
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
  const markedDates = {};

  // Count users per ID
  const userCountPerID = spark.selectedDateOnCalendar.reduce(
    (acc, timestamp) => {
      const count = listOfRequesters.filter((res) => {
        console.log(res.availableTimesFromRequester);

        const availableTimes = Array.isArray(res.availableTimesFromRequester)
          ? res.availableTimesFromRequester
          : res.availableTimesFromRequester === 0
          ? [0, 1]
          : [res.availableTimesFromRequester];

        return availableTimes.includes(timestamp.id);
      }).length;

      // Store count by ID
      acc[timestamp.id] = count;
      return acc;
    },
    {}
  );

  // Format markedDates with user count
  spark.selectedDateOnCalendar.forEach((timestamp) => {
    const date = new Date(timestamp.time);
    const dateString = date.toISOString().split("T")[0];
    markedDates[dateString] = {
      selected: true,
      selectedColor,
      userCount: userCountPerID[timestamp.id], // Include user count per ID
    };
  });

  const formattedData = spark.selectedDateOnCalendar.map((timestamp) => {
    const date = new Date(timestamp.time);
    const formattedDate = format(date, "MMM do"); // Short month name and day
    const formattedTime = format(date, "h:mm a");

    return {
      id: timestamp.id,
      date: formattedDate,
      time: formattedTime,
      userCount: userCountPerID[timestamp.id], // Include user count per ID
    };
  });

  return (
    <Container>
      <CalendarTimeContainer>
        <CalendarComponent theme={customTheme} markedDates={markedDates} />

        {formattedData.map((res) => {
          return (
            <HangoutTimesComponent
              dateObj={res}
              currentID={currentID}
              setCurrentID={setCurrentID}
            />
          );
        })}
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
