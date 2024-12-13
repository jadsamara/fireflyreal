import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  FontAwesome5,
  AntDesign,
} from "@expo/vector-icons";
import { getUserInfo } from "../../../../../Functions/GetUserInfo";
import SparkBlur from "../../../../../Assets/sparkblur.png";

export const SparkCardPreConfirmed = ({ spark = {}, navigation }) => {
  const {
    sparkImage = "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/ac/03.jpg",
    sparkTitle = "Bruce Tail Hike",
    totalNumberOfParticipants = 4,
    totalNumberOfCurrentParticipants = 2,
    luminsPrice = spark.luminsPrice,
    sparkHostName = spark.userInfo.name,
    hostProfilePicture = spark.userInfo.profilePicture,
    currentlyJoinedProfileParticipants = [],
  } = spark;

  const [profilePictures, setProfilePictures] = useState([]);

  useEffect(() => {
    const fetchProfilePictures = async () => {
      const pictures = [];
      for (let i = 1; i < currentlyJoinedProfileParticipants.length; i++) {
        const participantUserInfo = await getUserInfo(
          currentlyJoinedProfileParticipants[i]
        );
        pictures.push(participantUserInfo.profilePicture);
      }
      setProfilePictures(pictures);
    };

    fetchProfilePictures();
  }, [currentlyJoinedProfileParticipants]);

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

  const onHandleNavigateToViewSparkPageHost = () => {
    navigation.navigate("ViewSparkPageHost", {
      spark,
    });
  };

  const onHandleNavigateToViewSparkRequestsPage = () => {
    navigation.navigate("ViewSparkRequestsPage", {
      spark,
    });
  };

  const renderParticipants = () => {
    const participants = [];
    const numProfilePictures = profilePictures.length;
    const remainingSlots = totalNumberOfParticipants - numProfilePictures - 1; // Subtract 1 for the host

    // Render profile pictures
    for (let i = 0; i < numProfilePictures; i++) {
      if (i < 2) {
        participants.push(
          <ParticipantProfilePicture key={i}>
            <ProfileImage source={{ uri: profilePictures[i] }} />
          </ParticipantProfilePicture>
        );
      }
    }

    // Render placeholders
    for (
      let i = numProfilePictures;
      i < Math.min(2, numProfilePictures + remainingSlots);
      i++
    ) {
      participants.push(
        <ParticipantProfilePicture key={i}>
          <Ionicons name="person-add-sharp" size={22} color="white" />
        </ParticipantProfilePicture>
      );
    }

    // Render extra users indicator
    if (remainingSlots > 2 - numProfilePictures) {
      participants.push(
        <ParticipantProfilePicture key="extra">
          <ExtraUsersText>
            {remainingSlots - (2 - numProfilePictures)}+
          </ExtraUsersText>
        </ParticipantProfilePicture>
      );
    }

    return participants;
  };

  const goToChat = () => {
    navigation.navigate("ChatScreen", {
      chatRoomId: spark.documentId,
      spark: spark,
    });
  };

  return (
    <Container>
      <SparkImageContainer onPress={onHandleNavigateToViewSparkPageHost}>
        <SparkImage
          source={{
            uri: sparkImage,
          }}
        />
        <SparkBlurContainer>
          <SparkBlurImage source={SparkBlur} />
        </SparkBlurContainer>
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
            {renderParticipants()}
          </ParticipantsProfilePicturesContainer>
          <RequestChatCol>
            <ViewRequestsButton
              onPress={onHandleNavigateToViewSparkRequestsPage}
            >
              {spark.allRequesters.length > 0 ? <RequestAlert /> : null}
              <ViewRequestsText>Requests</ViewRequestsText>
            </ViewRequestsButton>
            <OpenChatButton onPress={goToChat}>
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
          <LockText>Until spark ends</LockText>
          <AntDesign name="questioncircle" size={12} color="#34777F" />
        </LockContainer>
      </MoneyAndLockContainer>
      <SparkStatusContainer>
        <SparkStatusText>Confirmed</SparkStatusText>
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

const ViewRequestsButton = styled(TouchableOpacity)`
  background-color: #415f74;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 15px;
  align-items: center;
  justify-content: center;
  width: 100px;
`;

const RequestAlert = styled(View)`
  background-color: #f5e065;
  height: 12px;
  width: 12px;
  border-radius: 100px;
  position: absolute;
  top: -3px;
  right: 0px;
`;

const ViewRequestsText = styled(Text)`
  color: white;
  font-size: 10px;
  font-family: poppins-400;
`;

const OpenChatButton = styled(TouchableOpacity)`
  background-color: #79d17c;
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
  background-color: #79d17c;
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

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

const SparkBlurContainer = styled(View)`
  width: 100%;
  height: 60px;
  position: absolute;
  bottom: 0px;
`;

const SparkBlurImage = styled(Image)`
  height: 100%;
  width: 100%;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;
