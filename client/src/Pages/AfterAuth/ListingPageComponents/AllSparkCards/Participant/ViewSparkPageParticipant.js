import { View, Text, ScrollView } from "react-native";
import React, { useState } from "react";

import { SafeArea } from "../../../../../Components/GlobalComponents/";

import styled from "styled-components";

import {
  HeaderComponent,
  BodyComponent,
  FooterComponent,
  CalendarSectionComponent,
  ParticipantsComponent,
} from "./ViewSparkPageParticipants";

import { CancelModal } from "../../../../../Components/GlobalComponents/CancelModal";
import { CancelRequest } from "../../../../../Components/GlobalComponents/CancelRequest";

export const ViewSparkPageParticipant = ({ route, navigation }) => {
  const { spark, type } = route.params;
  const [toggleCancelModal, setToggleCancelModal] = useState(false);
  const [toggleCancelReqModal, setToggleCancelReqModal] = useState(false);

  return (
    <>
      {toggleCancelModal ? (
        <CancelModal
          setToggleCancelModal={setToggleCancelModal}
          spark={spark}
          navigation={navigation}
        />
      ) : null}
      {toggleCancelReqModal ? (
        <CancelRequest
          setToggleCancelModal={setToggleCancelReqModal}
          spark={spark}
          navigation={navigation}
        />
      ) : null}
      <Container>
        <ScrollContainer>
          <HeaderComponent spark={spark} navigation={navigation} />
          <BodyComponent spark={spark} />
          <ParticipantsComponent spark={spark} navigation={navigation} />
          <CalendarSectionComponent spark={spark} />
          <FooterComponent
            navigation={navigation}
            spark={spark}
            type={type}
            setToggleCancelModal={setToggleCancelModal}
            setToggleCancelReqModal={setToggleCancelReqModal}
          />
        </ScrollContainer>
      </Container>
    </>
  );
};

const Container = styled(View)`
  height: 100%;
`;

const ScrollContainer = styled(ScrollView)`
  height: 100%;
  width: 100%;
`;
