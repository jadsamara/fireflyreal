import { View, Text } from "react-native";
import React, { useState, useEffect } from "react";

import styled from "styled-components";
import { SafeArea } from "../../Components/GlobalComponents";

import { PointsComponent } from "./HomePage/Components/PointsComponent";
import { SortComponent } from "./ListingPageComponents/SortComponent";

import { SparkCardsList } from "./ListingPageComponents/SparkCardsList";
import { LoadingComponent } from "../../Components/GlobalComponents/LoadingComponent";
export const ListingPage = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading process (e.g., API call or app initialization)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  return (
    <SafeArea>
      {isLoading ? <LoadingComponent /> : null}

      <Container>
        <Header>
          <Title>My Sparks</Title>
          <PointsComponent />
        </Header>
        <SortComponent />

        <SparkCardsList navigation={navigation} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
  padding: 10px;
`;

const Header = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 90%;
  align-self: center;
`;

const Title = styled(Text)`
  font-size: 30px;
  font-family: poppins-600;
  margin-left: 16px;
`;
