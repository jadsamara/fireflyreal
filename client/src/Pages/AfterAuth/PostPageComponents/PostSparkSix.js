import React, { useState, useContext, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import { SafeArea } from "../../../Components/GlobalComponents";

import styled from "styled-components";

import { PostDateContext } from "../../../Context/PostPagesContext";
import { getUserInfo } from "../../../Functions/GetUserInfo";

import {
  BodyComponent,
  Footer,
  HeaderComponent,
  MapViewComponent,
  ParticipantsComponent,
} from "./Components/PostSparkSixComponents";

import { auth } from "../../../Config/firebase";

export const PostSparkSix = ({ navigation }) => {
  const [hostInfo, setHostInfo] = useState([]);
  const userNumber = auth.currentUser.phoneNumber;
  const {
    sparkImage,
    sparkTitle,
    locationName,
    tags,
    totalNumberOfParticipants,
    totalNumberOfCurrentParticipants,
    fullAddress,
    sparkDescription,
    selectedDateOnCalendar,
    hangoutCoordinates,
  } = useContext(PostDateContext);

  useEffect(() => {
    const fetchParticipantInfo = async () => {
      const userInfo = await getUserInfo(userNumber);
      setHostInfo(userInfo);
    };

    fetchParticipantInfo();
  }, []);

  const headerObject = {
    sparkImage,
    sparkTitle,
    locationName,
    hangoutCoordinates,
    tags,
    totalNumberOfCurrentParticipants,
    totalNumberOfParticipants,
    hostProfilePicture: hostInfo.profilePicture,
    allAvailableTimes: selectedDateOnCalendar,
  };

  const bodyObject = {
    allAvailableTimes: selectedDateOnCalendar,
    sparkDescription,
    fullAddress,
    currentlyJoinedProfileParticipants: [userNumber],
    hangoutCoordinates,
  };

  const participantObj = {
    currentlyJoinedProfileParticipants: [userNumber],
    host: userNumber,
  };

  const mapObj = {
    hangoutCoordinates,
    hostName: hostInfo.name,
    locationName,
  };

  return (
    <SafeArea>
      <Container>
        <Header>Confirm your spark</Header>
        <ScrollContainer>
          <HeaderComponent spark={headerObject} />
          <BodyComponent spark={bodyObject} hostInfo={hostInfo} />
          <ParticipantsComponent
            spark={participantObj}
            navigation={navigation}
          />
          <MapViewComponent spark={mapObj} />
        </ScrollContainer>
        <Footer navigation={navigation} userLumins={hostInfo.userLumins} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  height: 100%;
`;

const Header = styled(Text)`
  font-size: 24px;
  font-family: poppins-600;
  margin-top: 10px;
  margin-bottom: 20px;
  text-align: center;
`;

const ScrollContainer = styled(ScrollView)`
  height: 100%;
  width: 100%;
  flex: 1;
`;
