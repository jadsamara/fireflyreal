import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";

export const SparkCardRequested = ({ spark = {}, navigation, userNumber }) => {
  const {
    sparkImage = "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/ac/03.jpg",
    sparkTitle = "Bruce Tail Hike",
    totalNumberOfParticipants = 4,
    totalNumberOfCurrentParticipants = 2,
    luminsPrice = spark.luminsPrice,
    sparkHostName = spark.userInfo.name,
    hostProfilePicture = spark.userInfo.profilePicture,
  } = spark;

  const [formattedRequestedTime, setFormattedRequestedTime] = useState(0);

  useEffect(() => {
    const temp = spark.allRequesters.find(
      (requester) => requester.user === userNumber
    );
    setFormattedRequestedTime(temp.requestDuration || 0);
  }, [spark]);

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
  } else {
    if (spark.selectedDateOnCalendar.length > 0) {
      const minTimeObj = spark.selectedDateOnCalendar.reduce((min, obj) =>
        obj.time < min.time ? obj : min
      );

      // Calculate days difference
      const currentTime = Date.now();
      const timeDifference = minTimeObj.time - currentTime;
      const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

      minimumDate = `${daysDifference} day${daysDifference !== 1 ? "s" : ""}`;
    }
    formattedDate = "TBD";
  }

  const onHandleNavigateToViewSparkPageParticipant = () => {
    navigation.navigate("ViewSparkPageParticipant", {
      spark,
      type: "requested",
    });
  };

  const formatDurationFromNow = () => {
    try {
      if (formattedRequestedTime) {
        const requestTime = new Date(
          formattedRequestedTime.seconds * 1000 +
            formattedRequestedTime.nanoseconds / 1e6
        );
        const currentTime = new Date();
        const diffMilliseconds = requestTime - currentTime;

        // If the time has already passed, you might want to handle it differently
        if (diffMilliseconds <= 0) {
          return "Expired";
        }

        const totalSeconds = Math.floor(diffMilliseconds / 1000);
        const days = Math.floor(totalSeconds / 86400); // 86400 seconds in a day
        const hours = Math.floor((totalSeconds % 86400) / 3600); // 3600 seconds in an hour
        const minutes = Math.floor((totalSeconds % 3600) / 60); // 60 seconds in a minute

        // Format output based on the largest relevant unit
        if (days > 0) {
          return `${days} day${days > 1 ? "s" : ""}`;
        } else if (hours > 0) {
          return `${hours} hr${hours > 1 ? "s" : ""}`;
        } else if (minutes > 0) {
          return `${minutes} min${minutes > 1 ? "s" : ""}`;
        } else {
          return `${totalSeconds % 60} sec${totalSeconds % 60 > 1 ? "s" : ""}`;
        }
      }
    } catch (e) {
      console.log("error");
    }
  };

  return (
    <Container>
      <SparkImageContainer onPress={onHandleNavigateToViewSparkPageParticipant}>
        <SparkImage
          source={{
            uri: sparkImage,
          }}
        />
        <SparkDaysLeft>
          <MaterialCommunityIcons
            name="clock-time-four"
            size={18}
            color="white"
          />
          <DaysLeftText>{minimumDate}</DaysLeftText>
        </SparkDaysLeft>
        <SparkScheduledDate>
          <SparkScheduledText>{formattedDate}</SparkScheduledText>
        </SparkScheduledDate>
        <SparkTitle>{sparkTitle}</SparkTitle>
      </SparkImageContainer>
      <FooterContainer>
        <ProfilePictureHost
          source={{
            uri: hostProfilePicture,
          }}
        />
        <UpperTextRow>
          <HostSparkText>{sparkHostName}'s Spark</HostSparkText>
          <GroupPeopleContainer>
            <FontAwesome name="group" size={12} color="#527E65" />
            <AmountOfPeopleText>
              {totalNumberOfCurrentParticipants}/{totalNumberOfParticipants}
            </AmountOfPeopleText>
          </GroupPeopleContainer>
        </UpperTextRow>
        <ParticipantsAndGroupContainer>
          <ParticipantsProfilePicturesContainer>
            {Array.from({ length: totalNumberOfParticipants }).map(
              (_, index) => {
                if (index < 2) {
                  return (
                    <ParticipantProfilePicture key={index}>
                      <Ionicons
                        name="person-add-sharp"
                        size={22}
                        color="white"
                      />
                    </ParticipantProfilePicture>
                  );
                } else if (index === 3) {
                  return (
                    <ParticipantProfilePicture key={index}>
                      <ExtraUsersText>
                        {totalNumberOfParticipants - 3}+
                      </ExtraUsersText>
                    </ParticipantProfilePicture>
                  );
                } else {
                  return null; // Do not render anything for indexes greater than 3
                }
              }
            )}
          </ParticipantsProfilePicturesContainer>
          <RequestChatCol>
            <ViewRequestsButton>
              <ViewRequestsText>Requested</ViewRequestsText>
            </ViewRequestsButton>
            <OpenChatButton>
              <OpenChatText>Chat</OpenChatText>
            </OpenChatButton>
          </RequestChatCol>
        </ParticipantsAndGroupContainer>
      </FooterContainer>
      <MoneyAndLockContainer>
        <MoneyDepositContainer>
          <MoneyDepositText>{luminsPrice}</MoneyDepositText>
          <CoinsLogo name="coins" size={20} color="#79D17C" />
          <MoneyDepositText>deposit</MoneyDepositText>
        </MoneyDepositContainer>
        <LockContainer>
          <FontAwesome name="lock" size={14} color="#34777F" />
          <LockText>{formatDurationFromNow()}</LockText>
          <AntDesign name="questioncircle" size={12} color="#34777F" />
        </LockContainer>
      </MoneyAndLockContainer>
      <SparkStatusContainer>
        <SparkStatusText>Pending</SparkStatusText>
      </SparkStatusContainer>
      <LineBreak />
    </Container>
  );
};

