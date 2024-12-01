import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, Platform } from "react-native";
import styled from "styled-components";

import { AntDesign } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

export const TimeDateCards = ({
  timeCard = {},
  selectedDateOnCalendar,
  setSelectedDateOnCalendar,
}) => {
  const [show, setShow] = useState(false);
  const [timeText, setTimeText] = useState("SELECT TIME");
  const [lastTimeInMS, setLastTimeInMS] = useState(new Date());

  const {
    hangoutNumber = 1,
    date = "Sunday, July 8th",
    timeZone = "EST",
  } = timeCard;

  const onChange = (event, selectedTime) => {
    // Extract hours and minutes from the selected time

    const convertedTime = convertTo12HourFormat(selectedTime);
    setTimeText(convertedTime);

    const timeInMS = new Date(selectedTime);
    setLastTimeInMS(timeInMS);

    const chosenHours = selectedTime.getHours();
    const chosenMinutes = selectedTime.getMinutes();

    // Calculate the time in milliseconds since midnight
    const timestampInMilliseconds =
      chosenHours * 60 * 60 * 1000 + chosenMinutes * 60 * 1000;

    // Parse the selectedDateOnCalendar string into a Date object
    const selectedDateObj = new Date(selectedDateOnCalendar);
    const selectedDateInMilliseconds = selectedDateObj.getTime(); // Get timestamp in milliseconds

    // Update the selectedDateOnCalendar state
    setSelectedDateOnCalendar((prevSelectedDate) => ({
      ...prevSelectedDate,
      [selectedDateOnCalendar]: {
        ...prevSelectedDate[selectedDateOnCalendar],
        id: hangoutNumber,
        time: timestampInMilliseconds + selectedDateInMilliseconds + 18000000,
      },
    }));
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
    setShow(true);
  };

  return (
    <TimePickerContainer onPress={showTimePicker}>
      <FirstRow>
        <HangoutContainer>
          <HangoutText>Spark</HangoutText>
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

      {Platform.OS === "ios" ? (
        <Modal
          visible={show}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setShow(false)}
        >
          <View style={{ flex: 1, justifyContent: "flex-end", width: "100%" }}>
            <DoneButton onPress={() => setShow(false)}>
              <DoneButtonText>Done</DoneButtonText>
            </DoneButton>

            <DateTimePicker
              value={lastTimeInMS}
              mode="time"
              display="spinner"
              onChange={onChange}
              themeVariant="light"
              style={{ backgroundColor: "white" }}
            />
          </View>
        </Modal>
      ) : (
        <DateTimePicker
          value={lastTimeInMS}
          mode="time"
          display="spinner"
          onChange={onChange}
          themeVariant="light"
          style={{ backgroundColor: "white" }}
        />
      )}
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
  font-size: 10px;
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
  font-size: 12px;
  margin-left: 60px;
`;
