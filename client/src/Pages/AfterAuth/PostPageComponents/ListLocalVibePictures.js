import React, { useState } from "react";
import { View, Text } from "react-native";

import styled from "styled-components";
import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";

import {
  SearchBarComponent,
  VibeList,
} from "./Components/ListLocalVibePicturesComponents/";

export const ListLocalVibePictures = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <SafeArea>
      <Container>
        <Title>What's the vibe?</Title>
        <SearchBarComponent
          setSearchKeyword={setSearchKeyword}
          searchKeyword={searchKeyword}
          placeholder="Search and filter a particular vibe"
        />

        <ListContainer>
          <VibeList navigation={navigation} />
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
`;

const Title = styled(Text)`
  margin-top: 12px;
  margin-bottom: 12px;
  font-size: 30px;
  font-family: poppins-600;
  text-align: center;
`;

const ListContainer = styled(View)`
  width: 100%;
  height: 80%;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
