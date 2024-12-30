import React, { useState } from "react";
import { View, Text } from "react-native";
import styled from "styled-components/native";
import { SafeArea } from "../../../Components/GlobalComponents/";

import { BackArrow } from "../../../Components/PreAuthentication";

import { IDTab } from "../Components/IDTab";

export const ChooseIdPage = ({ navigation }) => {
  const idTypesArray = [
    {
      title: "ID Card",
      type: "general",
      subtitle: "Government-issued personal ID",
      icon: "drivers-license",
    },
    {
      title: "Drivers License",
      type: "dl",
      subtitle: "Government-issued Drivers license",
      icon: "car",
    },
    {
      title: "Passport",
      type: "p",
      subtitle: "Your official travel document",
      icon: "passport",
    },
    {
      title: "Voter ID",
      type: "v",
      subtitle: "Government-issued Voter ID",
      icon: "id-card-clip",
    },
  ];

  return (
    <SafeArea style={{ backgroundColor: "rgb(245, 245, 245)" }}>
      <BackArrow navigation={navigation} />
      <Title>Upload ID</Title>
      <HeaderOneText>
        Choose the document type you would like to identify with
      </HeaderOneText>

      <Container>
        {idTypesArray.map((res) => {
          return <IDTab res={res} key={res.type} navigation={navigation} />;
        })}
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  align-items: center;
  margin-top: 20px;
`;

const Title = styled(Text)`
  font-size: 34px;
  color: black;
  font-family: poppins-700;
  text-align: center;
  margin-top: 20px;
`;

const HeaderOneText = styled(Text)`
  font-size: 18px;
  color: #686868;
  font-family: poppins-500;
  margin-top: 12px;
  text-align: center;
  width: 90%;
  align-self: center;
`;
