import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import styled from "styled-components/native";

export const BackgroundGradient = ({ children }) => {
  return (
    <Gradient
      colors={["rgba(103, 126, 82, 0)", "rgba(103, 126, 82, 0.5)"]}
      locations={[0.6, 0.8]}
    >
      {children}
    </Gradient>
  );
};

const Gradient = styled(LinearGradient)`
  width: 100%;
  height: 100%;
`;
