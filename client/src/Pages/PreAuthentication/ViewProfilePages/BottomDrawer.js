import React, { useContext, useRef } from "react";
import { View, Text, PanResponder, Animated } from "react-native";

import styled from "styled-components";

import { AntDesign } from "@expo/vector-icons";
import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";

export const BottomDrawer = ({ setIsModalActive }) => {
  const { bio } = useContext(AuthenticationStackContext);

  const translateY = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [
          null,
          {
            dy: translateY,
          },
        ],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy < -50) {
          // If swipe up is detected
          setIsModalActive(true);
        }
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  return (
    <Animated.View
      style={{
        transform: [
          {
            translateY: translateY.interpolate({
              inputRange: [-100, 0],
              outputRange: [-50, 0],
              extrapolate: "clamp",
            }),
          },
        ],
      }}
      {...panResponder.panHandlers}
    >
      <Container>
        <CenteredView>
          <AntDesign name="caretup" size={24} color="black" />

          <SwipeText>Swipe up to learn more about me!</SwipeText>
        </CenteredView>
        <BioText>{bio}</BioText>
      </Container>
    </Animated.View>
  );
};

const Container = styled(View)`
  height: 200px;
  width: 100%;
  background-color: white;
  opacity: 0.5;
  position: absolute;
  bottom: -100px;
  border-radius: 30px;
  padding: 10px;
`;

const CenteredView = styled(View)`
  width: 100%;
  align-self: center;
  justify-content: center;
  align-items: center;
`;

const SwipeText = styled(Text)`
  font-size: 12px;
  font-family: poppins-500;
  color: black;
`;

const BioText = styled(Text)`
  font-size: 12px;
  font-family: poppins-500;
  margin-left: 10px;
  margin-top: 10px;
`;
