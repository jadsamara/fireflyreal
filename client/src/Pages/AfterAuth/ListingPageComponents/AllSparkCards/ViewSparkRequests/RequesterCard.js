import React, { useState, useEffect } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { getUserInfo } from "../../../../../Functions/GetUserInfo";
import { calculateAge } from "../../../../../Functions/GetAgeNew";

import { AntDesign } from "@expo/vector-icons";

export const RequesterCard = ({
  spark,
  requestedUser,
  navigation,
  currentTimeInMS,
  currentID,
}) => {
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const temp = requestedUser.user;
        const user = await getUserInfo(temp);
        setUserInfo(user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, []);

  if (!userInfo) {
    return null;
  }

  const convertSeconds = (seconds) => {
    seconds = seconds - Math.floor(Date.now() / 1000);
    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    if (days > 0) {
      return `${days} days`;
    } else if (hours > 0) {
      return `${hours} hours`;
    } else if (minutes > 0) {
      return `${minutes} mins`;
    } else {
      return `${remainingSeconds} sec`;
    }
  };

  const onHandleViewRequestInfo = () => {
    navigation.navigate("ViewRequestInfo", {
      requestedUser,
      userInfo,
      currentTimeInMS,
      currentID,
      spark,
    });
  };

  return (
    <Container>
      <CardContainer>
        <GroupProfilePictureFirstCol>
          <ProfilePicture source={{ uri: userInfo.profilePicture }} />
          <Col>
            <RequesterName>
              {userInfo.name}, {calculateAge(userInfo.age)}
            </RequesterName>
            <Row>
              <AntDesign name="star" size={16} color="#93E4B6" />
              <RequesterRatingText>
                {parseFloat(userInfo.averageUserRating).toFixed(1)}
              </RequesterRatingText>
              <RequesterTotalSparksText>
                {userInfo.pastSparks.length} sparks
              </RequesterTotalSparksText>
            </Row>
          </Col>
        </GroupProfilePictureFirstCol>
        <ColTwo>
          <TimeLeftTag>
            <AntDesign name="clockcircle" size={12} color="white" />
            <TimeLeftText>
              {convertSeconds(requestedUser.requestDuration.seconds)} left
            </TimeLeftText>
          </TimeLeftTag>
          <ViewRequesterInfoButton onPress={onHandleViewRequestInfo}>
            <ViewRequesterInfoText>View Request</ViewRequesterInfoText>
          </ViewRequesterInfoButton>
        </ColTwo>
      </CardContainer>
      <LineBreak />
    </Container>
  );
};

const Container = styled(View)``;

const CardContainer = styled(View)`
  width: 90%;
  flex-direction: row;
  margin-top: 20px;
  align-self: center;
  justify-content: space-between;
`;

const GroupProfilePictureFirstCol = styled(View)`
  flex-direction: row;
`;

const ProfilePicture = styled(Image)`
  width: 80px;
  height: 80px;
  border-radius: 100px;
  margin-right: 20px;
`;

const Col = styled(View)`
  justify-content: center;
`;

const ColTwo = styled(View)`
  justify-content: center;
  align-items: flex-end;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const RequesterName = styled(Text)`
  font-size: 14px;
  font-family: poppins-600;
  color: #527e65;
  margin-bottom: 5px;
`;

const RequesterRatingText = styled(Text)`
  font-size: 10px;
  font-family: poppins-500;
  margin-left: 2px;
`;

const RequesterTotalSparksText = styled(Text)`
  font-size: 10px;
  font-family: poppins-600;
  margin-left: 10px;
  color: #79d17c;
`;

const TimeLeftTag = styled(View)`
  background-color: #79d17c;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 90px;
`;

const TimeLeftText = styled(Text)`
  margin-left: 5px;
  font-size: 8px;
  font-family: poppins-500;
  color: white;
`;

const ViewRequesterInfoButton = styled(TouchableOpacity)`
  background-color: #415f74;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
`;

const ViewRequesterInfoText = styled(Text)`
  font-size: 10px;
  font-family: poppins-600;
  color: white;
`;

const LineBreak = styled(View)`
  height: 1px;
  width: 85%;
  background-color: #b7b7b7;
  align-self: center;
  margin-top: 20px;
`;
