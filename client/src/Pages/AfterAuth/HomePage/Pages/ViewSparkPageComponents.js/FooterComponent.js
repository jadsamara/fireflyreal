import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState, useContext } from "react";
import styled from "styled-components";

import LuminsLogo from "../../../../../Assets/luminslogo.png";

import { AuthContext } from "../../../../../Config/AuthContext";
import { HomePageContext } from "../../../../../Context/HomePageContext";

import { format } from "date-fns";
import { useSelector } from "react-redux";

export const FooterComponent = ({ spark, navigation }) => {
  const [lockPoints, setLockPoints] = useState(false);
  const { availableTimesSelected } = useContext(HomePageContext);

  const userData = useSelector((state) => state.user.userData);

  const sparkLuminsCost = spark.luminsPrice;
  const userLumins = userData.userLumins;

  const unlockLumins = () => {
    setLockPoints(true);
  };

  const navigateToConfirmSendRequestPage = () => {
    if (!spark.chosenTime) {
      navigation.navigate("ConfirmSendRequestPage", {
        spark,
        availableTimesSelected,
      });
    } else {
      const date = new Date(spark.chosenTime);
      const formattedDate = format(date, "MMM do");
      const formattedTime = format(date, "h:mm a");
      const formattedDateObj = [
        { date: formattedDate, id: 0, time: formattedTime },
      ];
      navigation.navigate("ConfirmSendRequestPage", {
        spark,
        availableTimesSelected: formattedDateObj,
      });
    }
  };

  if (userLumins < sparkLuminsCost) {
    return (
      <Container>
        <NotEnoughLuminsView>
          <LuminsImage source={LuminsLogo} resizeMode={"contain"} />
          <CostOfLuminsText>{sparkLuminsCost}</CostOfLuminsText>
        </NotEnoughLuminsView>
        <LockedRequestView>
          <ActiveRequestText>Request</ActiveRequestText>
        </LockedRequestView>
      </Container>
    );
  } else if (!lockPoints) {
    return (
      <Container>
        <LockedLuminsButton onPress={unlockLumins}>
          <LuminsImage source={LuminsLogo} resizeMode={"contain"} />
          <CostOfLuminsText>{sparkLuminsCost}</CostOfLuminsText>
        </LockedLuminsButton>
        <LockedRequestView>
          <ActiveRequestText>Request</ActiveRequestText>
        </LockedRequestView>
      </Container>
    );
  } else {
    return (
      <Container>
        <ActivateLuminsButton>
          <LuminsImage source={LuminsLogo} resizeMode={"contain"} />
          <CostOfLuminsText>{sparkLuminsCost}</CostOfLuminsText>
        </ActivateLuminsButton>
        <ActiveRequestButton onPress={navigateToConfirmSendRequestPage}>
          <ActiveRequestText>Request</ActiveRequestText>
        </ActiveRequestButton>
      </Container>
    );
  }
};

const Container = styled(View)`
  width: 90%;
  flex-direction: row;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: space-between;
  align-self: center;
`;

const NotEnoughLuminsView = styled(View)`
  width: 132px;
  height: 56px;
  background-color: red;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
`;

const LockedLuminsButton = styled(TouchableOpacity)`
  width: 132px;
  height: 56px;
  background-color: gray;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
`;

const ActivateLuminsButton = styled(TouchableOpacity)`
  width: 132px;
  height: 56px;
  background-color: #93e4b6;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 20px;
`;

const LuminsImage = styled(Image)`
  width: 25px;
  height: 33px;
`;

const CostOfLuminsText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: white;
`;

const ActiveRequestButton = styled(TouchableOpacity)`
  width: 200px;
  height: 56px;
  background-color: #527e65;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const ActiveRequestText = styled(Text)`
  font-size: 20px;
  font-family: poppins-600;
  color: white;
`;

const LockedRequestView = styled(View)`
  width: 200px;
  height: 56px;
  background-color: gray;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;
