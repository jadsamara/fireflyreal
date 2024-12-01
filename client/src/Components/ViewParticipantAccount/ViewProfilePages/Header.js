import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";

import styled from "styled-components";

import { BackArrow } from "../../PreAuthentication/BackArrow";

import { AntDesign } from "@expo/vector-icons";

import { calculateAge } from "../../../Functions/GetAgeNew";
import FastImage from "react-native-fast-image";

export const Header = ({ navigation, participant = {} }) => {
  const {
    profilePicture = "",
    name = "Jad",
    age = 20,
    gender = "Male",
  } = participant;

  const newAge = calculateAge(age);

  let genderLetter = "";

  if (gender === "female") {
    genderLetter = "F";
  }

  if (gender === "male") {
    genderLetter = "M";
  }

  useEffect(() => {
    if (profilePicture) {
      FastImage.preload([{ uri: profilePicture }]);
    }
  }, [profilePicture]);

  return (
    <HeaderContainer>
      <BackArrow navigation={navigation} color="white" />
      <ProfilePictureContainer>
        <ProfilePictureImage
          source={{
            uri: profilePicture,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </ProfilePictureContainer>
      <HeaderCol>
        <RowOne>
          <NameText>{name},</NameText>
          <AgeText>{newAge}</AgeText>
          <GenderLetter>{genderLetter}</GenderLetter>
        </RowOne>
        <RowTwo>
          <AntDesign name="star" size={20} color="white" />
          <RatingsText>
            {parseFloat(participant.averageUserRating).toFixed(1)}
          </RatingsText>
          <AmountOfSparksText>
            ({participant.pastSparks.length} sparks)
          </AmountOfSparksText>
        </RowTwo>
      </HeaderCol>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(View)`
  height: 15%;
  width: 100%;
  background-color: #6a0708;
  flex-direction: row;
  align-items: center;
`;

const ProfilePictureContainer = styled(View)`
  height: 50px;
  width: 50px;
  margin-left: 30px;
  margin-top: 20px;
`;

const ProfilePictureImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

const HeaderCol = styled(View)`
  margin-left: 30px;
  margin-top: 20px;
`;

const RowOne = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const NameText = styled(Text)`
  font-size: 20px;
  color: white;
  font-family: poppins-600;
`;

const AgeText = styled(Text)`
  font-size: 20px;
  color: white;
  font-family: poppins-600;
  margin-left: 10px;
`;

const GenderLetter = styled(Text)`
  font-size: 16px;
  color: white;
  font-family: poppins-400;
  margin-left: 5px;
  margin-top: 5px;
`;

const RowTwo = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const RatingsText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-500;
  margin-left: 10px;
`;

const AmountOfSparksText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-500;
  margin-left: 10px;
`;
