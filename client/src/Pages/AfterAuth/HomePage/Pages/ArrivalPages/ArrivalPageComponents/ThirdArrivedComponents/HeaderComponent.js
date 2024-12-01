import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styled from "styled-components";

export const HeaderComponent = ({ spark }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  let formattedDate = `${formatDate(spark.chosenTime)}`;

  return (
    <SparkHeaderContainer>
      <SparkImageContainer>
        <SparkImage
          source={{
            uri: spark.sparkImage,
          }}
        />
        <ExitButton>
          <ExitButtonText>x</ExitButtonText>
        </ExitButton>
        <SparkTitle>{spark.sparkTitle}</SparkTitle>
      </SparkImageContainer>

      <DynamicBar>
        <DynamicBarText>
          This hangout happened on {formattedDate}
        </DynamicBarText>
      </DynamicBar>
    </SparkHeaderContainer>
  );
};

const SparkHeaderContainer = styled(View)`
  width: 100%;
  height: 300px;
`;

const SparkImageContainer = styled(View)`
  width: 100%;
  height: 250px;
  position: relative;
`;

const SparkImage = styled(Image)`
  width: 100%;
  height: 100%;
`;

const ExitButton = styled(TouchableOpacity)`
  height: 35px;
  width: 35px;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 15px;
  top: 55px;
  background-color: #686868;
  z-index: 999;
  border-radius: 100px;
`;

const ExitButtonText = styled(Text)`
  font-size: 18px;
  font-family: poppins-600;
  color: white;
`;

const SparkTitle = styled(Text)`
  position: absolute;
  font-size: 28px;
  font-family: poppins-500;
  color: white;
  z-index: 999;
  bottom: 5px;
  left: 20px;
`;

const DynamicBar = styled(View)`
  flex-direction: row;
  width: 100%;
  height: 30px;
  background-color: #79d17c;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
`;

const DynamicBarText = styled(Text)`
  font-size: 10px;
  font-family: poppins-600;
  color: white;
`;
