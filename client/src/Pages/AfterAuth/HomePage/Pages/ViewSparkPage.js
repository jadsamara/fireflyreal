import { View, Text, ScrollView } from "react-native";
import React from "react";
import { SafeArea } from "../../../../Components/GlobalComponents/";

import styled from "styled-components";

import {
  HeaderComponent,
  BodyComponent,
  FooterComponent,
  CalendarSectionComponent,
  ParticipantsComponent,
} from "./ViewSparkPageComponents.js";

export const ViewSparkPage = ({ route, navigation }) => {
  const { sparkData } = route.params;

  return (
    <SafeArea>
      <Container>
        <ScrollContainer>
          <HeaderComponent spark={sparkData} navigation={navigation} />
          <BodyComponent spark={sparkData} />
          <ParticipantsComponent spark={sparkData} navigation={navigation} />
          <CalendarSectionComponent spark={sparkData} />
          <FooterComponent navigation={navigation} spark={sparkData} />
        </ScrollContainer>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  height: 100%;
`;

const ScrollContainer = styled(ScrollView)`
  height: 100%;
  width: 100%;
`;
