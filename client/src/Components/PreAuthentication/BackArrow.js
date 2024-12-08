import { TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { FontAwesome5 } from "@expo/vector-icons";

export const BackArrow = ({ navigation, color }) => {
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <BackArrowButton onPress={goBack}>
      <FontAwesome5
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
