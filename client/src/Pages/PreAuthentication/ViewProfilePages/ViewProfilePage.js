import { View } from "react-native";
import React, { useState, useRef, useCallback } from "react";

import styled from "styled-components";

import { Header } from "./Header";
import { Body } from "./Body";
import { BodyWithModal } from "./BodyWithModal";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetComponent } from "./BottomSheetComponent";

export const ViewProfilePage = ({ navigation }) => {
  const [isModalActive, setIsModalActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const bottomSheetRef = useRef(null);
  const bottomSheetAnimatedPosition = useRef(null);

  const handleSheetChanges = useCallback((index) => {
    if (index === 1 || index === 2) {
      setIsModalActive(true);
    } else {
      setIsModalActive(false);
    }
  }, []);

  return (
    <GestureHandlerRootView>
      <Container>
        <Header navigation={navigation} />
        {!isModalActive ? (
          <>
            <Body
              navigation={navigation}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
            />
          </>
        ) : (
          <BodyWithModal
            currentIndex={currentIndex}
            setCurrentIndex={setCurrentIndex}
          />
        )}
        <BottomSheetComponent
          bottomSheetRef={bottomSheetRef}
          handleSheetChangesWithAnimation={handleSheetChanges}
          bottomSheetAnimatedPosition={bottomSheetAnimatedPosition}
        />
      </Container>
    </GestureHandlerRootView>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
`;
