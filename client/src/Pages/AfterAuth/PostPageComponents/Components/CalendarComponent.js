import React, { useContext } from "react";
import { View, Text } from "react-native";
import { Calendar } from "react-native-calendars";
import styled from "styled-components";
import { TimeDateCards } from "./TimeDateCards";

import { PostDateContext } from "../../../../Context/PostPagesContext";

export const CalendarSectionComponent = () => {
  const { selectedDateOnCalendar, setSelectedDateOnCalendar } =
    useContext(PostDateContext);
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
    } else if (numberOfProperties < 3) {
      updatedSelectedDates[day.dateString] = { selected: true };
    }
    setSelectedDateOnCalendar(updatedSelectedDates);
  };

  const markedDates = {
    ...selectedDateOnCalendar,
  };

  const formatDateToString = (dateString) => {
    // Parse the dateString and add 1 day
    const adjustedDate = new Date(dateString);
    adjustedDate.setDate(adjustedDate.getDate() + 1); // Add 1 day

    // Format the adjusted date
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      adjustedDate
    );

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

      {Object.keys(selectedDateOnCalendar).length < 3 ? (
        <CalendarInformationContainer>
          <CalendarInformationText>
            Choose up to three dates
          </CalendarInformationText>
        </CalendarInformationContainer>
      ) : null}
    </CalendarTimeContainer>
  );
};

const CalendarTimeContainer = styled(View)`
  height: auto;
  width: 100%;
  border-radius: 15px;
  padding-bottom: 20px;
  margin-top: 50px;
  margin-bottom: 120px;
  background-color: #c6c6c6;
`;

const CalendarComponent = styled(Calendar)`
  border-radius: 15px;
  background-color: #c6c6c6;
`;

const CalendarInformationContainer = styled(View)`
  width: 60%;
  height: 45px;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
  background-color: #e8e8e8;
  align-self: center;
  border-radius: 30px;
  shadow-color: #171717;
  shadow-offset: 2px 3px;
  shadow-opacity: 0.1875;
  shadow-radius: 2.7px;
`;

const CalendarInformationText = styled(Text)`
  color: #8e8e8e;
  font-family: poppins-500;
  font-size: 12px;
`;
