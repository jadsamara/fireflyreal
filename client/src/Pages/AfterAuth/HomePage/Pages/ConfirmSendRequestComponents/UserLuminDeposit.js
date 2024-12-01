import { View, Text, Image } from "react-native";
import React from "react";

import styled from "styled-components";
import LuminsLogo from "../../../../../Assets/luminslogo.png";

export const UserLuminDeposit = ({ spark }) => {
  return (
    <Container>
      <HeaderRow>
        <Title>Lumin Deposit</Title>
        <LuminContainer>
          <LuminsImage source={LuminsLogo} />
          <LuminsText>{spark.luminsPrice}</LuminsText>
        </LuminContainer>
      </HeaderRow>
      <DescripText>
        If your request is not accepted within the time stated above, it will be
        automatically refunded.
      </DescripText>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 40px;
`;

const HeaderRow = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const Title = styled(Text)`
  font-size: 20px;
  font-family: poppins-400;
`;

const LuminContainer = styled(View)`
  width: 100px;
  height: 34px;
  border-radius: 14px;
  background-color: #79d17c;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const LuminsImage = styled(Image)`
  width: 18px;
  height: 23px;
`;

const LuminsText = styled(Text)`
  font-size: 18px;
  font-family: poppins-600;
  color: white;
  margin-left: 10px;
`;

const DescripText = styled(Text)`
  font-size: 10px;
  font-family: poppins-400;
  margin-top: 20px;
`;
