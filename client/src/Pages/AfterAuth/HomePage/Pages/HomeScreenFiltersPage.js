import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";

import { SafeArea } from "../../../../Components/GlobalComponents";

import { AntDesign } from "@expo/vector-icons";
import { PointsComponent } from "../Components/PointsComponent";

import { ActiveFilters } from "./HomeScreenFilterComponents/ActiveFilters";
import { useSelector } from "react-redux";
import { LocationFilter } from "./HomeScreenFilterComponents/LocationFilter";

import { database } from "../../../../Config/firebase";
import { doc, updateDoc } from "firebase/firestore";

import { HomePageContext } from "../../../../Context/HomePageContext";
import { PeopleFilter } from "./HomeScreenFilterComponents/PeopleFilter";
import { CalendarFilter } from "./HomeScreenFilterComponents/CalendarFilter";

export const HomeScreenFiltersPage = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);
  const [scrollEnabled, setScrollEnabled] = useState(true);

  const { filters } = useContext(HomePageContext);

  useEffect(() => {
    const saveFiltersToDatabase = async () => {
      const userDocRef = doc(database, "Users", userData.userNumber);

      try {
        await updateDoc(userDocRef, {
          filters,
        });
      } catch (error) {
        console.error("Error updating filters:", error);
      }
    };

    // Return the cleanup function that saves filters when the component unmounts
    return async () => {
      await saveFiltersToDatabase();
    };
  }, [filters]); // Dependencies ensure it always has the latest values

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeArea>
      <HeaderContainer>
        <HeaderText>Welcome back, {userData.name}.</HeaderText>

        <PointsComponent />
      </HeaderContainer>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled={scrollEnabled}
      >
        <Container>
          <Heading>
            <CloseButton onPress={goBack}>
              <AntDesign name="close" size={24} color="black" />
            </CloseButton>
            <FiltersTitle>Filters</FiltersTitle>
          </Heading>
          <ActiveFilters />
          <LocationFilter setScrollEnabled={setScrollEnabled} />
          <PeopleFilter setScrollEnabled={setScrollEnabled} />
          <CalendarFilter />
          {/* <LocationFilters /> */}
          {/* <WhenFilter /> */}
          {/* <PeopleFilters /> */}
        </Container>
      </ScrollView>
    </SafeArea>
  );
};

const HeaderContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: ${(props) => props.theme.space.large};
  padding-right: ${(props) => props.theme.space.large};
`;

const HeaderText = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.header};
  font-family: poppins-500;
`;

const Container = styled(View)`
  flex: 1;
  padding: 20px;
`;

const Heading = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center; /* Center the child components horizontally */
  padding: 10px;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  left: 10px;
`;

const FiltersTitle = styled(Text)`
  font-size: ${(props) => props.theme.fontSizes.h5};
  font-family: poppins-500;
  text-align: center;
`;
