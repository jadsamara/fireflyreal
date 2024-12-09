import { View, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";

import { database } from "../../Config/firebase";
import { collection, getDocs } from "firebase/firestore";

import { MapComponent } from "./BrowsePageComponents/MapComponent";

export const BrowsePage = () => {
  return (
    <Container>
      <MapComponent />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
`;

const ProfilePicture = styled(Image)`
  height: 45px;
  width: 45px;
  border-radius: 10000px;
  border-width: 2px;
  border-color: green;
`;

const SparkImageContainer = styled(View)`
  width: 250px;
  height: 120px;
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
  padding-top: 2px;
  padding-bottom: 2px;
  border-radius: 10px;
`;

const SparkScheduledText = styled(Text)`
  color: white;
  font-size: 7px;
  font-family: poppins-800;
`;

const SparkScheduledDateDays = styled(View)`
  background-color: #79d17c;
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
  font-size: 7px;
  margin-left: 5px;
  font-family: poppins-800;
`;

const SparkTitle = styled(Text)`
  color: white;
  font-size: 18px;
  font-family: poppins-800;
  position: absolute;
  z-index: 999;
  bottom: 10px;
  left: 15px;
`;

const FooterContainer = styled(View)`
  width: 100%;
  height: 60px;
`;

const ProfilePictureHost = styled(Image)`
  width: 40px;
  height: 40px;
  border-radius: 100px;
  position: absolute;
  left: 0px;
  top: 5px;
`;
