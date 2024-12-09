import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Ionicons, AntDesign, MaterialIcons } from "@expo/vector-icons";
import { getUserInfo } from "../../../../Functions/GetUserInfo";

import SparkBlur from "../../../../Assets/sparkblur.png";

export const SparkCard = ({ spark = {} }) => {
  const {
    sparkImage = "https://media.tacdn.com/media/attractions-splice-spp-674x446/0b/27/ac/03.jpg",
    sparkTitle = "Bruce Tail Hike",
    totalNumberOfParticipants = 4,
    totalNumberOfCurrentParticipants = 2,
    tags = [{ id: 0, text: "Sb" }],
    distance = "2.3km",
    locationName = "Missisauga",
    currentlyJoinedProfileParticipants = [],
    userInfo = {},
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

  const renderParticipants = () => {
    const participants = [];
    const numProfilePictures = profilePictures.length;
    const remainingSlots = totalNumberOfParticipants - numProfilePictures - 1; // Subtract 1 for the host

    // Render profile pictures
    for (let i = 0; i < numProfilePictures; i++) {
      if (i < 4) {
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
      i < Math.min(4, numProfilePictures + remainingSlots);
      i++
    ) {
      participants.push(
        <ParticipantProfilePicture key={i}>
          <Ionicons name="person-add-sharp" size={22} color="white" />
        </ParticipantProfilePicture>
      );
    }

    // Render extra users indicator
    if (remainingSlots > 4 - numProfilePictures) {
      participants.push(
        <ParticipantProfilePicture key="extra">
          <ExtraUsersText>
            {remainingSlots - (4 - numProfilePictures)}+
          </ExtraUsersText>
        </ParticipantProfilePicture>
      );
    }

    return participants;
  };

  return (
    <Container>
      <SparkImageContainer>
        <SparkImage source={{ uri: sparkImage }} />
        <SparkBlurContainer>
          <SparkBlurImage source={SparkBlur} />
        </SparkBlurContainer>
        <SparkScheduledDate>
          <SparkScheduledText>{formattedDate}</SparkScheduledText>
        </SparkScheduledDate>
        <SparkScheduledDateDays>
          <AntDesign name="clockcircle" size={12} color="white" />
          <SparkScheduledTextDays>{minimumDate}</SparkScheduledTextDays>
        </SparkScheduledDateDays>
        <SparkTitle>{sparkTitle}</SparkTitle>
      </SparkImageContainer>
      <FooterContainer>
        <ProfilePictureHost source={{ uri: userInfo.profilePicture }} />
        <UpperTextRow>
          <HostSparkText>{userInfo.name}'s Spark</HostSparkText>
          <LocationDistanceContainer>
            <SparkLocationText>{locationName}</SparkLocationText>
            <SparkDistanceInKMText>
              {`(${parseFloat(distance).toFixed(1)} km)`}
            </SparkDistanceInKMText>
          </LocationDistanceContainer>
        </UpperTextRow>
        <ParticipantsAndGroupContainer>
          <ParticipantsProfilePicturesContainer>
            {renderParticipants()}
          </ParticipantsProfilePicturesContainer>
        </ParticipantsAndGroupContainer>
        <TagContainer>
          <GroupPeopleContainer>
            <MaterialIcons name="groups" size={28} color="#527E65" />

            <AmountOfPeopleText>
              {totalNumberOfCurrentParticipants}/{totalNumberOfParticipants}
            </AmountOfPeopleText>
          </GroupPeopleContainer>
          {tags.slice(0, 2).map((res, index) => (
            <Tag key={index}>
              <TagText>{res.text}</TagText>
            </Tag>
          ))}
        </TagContainer>
      </FooterContainer>
    </Container>
  );
};

const Container = styled(View)`
  height: 280px;
  width: 100%;
`;

const SparkImageContainer = styled(View)`
  width: 100%;
  height: 140px;
  position: relative;
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
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
`;

const SparkScheduledTextDays = styled(Text)`
  color: white;
  font-size: 10px;
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

const FooterContainer = styled(View)`
  width: 100%;
  height: 110px;
`;

const UpperTextRow = styled(View)`
  flex-direction: row;
  width: 80%;
  align-self: flex-end;
  align-items: flex-end;
  justify-content: space-between;
  margin-top: 4px;
`;

const ProfilePictureHost = styled(Image)`
  width: 70px;
  height: 70px;
  border-radius: 100px;
  position: absolute;
  left: 0px;
  top: 5px;
`;

const HostSparkText = styled(Text)`
  font-size: 15px;
  font-family: poppins-600;
  margin-left: 3px;
`;

const SparkLocationText = styled(Text)`
  font-size: 13px;
  font-family: poppins-500;
  margin-bottom: 2px;
  color: #527e65;
`;

const SparkDistanceInKMText = styled(Text)`
  font-size: 10px;
  font-family: poppins-500;
  margin-left: 4px;
  margin-bottom: 1px;
`;

const ParticipantsAndGroupContainer = styled(View)`
  flex-direction: row;
  width: 80%;
  align-self: flex-end;
  margin-top: 2px;
`;

const ParticipantsProfilePicturesContainer = styled(View)`
  flex-direction: row;
  width: 70%;
  align-self: center;
  margin-top: 2px;
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

const ProfileImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

const GroupPeopleContainer = styled(View)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  right: 5px;
  position: absolute;
`;

const AmountOfPeopleText = styled(Text)`
  font-size: 14px;
  font-family: poppins-700;
  color: #527e65;
  margin-left: 5px;
`;

const TagContainer = styled(View)`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

const Tag = styled(View)`
  background-color: #527e65;
  justify-content: center;
  align-items: center;
  padding-top: 5px;
  padding-bottom: 5px;
  padding-right: 15px;
  padding-left: 15px;
  margin-left: 5px;
  border-radius: 15px;
`;

const TagText = styled(Text)`
  font-size: 10px;
  font-family: poppins-800;
  color: white;
`;

const ExtraUsersText = styled(Text)`
  font-size: 18px;
  font-family: poppins-600;
  color: white;
`;

const LocationDistanceContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
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
