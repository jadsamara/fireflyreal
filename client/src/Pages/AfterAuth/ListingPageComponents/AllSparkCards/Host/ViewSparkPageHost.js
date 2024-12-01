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
  FooterComponentLive,
} from "./ViewSparkPageHostComponents";
import { CancelModal } from "../../../../../Components/GlobalComponents/CancelModal";

export const ViewSparkPageHost = ({ route, navigation }) => {
  const { spark, type } = route.params;
  const [toggleCancelModal, setToggleCancelModal] = useState(false);

  return (
    <>
      {toggleCancelModal ? (
        <CancelModal
          setToggleCancelModal={setToggleCancelModal}
          spark={spark}
          navigation={navigation}
        />
      ) : null}

      <Container opacity={toggleCancelModal ? "0.7" : "1"}>
        <ScrollContainer>
          <HeaderComponent spark={spark} navigation={navigation} />
          <BodyComponent spark={spark} />
          <ParticipantsComponent spark={spark} navigation={navigation} />
          <CalendarSectionComponent spark={spark} />
          {type === "live" ? (
            <FooterComponentLive
              navigation={navigation}
              spark={spark}
              setToggleCancelModal={setToggleCancelModal}
            />
          ) : (
            <FooterComponent
              navigation={navigation}
              spark={spark}
              setToggleCancelModal={setToggleCancelModal}
            />
          )}
        </ScrollContainer>
      </Container>
    </>
  );
};

const Container = styled(View)`
  height: 100%;
  opacity: ${({ opacity }) => opacity};
`;

const ScrollContainer = styled(ScrollView)`
  height: 100%;
  width: 100%;
`;