const Container = styled(View)`
  height: 380px;
  width: 100%;
  margin-top: 20px;
`;

const SparkImageContainer = styled(TouchableOpacity)`
  width: 100%;
  height: 160px;
  position: relative;
`;

const SparkImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
`;

const SparkDaysLeft = styled(View)`
  background-color: #79d17c;
  position: absolute;
  z-index: 999;
  top: 15px;
  right: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DaysLeftText = styled(Text)`
  color: white;
  font-size: 8px;
  font-family: poppins-800;
  margin-left: 5px;
`;

const SparkScheduledDate = styled(View)`
  background-color: #79d17c;
  position: absolute;
  z-index: 999;
  top: 15px;
  left: 15px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 10px;
`;

const SparkScheduledText = styled(Text)`
  color: white;
  font-size: 10px;
  font-family: poppins-800;
`;

const SparkTitle = styled(Text)`
  color: white;
  font-size: 24px;
  font-family: poppins-600;
  position: absolute;
  z-index: 999;
  bottom: 20px;
  left: 25px;
`;

const FooterContainer = styled(View)`
  width: 100%;
`;

const UpperTextRow = styled(View)`
  flex-direction: row;
  width: 80%;
  align-self: flex-end;
  align-items: flex-end;
  justify-content: flex-start;
  margin-top: 5px;
`;

const ProfilePictureHost = styled(Image)`
  width: 65px;
  height: 65px;
  border-radius: 100px;
  position: absolute;
  left: 0px;
  top: 5px;
`;

const HostSparkText = styled(Text)`
  font-size: 16px;
  font-family: poppins-400;
`;

const GroupPeopleContainer = styled(View)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  margin-left: 20px;
`;

const AmountOfPeopleText = styled(Text)`
  font-size: 14px;
  font-family: poppins-600;
  color: #527e65;
  margin-left: 5px;
`;

const ExtraUsersText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: white;
`;

const ParticipantsAndGroupContainer = styled(View)`
  flex-direction: row;
  width: 80%;
  align-self: flex-end;
  margin-top: 2px;
  justify-content: space-between;
`;

const ParticipantsProfilePicturesContainer = styled(View)`
  flex-direction: row;
`;

const ParticipantProfilePicture = styled(View)`
  width: 45px;
  height: 45px;
  border-radius: 100px;
  background-color: #b1b1b1;
  margin-left: 5px;
  align-items: center;
  justify-content: center;
`;

const RequestChatCol = styled(View)`
  justify-content: center;
  align-items: flex-end;
`;

const ViewRequestsButton = styled(View)`
  background-color: #707070;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  width: 100px;
`;

const ViewRequestsText = styled(Text)`
  color: white;
  font-size: 10px;
  font-family: poppins-400;
`;

const OpenChatButton = styled(View)`
  background-color: #707070;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  margin-top: 5px;
  width: 80px;
`;

const OpenChatText = styled(Text)`
  color: white;
  font-size: 10px;
  font-family: poppins-400;
`;

const MoneyAndLockContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const MoneyDepositContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const MoneyDepositText = styled(Text)`
  color: #79d17c;
  font-size: 16px;
  font-family: poppins-400;
`;

const CoinsLogo = styled(FontAwesome5)`
  margin-left: 3px;
  margin-right: 10px;
`;

const LockContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
`;

const LockText = styled(Text)`
  color: #34777f;
  font-size: 10px;
  font-family: poppins-500;
  margin-left: 5px;
  margin-right: 5px;
`;

const SparkStatusContainer = styled(View)`
  margin-top: 16px;
  align-self: center;
  background-color: #707070;
  padding-top: 4px;
  padding-bottom: 4px;
  padding-left: 12px;
  padding-right: 12px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const SparkStatusText = styled(Text)`
  color: white;
  font-size: 10px;
  font-family: poppins-500;
`;

const LineBreak = styled(View)`
  height: 1px;
  width: 85%;
  position: absolute;
  bottom: 0px;
  background-color: #b7b7b7;
  align-self: center;
`;
