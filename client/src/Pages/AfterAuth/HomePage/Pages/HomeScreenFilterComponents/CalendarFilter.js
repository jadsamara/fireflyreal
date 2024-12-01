import React, { useState, useContext } from "react";
import { View, Text, Vibration, ToastAndroid } from "react-native";
import styled from "styled-components";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";
import { Calendar } from "react-native-calendars";

import { HomePageContext } from "../../../../../Context/HomePageContext";

export const CalendarFilter = () => {
  const { filters, setFilters } = useContext(HomePageContext);
  const initialDateObj = filters.find((p) => p.date) || {};

  const initialStartDate = initialDateObj.date.startDate
    ? new Date(initialDateObj.date.startDate.seconds * 1000)
        .toISOString()
        .split("T")[0]
    : null;
  const initialFutureDate = initialDateObj.date.futureDate
    ? new Date(initialDateObj.date.futureDate.seconds * 1000)
        .toISOString()
        .split("T")[0]
    : null;

  const [startDate, setStartDate] = useState(initialStartDate);
  const [futureDate, setFutureDate] = useState(initialFutureDate);

  const customTheme = {
    textDayFontFamily: "poppins-500",
    textMonthFontFamily: "poppins-600",
    textDayHeaderFontFamily: "poppins-900",
    dayTextColor: "black",
    arrowColor: "black",
    backgroundColor: "#c6c6c6",
    calendarBackground: "#c6c6c6",
    selectedDayTextColor: "black",
    todayTextColor: "black",
    selectedDayBackgroundColor: "#93b486",
    textDisabledColor: "gray",
    textSectionTitleColor: "black",
  };

  const getDatesInRange = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dateArray = [];

    let currentDate = startDate;
    while (currentDate <= endDate) {
      dateArray.push(currentDate.toISOString().split("T")[0]);
      currentDate = new Date(currentDate.setDate(currentDate.getDate() + 1));
    }

    return dateArray;
  };

  const markedDates = {};
  if (startDate && futureDate) {
    const rangeDates = getDatesInRange(startDate, futureDate);

    rangeDates.forEach((date, index) => {
      if (index === 0) {
        markedDates[date] = {
          startingDay: true,
          color: "#79EA96",
          textColor: "white",
        };
      } else if (index === rangeDates.length - 1) {
        markedDates[date] = {
          endingDay: true,
          color: "#79EA96",
          textColor: "white",
        };
      } else {
        markedDates[date] = { color: "#79EA96", textColor: "white" };
      }
    });
  } else if (startDate) {
    markedDates[startDate] = {
      startingDay: true,
      color: "#79EA96",
      textColor: "white",
    };
  }

  const saveDates = (start, end) => {
    const convertToEST = (dateString) => {
      const utcDate = new Date(dateString);
      const offset = utcDate.getTimezoneOffset() + 300; // EST Offset
      return new Date(utcDate.getTime() + offset * 60 * 1000);
    };

    const startTimestamp = start
      ? {
          seconds: Math.floor(convertToEST(start).getTime() / 1000),
          nanoseconds: 0,
        }
      : null;

    const endTimestamp = end
      ? {
          seconds: Math.floor(convertToEST(end).getTime() / 1000),
          nanoseconds: 0,
        }
      : null;

    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.date
          ? {
              ...filter,
              isEnabled: true, // Update the outer isEnabled
              date: {
                ...filter.date,
                startDate: startTimestamp,
                futureDate: endTimestamp,
              },
            }
          : filter
      )
    );
  };

  const onDayLongPress = () => {
    Vibration.vibrate(0.1);
    ToastAndroid.show("Filter disabled", ToastAndroid.SHORT);
    setStartDate(null);
    setFutureDate(null);

    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.date
          ? {
              ...filter,
              isEnabled: false, // Update the outer isEnabled
              date: {
                ...filter.date,
                startDate: 0,
                futureDate: 0,
              },
            }
          : filter
      )
    );
  };

  return (
    <Container>
      <SubtitleText>When</SubtitleText>
      <SubtitleTextTwo>Choose a range</SubtitleTextTwo>
      <CalendarTimeContainer>
        <CalendarComponent
          enableSwipeMonths={true}
          theme={customTheme}
          markingType={"period"}
          markedDates={markedDates}
          onDayPress={(day) => {
            const selectedDate = day.dateString; // YYYY-MM-DD format from the calendar
            if (!startDate || (startDate && futureDate)) {
              setStartDate(selectedDate);
              setFutureDate(null);
            } else {
              setFutureDate(selectedDate);
              saveDates(startDate, selectedDate);
            }
          }}
          onDayLongPress={onDayLongPress}
        />
      </CalendarTimeContainer>
    </Container>
  );
};

const Container = styled(View)`
  margin-top: 40px;
  height: auto;
`;

const CalendarTimeContainer = styled(View)`
  width: 100%;
  border-radius: 15px;
  padding-bottom: 20px;
  margin-top: 20px;
  background-color: #c6c6c6;
  align-self: center;
`;

const SubtitleText = styled(Text)`
  font-size: 18px;
  font-family: poppins-500;
`;

const SubtitleTextTwo = styled(Text)`
  font-size: 12px;
  font-family: poppins-400;
  margin-left: 10px;
  margin-top: 10px;
`;

const CalendarComponent = styled(Calendar)`
  border-radius: 15px;
  background-color: #c6c6c6;
`;
