import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { SafeArea } from "../../../Components/GlobalComponents";

import styled from "styled-components";

import { TagsComponent } from "./Components/TagsComponent";
import { DescriptionComponent } from "./Components/DescriptionComponent";

import { AntDesign } from "@expo/vector-icons";
import { PostDateContext } from "../../../Context/PostPagesContext";

import { BackArrow } from "../../../Components/PreAuthentication/BackArrow";

export const PostSparkFive = ({ navigation }) => {
  const { sparkDescription, tags } = useContext(PostDateContext);

  const nextPage = () => {
    if (sparkDescription && tags.length > 0) {
      navigation.navigate("PostSparkSix");
    } else {
      Alert.alert("Fill out missing fields.");
    }
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />
      <Container>
        <HeaderText>Almost There!</HeaderText>
        <TagsComponent navigation={navigation} />

        <DescriptionComponent />
        <NextPageButton onPress={nextPage}>
          <AntDesign name="arrowright" size={34} color="white" />
        </NextPageButton>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  background-color: #fff;
  padding: 20px;
  position: relative;
`;

const HeaderText = styled(Text)`
  font-size: 34px;
  font-family: poppins-700;
  text-align: center;
`;

const NextPageButton = styled(TouchableOpacity)`
  height: 55px;
  width: 55px;
  position: absolute;
  bottom: 50px;
  right: 20px;
  background-color: green;
  border-radius: 1000px;
  justify-content: center;
  align-items: center;
`;
