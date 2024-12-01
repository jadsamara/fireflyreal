import React, { useContext } from "react";
import { View, Text, ImageBackground, ScrollView, Image } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

import { BackgroundGradient } from "../../../../../Components/GlobalComponents/BackgroundGradient";
import { format } from "date-fns";

import { AuthContext } from "../../../../../Config/AuthContext";
import { getDistance } from "../../../../../Functions/GetDistance";

export const HeaderComponent = ({ spark }) => {
  const { location } = useContext(AuthContext);

  const formatSelectedDates = (selectedDateOnCalendar) => {
    return Object.values(selectedDateOnCalendar).map((item) => ({
      id: item.id,
      time: item.time,
    }));
  };

  const formatDate = (timestamp) => {
    return format(new Date(timestamp), "EEE, MMM d, yyyy");
  };

  const formattedDates = formatSelectedDates(spark.allAvailableTimes);
  const formattedDate =
    formattedDates.length > 0
      ? formatDate(formattedDates[0].time)
      : "No available dates";

  return (
    <SparkHeaderContainer>
      <SparkImageContainer>
        <SparkImage
          source={{
            uri: spark.sparkImage,
          }}
        >
          <BackgroundGradient>
            <SparkHeaderInformationContainer>
              <SparkTitle>{spark.sparkTitle}</SparkTitle>
              <TotalNumberOfPeopleContainer>
                <Ionicons name="person-sharp" size={16} color="white" />

                <TotalNumberofPeopleText>
                  {spark.totalNumberOfCurrentParticipants}/
                  {spark.totalNumberOfParticipants}
                </TotalNumberofPeopleText>
              </TotalNumberOfPeopleContainer>
              <TagContainer>
                {spark.tags.map((res) => {
                  return (
                    <Tag>
                      <TagText>{res.text}</TagText>
                    </Tag>
                  );
                })}
              </TagContainer>

              <DistanceContainer>
                <DistanceText>
                  {spark.locationName} ({getDistance(location, spark)} km)
                </DistanceText>
              </DistanceContainer>
            </SparkHeaderInformationContainer>
          </BackgroundGradient>
        </SparkImage>
      </SparkImageContainer>

      <DynamicBar>
        <DynamicBarText>Spark being created</DynamicBarText>
        <ProfilePictureHost
          source={{
            uri: spark.hostProfilePicture,
          }}
        />
        {formattedDates.length > 1 ? (
          <DynamicBarText>To Be Determined</DynamicBarText>
        ) : (
          <DynamicBarText>For {formattedDate}</DynamicBarText>
        )}
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
  border-radius: 100px;
`;

const SparkImage = styled(ImageBackground)`
  width: 100%;
  height: 100%;
`;

const SparkTitle = styled(Text)`
  position: absolute;
  font-size: 24px;
  font-family: poppins-900;
  color: white;
  z-index: 999;
  bottom: 35px;
  left: 20px;
`;

const TotalNumberofPeopleText = styled(Text)`
  font-size: 14px;
  font-family: poppins-600;
  color: white;
  margin-left: 10px;
`;

const TotalNumberOfPeopleContainer = styled(View)`
  position: absolute;
  z-index: 999;
  bottom: 40px;
  right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const TagContainer = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
})`
  width: 130px;
  position: absolute;
  z-index: 999;
  bottom: 10px;
  left: 5px;
`;

const Tag = styled(View)`
  background-color: #527e65;
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
  font-size: 10px;
  font-family: poppins-600;
  color: white;
`;

const DistanceContainer = styled(View)`
  position: absolute;
  z-index: 999;
  bottom: 12px;
  right: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const DistanceText = styled(Text)`
  font-size: 8px;
  font-family: poppins-500;
  color: white;
`;

const DynamicBar = styled(View)`
  flex-direction: row;
  width: 100%;
  height: 30px;
  background-color: #79d17c;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
`;

const DynamicBarText = styled(Text)`
  font-size: 8px;
  font-family: poppins-600;
  color: white;
`;

const ProfilePictureHost = styled(Image)`
  height: 85px;
  width: 85px;
  border-radius: 1000px;
  z-index: 9999999;
  align-self: center;
`;

const SparkHeaderInformationContainer = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: 5px;
`;
