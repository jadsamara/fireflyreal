import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert, Image } from "react-native";
import { SafeArea } from "../../../Components/GlobalComponents";

import styled from "styled-components";

import { AntDesign, FontAwesome } from "@expo/vector-icons";

import { PostDateContext } from "../../../Context/PostPagesContext";
import { TotalNumberOfParticipantsSlider } from "./Components/TotalNumberOfParticipantsSlider";

import { BackArrow } from "../../../Components/PreAuthentication/BackArrow";

import LuminsLogo from "../../../Assets/luminslogo.png";
import { AuthContext } from "../../../Config/AuthContext";
import { LuminsSlider } from "./Components/LuminsSlider";
import { useSelector } from "react-redux";

export const PostSparkThree = ({ navigation }) => {
  const {
    setLuminsPrice,
    setTotalNumberOfParticipants,
    totalNumberOfParticipants,
    luminsPrice,
  } = useContext(PostDateContext);
  const userData = useSelector((state) => state.user.userData);

  const [luminsMsgbox, setLuminsMsgbox] = useState(false);
  const [localLuminsPrice, setLocalLuminsPrice] = useState(luminsPrice);
  const [localNumberOfParticipants, setLocalNumberOfParticipants] = useState(
    totalNumberOfParticipants
  );

  const nextPage = () => {
    setLuminsPrice(localLuminsPrice);
    setTotalNumberOfParticipants(localNumberOfParticipants);
    navigation.navigate("PostSparkFour");
  };

  const onHandleDisplayMessageBox = () => {
    setLuminsMsgbox((res) => !res);
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />
      <Container>
        <AmountOfPeopleContainer>
          <HeaderText>How many people?</HeaderText>
          <TotalNumberOfParticipantsSlider
            setLocalNumberOfParticipants={setLocalNumberOfParticipants}
            localNumberOfParticipants={localNumberOfParticipants}
          />
        </AmountOfPeopleContainer>

        <LuminSectionContainer>
          {luminsMsgbox ? (
            <MessageBoxContainer>
              <CloseMessageBoxButton onPress={onHandleDisplayMessageBox}>
                <CloseText>X</CloseText>
              </CloseMessageBoxButton>
              <MessageBoxText>
                To create a spark, you need to deposit a fixed number of lumins
                based on the number of people. These lumins will be refunded to
                you after the spark has ended.
              </MessageBoxText>
            </MessageBoxContainer>
          ) : null}
          <LuminsSectionHeaderContainer>
            <HeaderText>Lumin Deposit</HeaderText>
            <QuestionMarkButton onPress={onHandleDisplayMessageBox}>
              <FontAwesome name="question-circle" size={28} color="#909090" />
            </QuestionMarkButton>
          </LuminsSectionHeaderContainer>

          <LuminsSlider
            maxLumins={userData.userLumins}
            setLocalLuminsPrice={setLocalLuminsPrice}
            localLuminsPrice={localLuminsPrice}
          />

          <RemainingLuminsContainer>
            <RemainingLuminsText>
              You have {userData.userLumins}
            </RemainingLuminsText>
            <RemainingLuminsImageContainer>
              <RemainingLuminsImage
                source={LuminsLogo}
                resizeMode={"contain"}
                // style={{ tintColor: "#527e65" }}
                style={
                  userData.userLumins >= 10
                    ? { tintColor: "#527e65" }
                    : { tintColor: "red" }
                }
              />
            </RemainingLuminsImageContainer>
          </RemainingLuminsContainer>
        </LuminSectionContainer>
        <NextPageButton
          onPress={nextPage}
          backgroundColor={userData.userLumins >= 10 ? "green" : "gray"}
          disabled={userData.userLumins < 10}
        >
          <AntDesign name="arrowright" size={34} color="white" />
        </NextPageButton>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  background-color: #fff;
  padding: 15px;
  position: relative;
  flex: 1;
`;

const AmountOfPeopleContainer = styled(View)`
  margin-top: 10px;
`;

const HeaderText = styled(Text)`
  font-size: 28px;
  font-family: poppins-700;
  text-align: center;
`;

const NextPageButton = styled(TouchableOpacity)`
  height: 55px;
  width: 55px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  border-radius: 1000px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 40px;
  right: 30px;
`;

const LuminSectionContainer = styled(View)`
  margin-top: 100px;
  align-items: center;
`;

const LuminsSectionHeaderContainer = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const QuestionMarkButton = styled(TouchableOpacity)`
  margin-left: 20px;
`;

const MessageBoxContainer = styled(View)`
  width: 90%;
  height: 200px;
  background-color: #b1b1b1;
  padding: 20px;
  border-radius: 20px;
  position: absolute;
  top: 60px;
  align-self: center;
  z-index: 9999999;
  align-items: center;
  justify-content: center;
`;

const MessageBoxText = styled(Text)`
  font-size: 12px;
  font-family: poppins-600;
  color: white;
  text-align: center;
`;

const CloseMessageBoxButton = styled(TouchableOpacity)`
  position: absolute;
  right: 15px;
  top: 8px;
  padding: 4px;
`;

const CloseText = styled(Text)`
  color: white;
  font-size: 16px;
  font-family: poppins-600;
`;

const RemainingLuminsContainer = styled(View)`
  flex-direction: row;
  width: 100%;
  margin-top: 60px;
  align-items: center;
  justify-content: center;
`;

const RemainingLuminsText = styled(Text)`
  font-size: 20px;
  font-family: poppins-600;
  color: black;
`;

const RemainingLuminsImageContainer = styled(View)`
  width: 25px;
  height: 30px;
  margin-left: 5px;
`;

const RemainingLuminsImage = styled(Image)`
  height: 100%;
  width: 100%;
`;
