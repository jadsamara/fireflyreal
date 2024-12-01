import { View, Text, Image } from "react-native";
import React, { useState, useContext } from "react";
import styled from "styled-components";
import {
  Ionicons,
  FontAwesome,
  AntDesign,
  MaterialIcons,
} from "@expo/vector-icons";

import { useSelector } from "react-redux";

import { PostDateContext } from "../../../../Context/PostPagesContext";
import { AuthContext } from "../../../../Config/AuthContext";

import { getDistance } from "../../../../Functions/GetDistance";

export const SparkCard = () => {
  const { location } = useContext(AuthContext);

  const {
    sparkImage,
    sparkTitle,
    locationName,
    tags,
    totalNumberOfParticipants,
    totalNumberOfCurrentParticipants,
    hangoutCoordinates,
    selectedDateOnCalendar,
  } = useContext(PostDateContext);

  const [profilePictures, setProfilePictures] = useState([]);
  const userData = useSelector((state) => state.user.userData);

  const renderParticipants = () => {
    const participants = [];
    const numProfilePictures = profilePictures.length;
    const remainingSlots = totalNumberOfParticipants - numProfilePictures - 1; // Subtract 1 for the host

    // Render profile pictures
    for (let i = 0; i < numProfilePictures; i++) {
      if (i < 3) {
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
      i < Math.min(3, numProfilePictures + remainingSlots);
      i++
    ) {
      participants.push(
        <ParticipantProfilePicture key={i}>
          <Ionicons name="person-add-sharp" size={22} color="white" />
        </ParticipantProfilePicture>
      );
    }

    // Render extra users indicator
    if (remainingSlots > 3 - numProfilePictures) {
      participants.push(
        <ParticipantProfilePicture key="extra">
          <ExtraUsersText>
            {remainingSlots - (3 - numProfilePictures)}+
          </ExtraUsersText>
        </ParticipantProfilePicture>
      );
    }

    return participants;
  };

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

  if (
    selectedDateOnCalendar &&
    Object.keys(selectedDateOnCalendar).length > 0
  ) {
    // Extract all objects from the `selectedDateOnCalendar` values
    const dateObjects = Object.values(selectedDateOnCalendar);

    // Find the object with the minimum `time`
    const minTimeObj = dateObjects.reduce((min, obj) =>
      obj.time < min.time ? obj : min
    );

    // Calculate days difference
    const currentTime = Date.now();
    const timeDifference = minTimeObj.time - currentTime;
    const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24)); // Convert milliseconds to days

    // Format minimum date string
    minimumDate = `${daysDifference} day${daysDifference !== 1 ? "s" : ""}`;
  } else {
    minimumDate = "No date selected";
  }

  // Default formattedDate
  formattedDate = "TBD";

  let spark = {};
  spark.hangoutCoordinates = hangoutCoordinates;

  return (
    <Container>
      <SparkImageContainer>
        <SparkImage source={{ uri: sparkImage }} />
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
        <ProfilePictureHost source={{ uri: userData.profilePicture }} />
        <UpperTextRow>
          <HostSparkText>{userData.name}'s Spark</HostSparkText>
          <LocationDistanceContainer>
            <SparkLocationText>{locationName}</SparkLocationText>
            <SparkDistanceInKMText>
              ({getDistance(location, spark)} km)
            </SparkDistanceInKMText>
          </LocationDistanceContainer>
        </UpperTextRow>
        <ParticipantsAndGroupContainer>
          <ParticipantsProfilePicturesContainer>
            {renderParticipants()}
          </ParticipantsProfilePicturesContainer>
          <GroupPeopleContainer>
            <FontAwesome name="group" size={20} color="#527E65" />
            <AmountOfPeopleText>
              {totalNumberOfCurrentParticipants}/{totalNumberOfParticipants}
            </AmountOfPeopleText>
          </GroupPeopleContainer>
        </ParticipantsAndGroupContainer>
        <TagContainer>
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
  height: 270px;
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
  padding-top: 5px;
  padding-bottom: 5px;
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
  font-size: 30px;
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
  font-size: 12px;
  font-family: poppins-500;
  margin-left: 3px;
`;

const SparkLocationText = styled(Text)`
  font-size: 9px;
  font-family: poppins-500;
  margin-bottom: 2px;
  color: #527e65;
`;

const SparkDistanceInKMText = styled(Text)`
  font-size: 7px;
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
  margin-left: 20px;
`;

const AmountOfPeopleText = styled(Text)`
  font-size: 12px;
  font-family: poppins-600;
  color: #527e65;
  margin-left: 5px;
`;

const TagContainer = styled(View)`
  flex-direction: row;
  margin-top: 10px;
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
