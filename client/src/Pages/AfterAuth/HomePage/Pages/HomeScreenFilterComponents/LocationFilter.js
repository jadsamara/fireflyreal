import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { MaterialIcons, Ionicons } from "@expo/vector-icons";

import { HomePageContext } from "../../../../../Context/HomePageContext";

export const LocationFilter = ({ setScrollEnabled }) => {
  const { filters, setFilters } = useContext(HomePageContext);

  const initialLocationObj = filters.find((p) => p.maxDistance) || {};
  const initialLocation = initialLocationObj?.maxDistance || 150;

  const isEnabled = initialLocationObj.isEnabled;

  const [locationVal, setLocationVal] = useState(initialLocation);

  const disableScroll = () => {
    setScrollEnabled(false);
  };

  const enableScroll = () => {
    setScrollEnabled(true);
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.maxDistance !== undefined
          ? { ...filter, maxDistance: locationVal }
          : filter
      )
    );
  };

  const enableOrDisableFilter = () => {
    setFilters((prevFilters) =>
      prevFilters.map((filter) =>
        filter.maxDistance !== undefined
          ? { ...filter, isEnabled: !filter.isEnabled }
          : filter
      )
    );
  };

  const setLocationFilterLocally = (val) => {
    setLocationVal(val);
  };

  return (
    <Container>
      <SubtitleText>Location</SubtitleText>
      <SubtitleTextTwo>Maximum Distance in km</SubtitleTextTwo>

      <SliderContainer>
        <MaterialIcons
          name="location-on"
          size={28}
          color="#686868"
          style={{ marginRight: 30 }}
        />
        <MultiSlider
          values={[locationVal]}
          min={30}
          max={300}
          step={10}
          onValuesChange={(values) => setLocationFilterLocally(values[0])}
          onValuesChangeStart={disableScroll}
          onValuesChangeFinish={enableScroll}
          customMarker={(e) => (
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
  width: 50px;
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
