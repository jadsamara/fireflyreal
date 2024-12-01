import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { HomePageContext } from "../../../../../Context/HomePageContext";

export const PeopleFilter = ({ setScrollEnabled }) => {
  const { filters, setFilters } = useContext(HomePageContext);

  const initialMaxObj = filters.find((p) => p.maxPeople) || {};
  const initialMax = initialMaxObj?.maxPeople || 12;

  const initialMinObj = filters.find((p) => p.minPeople) || {};
  const initialMin = initialMinObj?.minPeople || 2;

  const isEnabledMin = initialMinObj.isEnabled;
  const isEnabledMax = initialMaxObj.isEnabled;

  const isEnabled = isEnabledMax && isEnabledMin;
  const [maxPeople, setMaxPeople] = useState(initialMax);
  const [minPeople, setMinPeople] = useState(initialMin);

  const disableScroll = () => {
    setScrollEnabled(false);
  };

  const enableScroll = () => {
    setScrollEnabled(true);
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.maxPeople !== undefined) {
          return { ...filter, maxPeople };
        }
        if (filter.minPeople !== undefined) {
          return { ...filter, minPeople };
        }
        return filter;
      })
    );
  };

  const enableOrDisableFilter = () => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) => {
        if (filter.maxPeople !== undefined || filter.minPeople !== undefined) {
          return { ...filter, isEnabled: !filter.isEnabled };
        }
        return filter;
      })
    );
  };

  const setLocationFilterLocally = (val) => {
    setMinPeople(val[0]);
    setMaxPeople(val[1]);
  };

  return (
    <Container>
      <SubtitleText>People</SubtitleText>
      <SubtitleTextTwo>Min and Max people</SubtitleTextTwo>

      <SliderContainer>
        <MaterialIcons
          name="people"
          size={28}
          color="#686868"
          style={{ marginRight: 30 }}
        />
        <MultiSlider
          values={[minPeople, maxPeople]} // Handle both min and max
          min={2}
          max={12}
          step={1}
          isMarkersSeparated={true}
          onValuesChange={(values) => setLocationFilterLocally(values)}
          onValuesChangeStart={disableScroll}
          onValuesChangeFinish={enableScroll}
          customMarkerLeft={(e) => (
            <AnimatedMarkerContainer>
              <MarkerText>{Math.round(e.currentValue)}</MarkerText>
            </AnimatedMarkerContainer>
          )}
          customMarkerRight={(e) => (
            <AnimatedMarkerContainer>
              <MarkerText>{Math.round(e.currentValue)}</MarkerText>
            </AnimatedMarkerContainer>
          )}
          selectedStyle={{
            backgroundColor: "#79EA96",
          }}
          unselectedStyle={{
            backgroundColor: "gray",
          }}
          containerStyle={{}}
          trackStyle={{
            height: 5,
          }}
          sliderLength={180}
        />
        <CheckboxButton onPress={enableOrDisableFilter}>
          {isEnabled ? (
            <Ionicons name="checkmark-circle" size={32} color="#79EA96" />
          ) : (
            <Ionicons name="checkmark-circle" size={32} color="gray" />
          )}
        </CheckboxButton>
      </SliderContainer>
    </Container>
  );
};

const Container = styled(View)`
  margin-top: 40px;
`;

const SubtitleText = styled(Text)`
  font-size: 18px;
  font-family: poppins-500;
`;

const SubtitleTextTwo = styled(Text)`
  font-size: 12px;
  font-family: poppins-400;
  margin-left: 10px;
  margin-top: 10px;
`;

const SliderContainer = styled(View)`
  width: 100%;
  flex-direction: row;
  margin-left: 5px;
  margin-top: 10px;
  align-items: center;
`;

const AnimatedMarkerContainer = styled(View)`
  background-color: lightgray;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 30px;
  width: 30px;
  border-radius: 10px;
`;

const MarkerText = styled(Text)`
  font-size: 11px;
  font-family: poppins-800;
  color: #527e65;
`;

const CheckboxButton = styled(TouchableOpacity)`
  margin-left: 30px;
`;
