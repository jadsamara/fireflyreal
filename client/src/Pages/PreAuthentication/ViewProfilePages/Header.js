import { View, Text } from "react-native";
import React, { useContext, useEffect } from "react";

import styled from "styled-components";
import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";

import { BackArrow } from "../../../Components/PreAuthentication";

import { calculateAge } from "../../../Functions/GetAgeNew";
import { AntDesign } from "@expo/vector-icons";
import FastImage from "react-native-fast-image";

export const Header = ({ navigation }) => {
  const { profilePicture, name, age, gender } = useContext(
    AuthenticationStackContext
  );

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
          resizeMode={FastImage.resizeMode.cover}
          source={{
            uri: profilePicture,
          }}
        />
      </ProfilePictureContainer>
      <HeaderCol>
        <RowOne>
          <NameText>{name}</NameText>
          <GenderLetter>{genderLetter}</GenderLetter>
        </RowOne>
        <RowTwo>
          <AntDesign name="star" size={20} color="white" />
          <RatingsText>0</RatingsText>
          <AmountOfSparksText>(0 Sparks)</AmountOfSparksText>
        </RowTwo>
      </HeaderCol>
    </HeaderContainer>
  );
};

const HeaderContainer = styled(View)`
  height: 16%;
  width: 100%;
  background-color: #527e65;
  flex-direction: row;
  align-items: center;
`;

const ProfilePictureContainer = styled(View)`
  height: 65px;
  width: 65px;
  margin-left: 30px;
  margin-top: 40px;
`;

const ProfilePictureImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;

const HeaderCol = styled(View)`
  margin-left: 20px;
  margin-top: 35px;
`;

const RowOne = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const NameText = styled(Text)`
  font-size: 24px;
  color: white;
  font-family: poppins-600;
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
  align-items: flex-end;
  margin-top: 5px;
`;

const RatingsText = styled(Text)`
  font-size: 14px;
  color: white;
  font-family: poppins-500;
  margin-left: 5px;
`;

const AmountOfSparksText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-500;
  margin-left: 10px;
`;
