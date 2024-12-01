import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";

export const HeaderComponent = ({ spark, navigation }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      weekday: "long",
      month: "short",
      day: "numeric",
    };
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  let formattedDate = "";

  if (spark.chosenTime) {
    formattedDate = `On ${formatDate(spark.chosenTime)}`;
  }

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SparkHeaderContainer>
      <SparkImageContainer>
        <SparkImage
          source={{
            uri: spark.sparkImage,
          }}
        />

        <ExitButton onPress={goBack}>
          <ExitButtonText>x</ExitButtonText>
        </ExitButton>
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
            {spark.locationName} {spark.distance}
          </DistanceText>
        </DistanceContainer>
      </SparkImageContainer>

      <DynamicBar>
        <DynamicBarText>This spark has expired</DynamicBarText>
        <ProfilePictureHost
          source={{
            uri: spark.userInfo.profilePicture,
          }}
        />
        <DynamicBarText>{formattedDate}</DynamicBarText>
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
  top: 15px;
  background-color: #686868;
  z-index: 999;
  border-radius: 100px;
`;

const ExitButtonText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: white;
`;

const SparkTitle = styled(Text)`
  position: absolute;
  font-size: 24px;
  font-family: poppins-500;
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
  font-size: 10px;
  font-family: poppins-500;
  color: white;
`;

const DynamicBar = styled(View)`
  flex-direction: row;
  width: 100%;
  height: 30px;
  background-color: #b1b1b1;
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
  position: absolute;
  left: 45%;
`;
