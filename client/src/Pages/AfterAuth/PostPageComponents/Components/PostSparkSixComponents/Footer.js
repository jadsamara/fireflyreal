import { View, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";

import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";

import { PostDateContext } from "../../../../../Context/PostPagesContext";
import { DefaultContext } from "../../../../../Context/DefaultContext";
import { postGlow } from "./PostGlow";

import { auth } from "../../../../../Config/firebase";
import { useDispatch } from "react-redux";

export const Footer = ({ navigation, userLumins }) => {
  const { tokenNotification } = useContext(DefaultContext);
  const userNumber = auth.currentUser.phoneNumber;
  const dispatch = useDispatch();

  const {
    acceptTerms,
    setAcceptTerms,
    sparkImage,
    sparkTitle,
    fullAddress,
    totalNumberOfParticipants,
    totalNumberOfCurrentParticipants,
    luminsPrice,
    tags,
    sparkDescription,
    locationName,
    fullLocationName,
    useShortName,
    selectedDateOnCalendar,
    hangoutCoordinates,
    userHangoutName,
  } = useContext(PostDateContext);

  const onHandleCheck = () => {
    setAcceptTerms((res) => !res);
  };

  const onHandleCancel = () => {
    navigation.goBack();
  };

  const onHandlePostGlow = () => {
    try {
      if (acceptTerms) {
        postGlow({
          userNumber,
          tokenNotification,
          sparkImage,
          sparkTitle,
          fullAddress,
          totalNumberOfParticipants,
          totalNumberOfCurrentParticipants,
          luminsPrice,
          tags,
          sparkDescription,
          locationName,
          fullLocationName,
          useShortName,
          selectedDateOnCalendar,
          hangoutCoordinates,
          userHangoutName,
          acceptTerms,
          userLumins,
          dispatch,
        });
        navigation.navigate("PostSparkSeven");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Row>
        <CheckboxSquare onPress={onHandleCheck}>
          {acceptTerms ? (
            <FontAwesome name="check" size={10} color="black" />
          ) : null}
        </CheckboxSquare>
        <GuidelinesText>I understand the community guidelines</GuidelinesText>
      </Row>
      <RowTwo>
        <CancelDate onPress={onHandleCancel}>
          <CancelDateText>Cancel Spark</CancelDateText>
        </CancelDate>
        <PostGlow onPress={onHandlePostGlow}>
          <PostGlowText>Post Spark</PostGlowText>
        </PostGlow>
      </RowTwo>
    </Container>
  );
};

const Container = styled(View)`
  position: absolute;
  width: 100%;
  bottom: 0px;
  height: 180px;
  background-color: white;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: center;
  margin-top: 30px;
`;

const CheckboxSquare = styled(TouchableOpacity)`
  width: 20px;
  height: 20px;
  border-width: 3px;
  border-color: #000000;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
`;

const GuidelinesText = styled(Text)`
  font-size: 12px;
  font-family: poppins-400;
  margin-left: 10px;
`;

const RowTwo = styled(View)`
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-around;
  margin-top: 40px;
`;

const PostGlow = styled(TouchableOpacity)`
  background-color: #79d17c;
  padding: 15px;
  border-radius: 20px;
`;

const PostGlowText = styled(Text)`
  color: white;
  font-size: 16px;
  font-family: poppins-600;
`;

const CancelDate = styled(TouchableOpacity)``;

const CancelDateText = styled(Text)`
  color: #ff0000;
  font-size: 12px;
  font-family: poppins-400;
`;
