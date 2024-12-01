import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components";

import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";

import { addHours, isBefore, format } from "date-fns";

export const TimeDateCards = ({
  timeCard = {},
  selectedDateOnCalendar,
  setSelectedDateOnCalendar,
}) => {
  const [timeText, setTimeText] = useState("SELECT TIME");
  const [open, setOpen] = useState(false);

  const [dateNew, setDate] = useState(() => {
    const today = new Date();
    return today;
  });

  const {
    hangoutNumber = 1,
    date = "Sunday, July 8th",
    timeZone = "EST",
  } = timeCard;

  const onChange = (selectedTime) => {
    setOpen(false);

    const convertedTime = convertTo12HourFormat(selectedTime);

    const chosenHours = selectedTime.getHours();
    const chosenMinutes = selectedTime.getMinutes();

    const timestampInMilliseconds =
      chosenHours * 60 * 60 * 1000 + chosenMinutes * 60 * 1000;

    // Parse the selectedDateOnCalendar string into a Date object
    const selectedDateObj = new Date(selectedDateOnCalendar);
    const selectedDateInMilliseconds = selectedDateObj.getTime();

    const realTime =
      timestampInMilliseconds + selectedDateInMilliseconds + 14400000 + 3600000;
    const sixHoursInMilliseconds = 6 * 60 * 60 * 1000 + Date.now();

    if (realTime < sixHoursInMilliseconds) {
      alert("Selected time must be at least 6 hours from now.");
      return;
    } else {
      setTimeText(convertedTime);
      setDate(selectedTime);
      setSelectedDateOnCalendar((prevSelectedDate) => ({
        ...prevSelectedDate,
        [selectedDateOnCalendar]: {
          ...prevSelectedDate[selectedDateOnCalendar],
          id: hangoutNumber,
          time: realTime,
        },
      }));
    }
  };

  const convertTo12HourFormat = (dateString) => {
    const options = { hour: "numeric", minute: "2-digit", hour12: true };
    const formattedDate = new Date(dateString).toLocaleTimeString(
      "en-US",
      options
    );
    return formattedDate;
  };

  const showTimePicker = () => {
    setOpen(true);
  };

  return (
    <TimePickerContainer onPress={showTimePicker}>
      <FirstRow>
        <HangoutContainer>
          <HangoutText>Spark {hangoutNumber}</HangoutText>
        </HangoutContainer>
        <TimezoneContainer>
          <TimezoneText>Time Zone {timeZone}</TimezoneText>
        </TimezoneContainer>
      </FirstRow>
      <SecondRow>
        <DateContainer>
          <CalendarIconView name="calendar" size={24} color="green" />
          <DateText>
            {date}, {timeText}
          </DateText>
        </DateContainer>
      </SecondRow>

      <DatePicker
        modal
        open={open}
        mode="time" // This sets the picker to time-only mode
        date={dateNew}
        onConfirm={onChange}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </TimePickerContainer>
  );
};

const DoneButton = styled(TouchableOpacity)`
  background-color: #0a7839;
  padding: 8px;
  align-items: center;
`;

const DoneButtonText = styled(Text)`
  color: white;
  font-family: poppins-600;
`;

const TimePickerContainer = styled(TouchableOpacity)`
  width: 92%;
  height: 90px;
  background-color: #e1e1e1;
  align-self: center;
  border-radius: 15px;
  margin-top: 20px;
  padding: 10px;
`;

const FirstRow = styled(View)`
  width: 100%;
  height: 50%;
  flex-direction: row;
  justify-content: space-between;
`;

const SecondRow = styled(View)`
  width: 100%;
  height: 45%;
  flex-direction: row;
  align-items: flex-end;
`;

const HangoutContainer = styled(View)`
  height: 70%;
  width: 30%;
  background-color: #4f6d48;
  border-radius: 10000px;
  align-items: center;
  justify-content: center;
`;

const HangoutText = styled(Text)`
  color: white;
  font-family: poppins-800;
  font-size: 13px;
`;

const TimezoneContainer = styled(View)`
  height: 50%;
  width: 25%;
  background-color: #495480;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

const TimezoneText = styled(Text)`
  color: white;
  font-family: poppins-800;
  font-size: 6px;
`;

const DateContainer = styled(View)`
  flex-direction: row;
  align-items: flex-end;
  width: 100%;
  justify-content: center;
`;

const CalendarIconView = styled(AntDesign)`
  position: absolute;
  bottom: 0px;
  left: 30px;
`;

const DateText = styled(Text)`
  color: #0a7839;
  font-family: poppins-600;
  font-size: 10px;
  margin-left: 20px;
`;
