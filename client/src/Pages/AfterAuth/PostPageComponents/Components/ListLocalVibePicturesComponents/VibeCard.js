import { Text, Image, TouchableOpacity } from "react-native";
import React from "react";

import styled from "styled-components/native"; // make sure this is styled-components/native

export const VibeCard = ({ images, navigation, title }) => {
  const onHandleNavigate = () => {
    navigation.navigate("AllVibeCards", {
      images,
    });
  };

  return (
    <VibeButton key={images} onPress={onHandleNavigate}>
      <VibeText>{title}</VibeText>

      <VibeImage source={{ uri: images[0] }} />
    </VibeButton>
  );
};

const VibeButton = styled(TouchableOpacity)`
  height: 140px;
  width: 100%;
  margin-top: 8px;
  padding: 2px;
  position: relative;
`;

const VibeImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 17px;
`;

const VibeText = styled(Text)`
  font-size: 24px;
  font-family: poppins-800;
  position: absolute;
  color: white;
  z-index: 999999;
  bottom: 10px;
  left: 15px;
`;
