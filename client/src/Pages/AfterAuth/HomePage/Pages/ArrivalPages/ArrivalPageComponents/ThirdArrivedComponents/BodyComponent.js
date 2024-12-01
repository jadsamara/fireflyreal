import { View, Text, TextInput, ScrollView } from "react-native";
import React from "react";

import styled from "styled-components";
import { format, differenceInMinutes } from "date-fns";

import {
  getBackgroundColor,
  getType,
} from "../../../../../../../Functions/ArrivalTimeFunctions";

export const BodyComponent = ({ spark, arrivalData }) => {
  const getFormattedTime = () => {
    const startTime = format(new Date(spark.chosenTime), "h:mm a");
    const endTime = format(new Date(arrivalData.timeInMs), "h:mm a");

    return `${startTime} - ${endTime}`; // e.g., "4:05 pm - 6:45 pm"
  };

  const getFormattedTimeHours = () => {
    const totalMinutes = differenceInMinutes(
      new Date(arrivalData.timeInMs),
      new Date(spark.chosenTime)
    );
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    // Check if the duration is more than an hour
    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")} hours`;
    } else {
      // If the duration is less than an hour, show it in minutes
      return `${minutes} minutes`;
    }
  };

  return (
    <Container>
      <TagContainer>
        {spark.tags.map((res) => {
          return (
            <Tag backgroundColor={"#527e65"}>
              <TagText size={"10px"}>{res.text}</TagText>
            </Tag>
          );
        })}
        <Tag backgroundColor={getBackgroundColor(arrivalData.timeState)}>
          <TagText size={"10px"}>{getType(arrivalData.timeState)}</TagText>
        </Tag>
      </TagContainer>
      <DurationContainer>
        <TitleText>Duration</TitleText>
        <Row>
          <SubtitleText>{getFormattedTime()}</SubtitleText>
          <Tag backgroundColor={getBackgroundColor(arrivalData.timeState)}>
            <TagText size={"7px"}>{getFormattedTimeHours()}</TagText>
          </Tag>
        </Row>
      </DurationContainer>
      <AddressContainer>
        <TitleText>Location</TitleText>
        <Row>
          <SubtitleText>{spark.fullAddress}</SubtitleText>
        </Row>
      </AddressContainer>
      <DescriptionContainer>
        <DescriptionSubTitle>Description</DescriptionSubTitle>
        <DescriptionInput
          value={spark.sparkDescription}
          editable={false} // Disable TextInput
          selectTextOnFocus={false} // Prevent text selection
          multiline={true}
        />
      </DescriptionContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  padding-left: 10px;
`;

const TagContainer = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {},
})`
  width: 100%;
`;

const Tag = styled(View)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
  padding-top: 3px;
  padding-bottom: 3px;
  padding-right: 10px;
  padding-left: 10px;
  margin-left: 5px;
  border-radius: 15px;
`;

const TagText = styled(Text)`
  font-size: ${({ size }) => size};
  font-family: poppins-600;
  color: white;
`;

const DurationContainer = styled(View)`
  width: 100%;
  margin-top: 30px;
  margin-left: 5px;
`;

const AddressContainer = styled(View)`
  width: 100%;
  margin-top: 30px;
  margin-left: 5px;
`;

const TitleText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
  margin-left: 25px;
`;

const SubtitleText = styled(Text)`
  font-size: 12px;
  font-family: poppins-400;
  margin-right: 20px;
`;

const DescriptionContainer = styled(View)`
  width: 100%;
  margin-top: 30px;
`;

const DescriptionSubTitle = styled(Text)`
  font-size: 16px;
  font-family: poppins-500;
  text-align: center;
`;

const DescriptionInput = styled(TextInput)`
  width: 95%;
  padding: 15px;
  text-align: center;
  border-radius: 10px;
  border-color: gray;
  border-width: 0.2px;
  margin-top: 10px;
  align-self: center;
`;
