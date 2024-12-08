import { View } from "react-native";
import React, { useState, useEffect, useRef } from "react";

import styled from "styled-components";

import { Header } from "./ViewProfilePages/Header";
import { Body } from "./ViewProfilePages/Body";
import { BodyWithModal } from "./ViewProfilePages/BodyWithModal";

import { getUserInfo } from "../../Functions/GetUserInfo";

import { LoadingScreen } from "../../Components/GlobalComponents/LoadingScreen";

export const ViewParticipantAccountPage = ({ navigation, route }) => {
  const { participant } = route.params;

  const [isModalActive, setIsModalActive] = useState(false);

  if (Object.keys(participant).length === 0) {
    return <LoadingScreen />;
  }

  if (Object.keys(participant).length !== 0) {
    return (
      <Container>
        {!isModalActive ? (
          <>
            <Header navigation={navigation} participant={participant} />
            <Body
              navigation={navigation}
              setIsModalActive={setIsModalActive}
              isModalActive={isModalActive}
              participant={participant}
            />
          </>
        ) : (
          <BodyWithModal
            setIsModalActive={setIsModalActive}
            isModalActive={isModalActive}
            participant={participant}
          />
        )}
      </Container>
    );
  }
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
`;
