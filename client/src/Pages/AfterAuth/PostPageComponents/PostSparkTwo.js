import React, { useContext, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components";

import { SafeArea } from "../../../Components/GlobalComponents";

import { CalendarSectionComponent } from "./Components/CalendarComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { PostDateContext } from "../../../Context/PostPagesContext";
import { BackArrow } from "../../../Components/PreAuthentication/BackArrow";

export const PostSparkTwo = ({ navigation }) => {
  const { selectedDateOnCalendar } = useContext(PostDateContext);

  const nextPage = () => {
    const numberOfProperties = Object.keys(selectedDateOnCalendar).length;
    const allHaveTimeProperty = Object.values(selectedDateOnCalendar).every(
      (dateObject) => dateObject && dateObject.time !== undefined
    );

    if (allHaveTimeProperty && numberOfProperties) {
      navigation.navigate("PostSparkThree");
    } else {
      Alert.alert("Fill out missing fields.");
    }
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />
      <Container>
        <ScrollView
          nestedScrollEnabled={true}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false} // Hide the vertical scrollbar
        >
          <HeaderText>Choose a date</HeaderText>
          <CalendarSectionComponent />
          <NextPageButton onPress={nextPage}>
            <MaterialCommunityIcons
              name="arrow-right-thick"
              size={34}
              color="white"
            />
          </NextPageButton>
        </ScrollView>
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
  font-size: 32px;
  font-family: poppins-700;
  text-align: center;
`;

const NextPageButton = styled(TouchableOpacity)`
  height: 55px;
  width: 55px;
  position: absolute;
  bottom: 20px;
  right: 20px;
  background-color: #527e65;
  border-radius: 1000px;
  justify-content: center;
  align-items: center;
`;
