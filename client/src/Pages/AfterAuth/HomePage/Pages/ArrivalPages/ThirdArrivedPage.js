import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";

import { SafeArea } from "../../../../../Components/GlobalComponents";
import styled from "styled-components";

import {
  HeaderComponent,
  BodyComponent,
  FooterComponent,
  CalendarSectionComponent,
  ParticipantsComponent,
} from "./ArrivalPageComponents/ThirdArrivedComponents";

import { getUserInfo } from "../../../../../Functions/GetUserInfo";

export const ThirdArrivedPage = ({ route, navigation }) => {
  const { spark, arrivalData } = route.params;
  const [hostInfo, setHostInfo] = useState({});

  useEffect(() => {
    const getHostInfo = async () => {
      const userInfo = await getUserInfo(spark.host);

      setHostInfo(userInfo);
    };

    getHostInfo();
  }, []);

  return (
    <Container>
      <ScrollContainer>
        <HeaderComponent spark={spark} />
        <BodyComponent spark={spark} arrivalData={arrivalData} />
        <ParticipantsComponent spark={spark} navigation={navigation} />
        <CalendarSectionComponent spark={spark} />
        <FooterComponent
          navigation={navigation}
          spark={spark}
          arrivalData={arrivalData}
        />
      </ScrollContainer>
    </Container>
  );
};

const Container = styled(View)`
  height: 100%;
`;

const ScrollContainer = styled(ScrollView)`
  height: 100%;
  width: 100%;
`;
