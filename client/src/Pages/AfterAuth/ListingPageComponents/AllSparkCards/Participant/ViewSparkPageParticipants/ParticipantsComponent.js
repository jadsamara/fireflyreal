import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";

import { getUserInfo } from "../../../../../../Functions/GetUserInfo";

export const ParticipantsComponent = ({ spark, navigation }) => {
  const [participantInfo, setParticipantInfo] = useState([]);

  useEffect(() => {
    const fetchParticipantInfo = async () => {
      const participantData = await Promise.all(
        spark.currentlyJoinedProfileParticipants.map(async (phoneNumber) => {
          // Fetch user information for each phoneNumber
          const userInfo = await getUserInfo(phoneNumber);
          return userInfo;
        })
      );
      setParticipantInfo(participantData);
    };

    fetchParticipantInfo();
  }, [spark.currentlyJoinedProfileParticipants]);

  const navigateToConfirmSendRequestPage = (participant) => {
    navigation.navigate("ViewParticipantAccountPage", {
      participant,
    });
  };

  return (
    <Container>
      <ParticipantsContainer>
        <ParticipantsSubTitleContainer>
          <ParticipantsSubTitle>Participants</ParticipantsSubTitle>
          <AmountOfParticipantsSubTitle>
            {spark.totalNumberOfCurrentParticipants}/
            {spark.totalNumberOfParticipants}
          </AmountOfParticipantsSubTitle>
        </ParticipantsSubTitleContainer>
        <Participants>
          {participantInfo.map((res) => {
            return (
              <ParticipantsButton
                onPress={() => navigateToConfirmSendRequestPage(res)}
              >
                <ProfilePicture
                  source={{
                    uri: res.profilePicture,
                  }}
                />
                <NameText>
                  {res.name} {spark.host === res.userNumber ? "(Host)" : null}
                </NameText>
                <BottomLabelContainer>
                  <AntDesign name="star" size={16} color="#93E4B6" />
                  <RatingLabel>
                    {parseFloat(res.averageUserRating).toFixed(1)}
                  </RatingLabel>
                  <TotalSparksText>
                    {res.pastSparks.length} Sparks
                  </TotalSparksText>
                </BottomLabelContainer>
              </ParticipantsButton>
            );
          })}
        </Participants>
      </ParticipantsContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 5px;
  padding: 15px;
`;

const ParticipantsContainer = styled(View)`
  width: 100%;
`;

const ParticipantsSubTitleContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
`;

const ParticipantsSubTitle = styled(Text)`
  font-size: 14px;
  font-family: poppins-500;
`;

const AmountOfParticipantsSubTitle = styled(Text)`
  font-size: 12px;
  font-family: poppins-600;
  color: #79d17c;
  right: 90px;
  position: absolute;
`;

const Participants = styled(ScrollView).attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {
    paddingHorizontal: 10,
  },
})`
  width: 100%;
  padding: 10px 0;
`;

const ParticipantsButton = styled(TouchableOpacity)`
  flex-direction: column;
  height: auto;
  margin-top: 12px;
  margin-right: 25px;
`;

const ProfilePicture = styled(Image)`
  width: 90px;
  height: 90px;
  align-self: center;
  border-radius: 50px;
`;

const NameText = styled(Text)`
  text-align: center;
  margin-top: 10px;
  font-family: poppins-600;
  font-size: 14px;
  color: #527e65;
`;

const BottomLabelContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

const RatingLabel = styled(Text)`
  margin-left: 2px;
  font-family: poppins-400;
  font-size: 12px;
`;

const TotalSparksText = styled(Text)`
  font-size: 12px;
  font-family: poppins-600;
  margin-left: 5px;
  color: #79d17c;
`;
