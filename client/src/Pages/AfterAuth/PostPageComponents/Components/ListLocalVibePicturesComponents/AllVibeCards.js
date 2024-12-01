import React, { useState } from "react";
import { View, Text } from "react-native";

import styled from "styled-components";

import { SafeArea } from "../../../../../Components/GlobalComponents/SafeArea";

import { VibeListStatic } from "./VibeListStatic";

import { SearchBarComponent } from "./SearchBarComponent";

import { BackArrow } from "../../../../../Components/PreAuthentication/BackArrow";

export const AllVibeCards = ({ navigation, route }) => {
  const { images } = route.params;
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />
      <Container>
        <Title>Choose a pic to go with your Spark</Title>

        <ListContainer>
          <VibeListStatic navigation={navigation} images={images} />
        </ListContainer>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  width: 95%;
  height: 100%;
  align-self: center;
  padding: 2px;
  margin-top: 10px;
`;

const Title = styled(Text)`
  font-size: 28px;
  font-family: poppins-600;
  text-align: center;
  margin-top: 5px;
`;

const ListContainer = styled(View)`
  width: 100%;
  height: 80%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
