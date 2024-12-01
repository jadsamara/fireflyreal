import { View, Text, Image } from "react-native";
import React from "react";

import styled from "styled-components/native";

import { AntDesign } from "@expo/vector-icons";

export const Header = ({ navigation, spark }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  let formattedDate = "";
  let minimumDate = "";

  if (spark.chosenTime) {
    formattedDate = formatDate(spark.chosenTime);

    // Calculate days difference from current time to spark.chosenTime
    const currentTime = Date.now();
    const timeDifference = spark.chosenTime - currentTime;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

    minimumDate = `${daysDifference} day${daysDifference !== 1 ? "s" : ""}`;
  }

  return (
    <SparkImageContainer>
      <SparkImage source={{ uri: spark.sparkImage }} />
      <SparkScheduledDate>
        <SparkScheduledText>{formattedDate}</SparkScheduledText>
      </SparkScheduledDate>
      <SparkScheduledDateDays>
        <AntDesign name="clockcircle" size={10} color="white" />
        <SparkScheduledTextDays>{minimumDate}</SparkScheduledTextDays>
      </SparkScheduledDateDays>
      <SparkTitle>{spark.sparkTitle}</SparkTitle>
    </SparkImageContainer>
  );
};

const SparkImageContainer = styled(View)`
  width: 90%;
  height: 140px;
  position: relative;
  align-self: center;
  margin-top: 20px;
`;

const SparkImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const SparkScheduledDate = styled(View)`
  background-color: #79d17c;
  position: absolute;
  z-index: 999;
  top: 15px;
  left: 15px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 10px;
`;

const SparkScheduledText = styled(Text)`
  color: white;
  font-size: 9px;
  font-family: poppins-800;
`;

const SparkScheduledDateDays = styled(View)`
  background-color: #527e65;
  position: absolute;
  z-index: 999;
  top: 15px;
  right: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
`;

const SparkScheduledTextDays = styled(Text)`
  color: white;
  font-size: 9px;
  margin-left: 5px;
  font-family: poppins-800;
`;

const SparkTitle = styled(Text)`
  color: white;
  font-size: 24px;
  font-family: poppins-800;
  position: absolute;
  z-index: 999;
  bottom: 10px;
  left: 15px;
`;
