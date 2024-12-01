import { TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";

export const BackArrow = ({ navigation, color, margin }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <BackArrowButton onPress={goBack}>
      <FontAwesome
        name="arrow-left"
        size={28}
        color={color ? color : "#527e65"}
      />
    </BackArrowButton>
  );
};

const BackArrowButton = styled(TouchableOpacity)`
  margin-left: 20px;
`;
