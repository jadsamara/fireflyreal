import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";

import styled from "styled-components";
import { SafeArea } from "../../../../../Components/GlobalComponents/SafeArea";
import { CalendarSectionComponent } from "./CalendarSectionComponent";

import { RequesterCard } from "./RequesterCard";
import { format } from "date-fns";

export const ViewSparkRequestsPage = ({ navigation, route }) => {
  const { spark } = route.params;
  const [currentID, setCurrentID] = useState(
    spark.selectedDateOnCalendar[0].id
  );

  const [listOfRequesters, setListOfRequesters] = useState([]);
  const [currentDate, setCurrentDate] = useState("July 10th");
  const [currentTimeInMS, setCurrentTimeInMS] = useState(0);

  useEffect(() => {
    // Reset list of requesters
    setListOfRequesters([]);

    // Check if a chosen time exists
    if (!spark.chosenTime) {
      // Loop through selected dates to find the current ID
      const currentDateObj = spark.selectedDateOnCalendar.find(
        (date) => date.id === currentID
      );

      if (currentDateObj) {
        const time = currentDateObj.time;
        // Convert time from ms to the desired format
        const date = new Date(time);
        const formattedDate = format(date, "MMM do");
        setCurrentDate(formattedDate);
        setCurrentTimeInMS(time);
      }

      // Filter requesters based on the available times for the current ID
      const filteredRequesters = spark.allRequesters.filter((requester) =>
        Array.isArray(requester.availableTimesFromRequester)
          ? requester.availableTimesFromRequester.includes(currentID)
          : requester.availableTimesFromRequester === currentID
          ? [0, 1].includes(currentID) // If availableTimesFromRequester is 0, treat it as [0, 1]
          : false
      );

      setListOfRequesters(filteredRequesters);
    } else {
      // If a chosen time exists, reset the requesters
      const time = spark.chosenTime;
      const date = new Date(time);
      const formattedDate = format(date, "MMM do");
      setCurrentDate(formattedDate);
      setCurrentTimeInMS(time);
      setListOfRequesters(spark.allRequesters);
    }
  }, [currentID]);

  let formattedDateTag = "";

  if (spark.chosenTime) {
    formattedDateTag = "Confirmed";
  } else {
    formattedDateTag = "Flexible";
  }

  return (
    <SafeArea>
      <Container>
        <Title>View Requests</Title>
        <CalendarSectionComponent
          spark={spark}
          currentID={currentID}
          setCurrentID={setCurrentID}
          listOfRequesters={listOfRequesters}
        />
        <SubTitle>Requests for {currentDate} </SubTitle>
        <Tag>
          <TagText>{formattedDateTag}</TagText>
        </Tag>
        <RequestCardContainer>
          {listOfRequesters
            .filter((res) => {
              // Handle availableTimesFromRequester: if it's 0, convert it to [0, 1]; otherwise, ensure it's an array
              const availableTimes = Array.isArray(
                res.availableTimesFromRequester
              )
                ? res.availableTimesFromRequester
                : res.availableTimesFromRequester === 0
                ? [0, 1]
                : [res.availableTimesFromRequester];

              return availableTimes.includes(currentID);
            })
            .map((res) => (
              <RequesterCard
                key={res.user} // Unique key, e.g., res.user
                spark={spark}
                requestedUser={res}
                navigation={navigation}
                currentTimeInMS={currentTimeInMS}
                currentID={currentID}
              />
            ))}
        </RequestCardContainer>
      </Container>
    </SafeArea>
  );
};

const Container = styled(ScrollView)`
  width: 100%;
  height: 100%;
`;

const Title = styled(Text)`
  font-size: 30px;
  font-family: poppins-600;
  text-align: center;
  margin-top: 20px;
`;

const SubTitle = styled(Text)`
  font-size: 20px;
  font-family: poppins-500;
  margin-top: 20px;
  text-align: center;
  color: #4e4e4e;
`;

const RequestCardContainer = styled(View)`
  margin-bottom: 20px;
  width: 95%;
  align-self: center;
  border-width: 1px;
  border-color: gray;
  border-radius: 20px;
  margin-top: 30px;
`;

const Tag = styled(View)`
  background-color: #79d17c;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 90px;
  border-radius: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-top: 10px;
`;

const TagText = styled(Text)`
  font-size: 10px;
  font-family: poppins-600;
  color: white;
`;
