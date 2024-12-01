import { View, Text, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import { SafeArea } from "../../../../Components/GlobalComponents/";

import styled from "styled-components";

import {
  HeaderComponent,
  BodyComponent,
  FooterComponent,
  ParticipantsComponent,
  MapSection,
} from "./ViewActiveSparkComponents";

import { CancelModal } from "../../../../Components/GlobalComponents/CancelModal.js";

import { getUserInfo } from "../../../../Functions/GetUserInfo.js";

export const ViewActiveSparkPage = ({ route, navigation }) => {
  const { spark } = route.params;
  const [userInfo, setUserInfo] = useState({});
  const [toggleCancelModal, setToggleCancelModal] = useState(false);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const temp = spark.host;
        const user = await getUserInfo(temp);
        setUserInfo(user);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    }

    fetchUserInfo();
  }, []);

  return (
    <>
      {toggleCancelModal ? (
        <CancelModal
          setToggleCancelModal={setToggleCancelModal}
          spark={spark}
          navigation={navigation}
        />
      ) : null}
      <Container>
        <ScrollContainer>
          <HeaderComponent
            spark={spark}
            userInfo={userInfo}
            navigation={navigation}
          />
          <BodyComponent spark={spark} userInfo={userInfo} />
          <ParticipantsComponent spark={spark} navigation={navigation} />
          <MapSection spark={spark} />
          <FooterComponent
            setToggleCancelModal={setToggleCancelModal}
            navigation={navigation}
            spark={spark}
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
