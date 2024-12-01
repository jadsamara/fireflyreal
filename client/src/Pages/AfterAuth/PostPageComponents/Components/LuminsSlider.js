import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";
import MultiSlider from "@ptomasroos/react-native-multi-slider";

import LuminsLogo from "../../../../Assets/luminslogo.png";

export const LuminsSlider = ({
  maxLumins,
  setLocalLuminsPrice,
  localLuminsPrice,
}) => {
  const roundedMaxLumins = Math.floor(maxLumins / 5) * 5;

  if (maxLumins < 10) {
    return (
      <SliderContainer>
        <NotEnoughText>You do not have enough lumins (points)!</NotEnoughText>
      </SliderContainer>
    );
  } else if (roundedMaxLumins <= 5 || localLuminsPrice <= 5) {
    return <SliderContainer></SliderContainer>;
  } else if (roundedMaxLumins !== 10 || localLuminsPrice !== 10) {
    return (
      <SliderContainer>
        <Col>
          <LuminsImageContainer>
            <LuminsImage
              source={LuminsLogo}
              resizeMode={"contain"}
              style={{ tintColor: "#527e65" }}
            />
          </LuminsImageContainer>

          <LuminsImageSubtext>10</LuminsImageSubtext>
        </Col>

        <MultiSlider
          values={[localLuminsPrice]}
          min={10}
          max={roundedMaxLumins}
          step={5}
          onValuesChange={(values) => setLocalLuminsPrice(values[0])} // Update local state only
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
          sliderLength={240} // Increase length slightly to ensure it covers full range
        />

        <Col>
          <LuminsImageContainer>
            <LuminsImage
              source={LuminsLogo}
              resizeMode={"contain"}
              style={{ tintColor: "#527e65" }}
            />
          </LuminsImageContainer>

          <LuminsImageSubtext>{roundedMaxLumins}</LuminsImageSubtext>
        </Col>
      </SliderContainer>
    );
  }
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

const Col = styled(View)`
  justify-content: center;
  align-items: center;
`;

const LuminsImageContainer = styled(View)`
  width: 20px;
  height: 25px;
`;

const LuminsImage = styled(Image)`
  height: 100%;
  width: 100%;
`;

const LuminsImageSubtext = styled(Text)`
  font-size: 12px;
  font-family: poppins-600;
  color: green;
`;

const NotEnoughText = styled(Text)`
  font-size: 18px;
  font-family: poppins-800;
  color: red;
  width: 90%;
  text-align: center;
`;
