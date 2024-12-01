import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";

import { SafeArea } from "../../../../../Components/GlobalComponents/SafeArea";
import styled from "styled-components";

import { AntDesign } from "@expo/vector-icons";
import { CalendarSectionComponent } from "./ViewRequestInfoComponents/CalendarSectionComponent";

import { calculateAge } from "../../../../../Functions/GetAgeNew";

import {
  collection,
  updateDoc,
  doc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import { database } from "../../../../../Config/firebase";

export const ViewRequestInfo = ({ navigation, route }) => {
  const { requestedUser, userInfo, currentTimeInMS, currentID, spark } =
    route.params;

  const userAge = calculateAge(userInfo.age);
  console.log(spark);

  let formattedDateTag = "";

  if (spark.chosenTime) {
    formattedDateTag = "Confirmed";
  } else {
    formattedDateTag = "Flexible";
  }

  const acceptRequesterInvite = async () => {
    try {
      // Filter out the specific requester from the spark.allRequesters array
      const newSparkRequesters = spark.allRequesters.filter(
        (requester) => requester.user !== requestedUser.user
      );

      const docRef = doc(collection(database, "Sparks"), spark.documentId);
      await updateDoc(docRef, {
        chosenTime: spark.chosenTime ? spark.chosenTime : currentTimeInMS,
        allRequesters: newSparkRequesters, // Update the filtered array
        currentlyJoinedProfileParticipants: arrayUnion(requestedUser.user),
        totalNumberOfCurrentParticipants:
          spark.totalNumberOfCurrentParticipants + 1,
      });

      const docRefUser = doc(collection(database, "Users"), requestedUser.user);
      await updateDoc(docRefUser, {
        sparksRequestedByUser: arrayRemove(spark.documentId),
        currentActiveSparks: arrayUnion(spark.documentId),
      });

      Alert.alert("User Accepted!");
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error updating documents: ", error);
      Alert.alert("Error accepting invite. Please try again.");
    }
  };

  return (
    <SafeArea>
      <Container>
        <Title>Meet {userInfo.name}</Title>
        <Row>
          <Col>
            <ProfilePicture source={{ uri: userInfo.profilePicture }} />
            <RequesterName>
              {userInfo.name}, {userAge}
            </RequesterName>
            <RowTwo>
              <AntDesign name="star" size={16} color="#93E4B6" />
              <RequesterRatingText>
                {parseFloat(userInfo.averageUserRating).toFixed(1)}
              </RequesterRatingText>
              <RequesterTotalSparksText>
                {userInfo.pastSparks.length} sparks
              </RequesterTotalSparksText>
            </RowTwo>
          </Col>
          <MessageBox>
            <MessageBoxText>{requestedUser.requesterComment}</MessageBoxText>
          </MessageBox>
        </Row>
        <HeaderContainer>
          <SubTitle>Requested Dates</SubTitle>
          <Tag>
            <TagText>{formattedDateTag}</TagText>
          </Tag>
        </HeaderContainer>
        <CalendarSectionComponent
          currentTimeInMS={
            spark.chosenTime ? spark.chosenTime : currentTimeInMS
          }
          currentID={currentID}
        />
        <AcceptInviteButton onPress={acceptRequesterInvite}>
          <AcceptInviteText>Accept Invite</AcceptInviteText>
        </AcceptInviteButton>
      </Container>
    </SafeArea>
  );
};

const Container = styled(ScrollView)`
  width: 100%;
  height: 100%;
`;

const Title = styled(Text)`
  font-size: 30px;
  font-family: poppins-600;
  text-align: center;
  margin-top: 20px;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const RowTwo = styled(View)`
  flex-direction: row;
`;

const Col = styled(View)``;

const ProfilePicture = styled(Image)`
  width: 90px;
  height: 90px;
  border-radius: 100px;
  margin-right: 20px;
`;

const RequesterName = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: #527e65;
  margin-top: 5px;
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

const MessageBox = styled(View)`
  width: 220px;
  height: 130px;
  justify-content: center;
  align-items: center;
  background-color: #f2eded;
  border-radius: 30px;
`;

const MessageBoxText = styled(Text)`
  font-size: 10px;
  font-family: poppins-500;
  color: #527e65;
  flex-wrap: wrap; /* Allow text to wrap */
  max-width: 80%;
`;

const HeaderContainer = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
`;

const SubTitle = styled(Text)`
  font-size: 14px;
  font-family: poppins-600;
`;

const Tag = styled(View)`
  background-color: #79d17c;
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 90px;
  border-radius: 16px;
  padding-top: 5px;
  padding-bottom: 5px;
  margin-left: 10px;
`;

const TagText = styled(Text)`
  font-size: 10px;
  font-family: poppins-600;
  color: white;
`;

const AcceptInviteButton = styled(TouchableOpacity)`
  height: 55px;
  width: 215px;
  background-color: #79d17c;
  margin-top: 50px;
  margin-bottom: 80px;
  align-self: center;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;

const AcceptInviteText = styled(Text)`
  font-size: 18px;
  font-family: poppins-600;
  color: white;
`;
