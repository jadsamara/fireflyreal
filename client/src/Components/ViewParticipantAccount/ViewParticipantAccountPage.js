import { View, Text } from "react-native";
import React, { useState, useCallback, useRef } from "react";

import styled from "styled-components";

import { Header } from "./ViewProfilePages/Header";
import { Body } from "./ViewProfilePages/Body";
import { BodyWithModal } from "./ViewProfilePages/BodyWithModal";

import { LoadingScreen } from "../../Components/GlobalComponents/LoadingScreen";

import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetComponent } from "./ViewProfilePages/BottomSheetComponent";

export const ViewParticipantAccountPage = ({ navigation, route }) => {
  const { participant } = route.params;

  const [isModalActive, setIsModalActive] = useState(false);
  const bottomSheetRef = useRef(null);
  const bottomSheetAnimatedPosition = useRef(null);

  if (Object.keys(participant).length === 0) {
    return <LoadingScreen />;
  }

  const handleSheetChanges = useCallback((index) => {
    if (index === 1 || index === 2) {
      setIsModalActive(true);
    } else {
      setIsModalActive(false);
    }
  }, []);

  if (Object.keys(participant).length !== 0) {
    return (
      <GestureHandlerRootView>
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

          <BottomSheetComponent
            bottomSheetRef={bottomSheetRef}
            handleSheetChangesWithAnimation={handleSheetChanges}
            isModalActive={isModalActive}
            participant={participant}
            bottomSheetAnimatedPosition={bottomSheetAnimatedPosition}
          />
        </Container>
      </GestureHandlerRootView>
    );
  }
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
`;
