import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import { SafeArea } from "../../../../../Components/GlobalComponents";

import styled from "styled-components";

import {
  HeaderComponent,
  BodyComponent,
  FooterComponent,
  CalendarSectionComponent,
  ParticipantsComponent,
} from "./NoshowComponents";

export const NoshowSparkPage = ({ route, navigation }) => {
  const { spark, arrivalData } = route.params;

  return (
    <SafeArea>
      <Container>
        <ScrollContainer>
          <HeaderComponent spark={spark} navigation={navigation} />
          <BodyComponent spark={spark} />
          <ParticipantsComponent spark={spark} navigation={navigation} />
          <CalendarSectionComponent spark={spark} />

          <FooterComponent spark={spark} arrivalData={arrivalData} />
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
