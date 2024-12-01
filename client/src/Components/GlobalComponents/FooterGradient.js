import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import styled from "styled-components/native";

export const FooterGradient = ({ children }) => {
  return (
    <Gradient colors={["rgba(103, 126, 82, 0.5)", "rgba(103, 126, 82, 0)"]}>
      {children}
    </Gradient>
  );
};

const Gradient = styled(LinearGradient)`
  width: 100%;
  right: 20px;
  bottom: 10px;
  position: absolute;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;
