import { View, Image, Text } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";

import { MapComponent } from "./BrowsePageComponents/MapComponent";

export const BrowsePage = () => {
  const [city, setCity] = useState("");

  return (
    <Container>
      <CityContainer
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // For Android
        }}
      >
        <CityText>{city}</CityText>
      </CityContainer>
      <MapComponent city={city} setCity={setCity} />
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
`;

const CityContainer = styled(View)`
  background-color: white;
  height: 40px;
  position: absolute;
  z-index: 9999;
  align-self: center;
  top: 50px;
  align-items: center;
  justify-content: center;
  border-radius: 100px;
  padding-left: 20px;
  padding-right: 20px;
`;

const CityText = styled(Text)`
  color: black;
  font-size: 16px;
  font-family: poppins-800;
`;
