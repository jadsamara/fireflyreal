import React from "react";
import { View, Text, Image } from "react-native";
import styled from "styled-components";

import LuminsLogo from "../../../../Assets/luminslogo.png";
import { useSelector } from "react-redux";
import { Asset } from "expo-asset";

export const PointsComponent = () => {
  const userData = useSelector((state) => state.user.userData);
  Asset.loadAsync(require("../../../../Assets/luminslogo.png"));

  return (
    <Container>
      <PointsText>{userData.userLumins}</PointsText>
      <LuminsImageContainer>
        <LuminLogo
          source={LuminsLogo}
          resizeMode={"contain"}
          style={{ tintColor: "#93e4b6" }}
        />
      </LuminsImageContainer>
    </Container>
  );
};

const Container = styled(View)`
  flex-direction: row;
  align-items: center;
`;

const PointsText = styled(Text)`
  margin-right: 7px;
  font-size: 20px;
  font-family: poppins-500;
  color: #527e65;
`;

const LuminsImageContainer = styled(View)`
  width: 25px;
  height: 25px;
`;

const LuminLogo = styled(Image)`
  height: 100%;
  width: 100%;
`;
