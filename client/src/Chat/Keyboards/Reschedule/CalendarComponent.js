import React from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import styled from "styled-components";
import { TimeDateCards } from "./TimeDateCards";

export const CalendarSectionComponent = ({
  selectedDateOnCalendar,
  setSelectedDateOnCalendar,
}) => {
  const currentDate = `${new Date()}`;

  const customTheme = {
    textDayFontFamily: "poppins-500",
    textMonthFontFamily: "poppins-600",
    textDayHeaderFontFamily: "poppins-900",
    dayTextColor: "black",
    arrowColor: "black",
    backgroundColor: "#c6c6c6",
    calendarBackground: "#c6c6c6",
    selectedDayTextColor: "black",
    // todayTextColor: "black",
    selectedDayBackgroundColor: "#93b486",
    textDisabledColor: "gray",
  };

  const handleDayPress = (day) => {
    const numberOfProperties = Object.keys(selectedDateOnCalendar).length;
    const updatedSelectedDates = { ...selectedDateOnCalendar };
    if (selectedDateOnCalendar[day.dateString]) {
      delete updatedSelectedDates[day.dateString];
    } else if (numberOfProperties < 1) {
      updatedSelectedDates[day.dateString] = { selected: true };
    }
    setSelectedDateOnCalendar(updatedSelectedDates);
  };

  const markedDates = {
    ...selectedDateOnCalendar,
  };

  const formatDateToString = (dateString) => {
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
      timeZone: "UTC", // Set the timezone explicitly to UTC
    };
    const formattedDate = new Date(dateString).toLocaleString("en-US", options);
    return formattedDate;
  };

  return (
    <CalendarTimeContainer>
      <CalendarComponent
        theme={customTheme}
        onDayPress={handleDayPress}
        markedDates={markedDates}
        minDate={currentDate}
      />

      {Object.keys(selectedDateOnCalendar).map((date, index) => {
        const formattedDate = formatDateToString(date);
        const dateObject = { hangoutNumber: index + 1, date: formattedDate };
        return (
          <>
            <TimeDateCards
              timeCard={dateObject}
              key={index}
              selectedDateOnCalendar={date}
              setSelectedDateOnCalendar={setSelectedDateOnCalendar}
            />
          </>
        );
      })}
    </CalendarTimeContainer>
  );
};

const CalendarTimeContainer = styled(View)`
  height: auto;
  width: 90%;
  border-radius: 15px;
  padding-bottom: 20px;
  margin-top: 50px;
  background-color: #c6c6c6;
  align-self: center;
`;

const CalendarComponent = styled(Calendar)`
  border-radius: 15px;
  background-color: #c6c6c6;
`;
