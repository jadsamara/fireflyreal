import { View, Text, TextInput } from "react-native";
import React from "react";

import styled from "styled-components";
import { AntDesign, Entypo, FontAwesome5 } from "@expo/vector-icons";

import { calculateAge } from "../../../../../Functions/GetAgeNew";

export const BodyComponent = ({ spark }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
      timeZone: "America/New_York",
    };
    let formattedTime = new Intl.DateTimeFormat("en-US", options).format(date);

    // Convert AM/PM to lowercase
    formattedTime = formattedTime.replace("AM", "am").replace("PM", "pm");

    return formattedTime;
  };

  let formattedDate = "";
  let formattedTime = "";

  if (spark.chosenTime) {
    formattedDate = formatDate(spark.chosenTime);
    formattedTime = formatTime(spark.chosenTime);
  } else {
    formattedDate = "To be determined";
    formattedTime = "TBD";
  }

  return (
    <Container>
      <HostInfoText>
        {spark.userInfo.name}, {calculateAge(spark.userInfo.age)}
      </HostInfoText>
      <RatingsContainer>
        <AntDesign name="star" size={20} color="#93E4B6" />
        <RatingsText>
          {parseFloat(spark.userInfo.averageUserRating).toFixed(1)}
        </RatingsText>
        <TotalSparksText>
          {spark.userInfo.pastSparks.length} sparks
        </TotalSparksText>
      </RatingsContainer>

      <AddressContainer>
        <Row>
          <DateContainer>
            <AntDesign name="calendar" size={16} color="#93E4B6" />
            {!spark.chosenTime ? (
              <DateAddressText>To Be Determined</DateAddressText>
            ) : (
              <DateAddressText>{formattedDate}</DateAddressText>
            )}
          </DateContainer>
          <Separator />
          <DateContainer>
            <AntDesign name="clockcircle" size={16} color="#93E4B6" />
            {!spark.chosenTime ? (
              <DateAddressText>TBD (time)</DateAddressText>
            ) : (
              <DateAddressText>{formattedTime} EST</DateAddressText>
            )}
          </DateContainer>
          <Separator />
          <DateContainer>
            <FontAwesome5 name="walking" size={16} color="#93E4B6" />
            <KmText>{parseFloat(spark.distance).toFixed(1)} km</KmText>
          </DateContainer>
        </Row>
        <HorizontalSeparator />
        <AddressTextContainer>
          <Entypo name="location-pin" size={20} color="#93E4B6" />

          <AddressText numberOfLines={1} ellipsizeMode="tail">
            {spark.fullAddress}
          </AddressText>
        </AddressTextContainer>
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
  margin-top: 5px;
  padding: 15px;
`;

const HostInfoText = styled(Text)`
  font-size: 16px;
  font-family: poppins-400;
  text-align: center;
`;

const RatingsContainer = styled(View)`
  align-self: center;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
`;

const RatingsText = styled(Text)`
  font-size: 14px;
  font-family: poppins-400;
  margin-left: 2px;
`;

const TotalSparksText = styled(Text)`
  font-size: 12px;
  font-family: poppins-400;
  margin-left: 5px;
  color: #79d17c;
`;

const AddressContainer = styled(View)`
  width: 100%;
  margin-top: 30px;
  border-width: 1px;
  border-color: #a3a3a3;
  align-items: center;
  padding: 10px;
  border-radius: 10px;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
`;

const DateContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const DateAddressText = styled(Text)`
  font-size: 9px;
  font-family: poppins-500;
  margin-left: 5px;
`;

const KmText = styled(Text)`
  font-size: 9px;
  font-family: poppins-500;
  margin-left: 5px;
`;

const Separator = styled(View)`
  height: 20px;
  width: 1px;
  background-color: #a3a3a3;
  margin-right: 10px;
  margin-left: 10px;
`;

const HorizontalSeparator = styled(View)`
  height: 1px;
  width: 80%;
  background-color: #a3a3a3;
  margin-top: 10px;
  align-self: center;
`;

const AddressTextContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  margin-bottom: 5px;
`;

const AddressText = styled(Text)`
  font-size: 8px;
  font-family: poppins-500;
  margin-left: 5px;
  width: 90%;
`;

const DescriptionContainer = styled(View)`
  width: 100%;
  margin-top: 30px;
`;

const DescriptionSubTitle = styled(Text)`
  font-size: 14px;
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
  font-size: 12px;
`;
