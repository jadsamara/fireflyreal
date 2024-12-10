import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

import styled from "styled-components";
import { calculateAge } from "../../../Functions/GetAgeNew";

import { AntDesign } from "@expo/vector-icons";

import LuminsLogo from "../../../Assets/luminslogo.png";
import VerifiedLogo from "../../../Assets/verified.png";
import VerifiedGreyLogo from "../../../Assets/verified-grey.png";

import FastImage from "react-native-fast-image";
import { useSelector } from "react-redux";

export const HeaderComponent = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);

  useEffect(() => {
    FastImage.preload([{ uri: userData.profilePicture }]);
  }, [userData.profilePicture]);

  const onHandleNavigateToProfile = () => {
    navigation.navigate("ViewParticipantAccountPage", {
      participant: userData,
    });
  };

  return (
    <Container>
      <RowOne>
        <ProfilePictureContainer>
          <ProfilePicture
            resizeMode={FastImage.resizeMode.cover}
            source={{
              uri: userData.profilePicture,
            }}
          />
          {userData.isVerified === 1 ? (
            <VerifiedImage
              resizeMode={FastImage.resizeMode.cover}
              source={VerifiedGreyLogo}
            />
          ) : (
            <VerifiedImage
              resizeMode={FastImage.resizeMode.cover}
              source={VerifiedLogo}
            />
          )}
        </ProfilePictureContainer>

        <ColOne>
          <NameText>
            {userData.name}, {calculateAge(userData.age) || 0}
          </NameText>
          <HomeTownText>{userData.homeTown}</HomeTownText>
          <BottomLabelContainer>
            <AntDesign name="star" size={18} color="#93E4B6" />
            <RatingLabel>
              {parseFloat(userData.averageUserRating).toFixed(0)}
            </RatingLabel>
          </BottomLabelContainer>
          <BottomLabelContainer>
            <TotalSparksText>
              {userData.pastSparks.length} Sparks
            </TotalSparksText>
          </BottomLabelContainer>
          {/* <LuminsLabel>
            <LuminLogo
              source={LuminsLogo}
              resizeMode={"contain"}
              style={{ tintColor: "#fff" }}
            />
            <LuminsLabelText>Lumins</LuminsLabelText>
          </LuminsLabel> */}
        </ColOne>
      </RowOne>
      <ViewProfileButton
        onPress={onHandleNavigateToProfile}
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <ViewProfileButtonText>View Profile</ViewProfileButtonText>
      </ViewProfileButton>
      <Subtitle>Hold to drag and rearrange</Subtitle>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 30px;
`;

const RowOne = styled(View)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
`;

const ProfilePictureContainer = styled(View)`
  margin-right: 5px;
  position: relative;
`;

const ProfilePicture = styled(FastImage)`
  height: 120px;
  width: 120px;
  border-radius: 1130px;
`;

const VerifiedImage = styled(Image)`
  height: 30px;
  width: 30px;
  position: absolute;
  z-index: 99999;
  bottom: 5px;
  right: 5px;
`;

const ColOne = styled(View)`
  align-items: flex-start;
  margin-top: 5px;
  margin-left: 50px;
`;

const NameText = styled(Text)`
  color: black;
  font-family: "poppins-600";
  font-size: 20px;
`;

const HomeTownText = styled(Text)`
  color: black;
  font-family: "poppins-400";
  font-size: 14px;
  margin-top: 3px;
`;

const BottomLabelContainer = styled(View)`
  flex-direction: row;
  align-items: flex-start;
  align-self: flex-start;
  justify-content: center;
  margin-top: 3px;
`;

const RatingLabel = styled(Text)`
  margin-left: 5px;
  font-family: poppins-400;
  font-size: 16px;
`;

const TotalSparksText = styled(Text)`
  font-size: 14px;
  font-family: poppins-600;
  color: #79d17c;
`;

const LuminsLabel = styled(TouchableOpacity)`
  background-color: #f5e065;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 5px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

const LuminLogo = styled(Image)`
  height: 20px;
  width: 16px;
`;

const LuminsLabelText = styled(Text)`
  font-size: 10px;
  font-family: poppins-600;
  color: white;
  margin-left: 4px;
`;

const ViewProfileButton = styled(TouchableOpacity)`
  align-self: center;
  background-color: #79d17c;
  margin-top: 30px;
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-radius: 20px;
`;

const ViewProfileButtonText = styled(Text)`
  font-size: 10px;
  font-family: poppins-400;
  color: white;
`;

const Subtitle = styled(Text)`
  font-size: 12px;
  font-family: poppins-300;
  color: black;
  text-align: center;
  margin-top: 30px;
`;
