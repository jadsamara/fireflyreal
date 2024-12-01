import React from "react";
import { View, Text } from "react-native";
import styled from "styled-components";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import { MaterialIcons } from "@expo/vector-icons";

export const TotalNumberOfParticipantsSlider = ({
  setLocalNumberOfParticipants,
  localNumberOfParticipants,
}) => {
  return (
    <SliderContainer>
      <MaterialIcons name="people" size={28} color="#527E65" />
      <MultiSlider
        values={[localNumberOfParticipants]}
        min={1}
        max={11}
        step={1}
        onValuesChange={(values) => setLocalNumberOfParticipants(values[0])}
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
        containerStyle={{
          alignSelf: "center",
        }}
        trackStyle={{
          height: 8,
        }}
        sliderLength={240}
      />
      <MaterialIcons name="groups" size={28} color="#527E65" />
    </SliderContainer>
  );
};

const SliderContainer = styled(View)`
  width: 100%;
  margin-top: 60px;
  align-items: center;
  justify-content: space-around;
  flex-direction: row;
`;

const AnimatedMarkerContainer = styled(View)`
  background-color: #cccccc;
  flex-direction: row;
  align-items: center;
  padding: 5px 10px;
  border-radius: 10px;
`;

const MarkerText = styled(Text)`
  font-size: 14px;
  font-family: poppins-800;
  color: #527e65;
`;
