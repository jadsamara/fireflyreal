import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import styled from "styled-components";
import { FontAwesome } from "@expo/vector-icons";

export const TermsOfUse = ({ checkedTerms, setCheckedTerms }) => {
  const onHandleAgreeTerms = () => {
    setCheckedTerms((res) => !res);
  };

  return (
    <Container>
      <HeaderContainer>
        <Circle onPress={onHandleAgreeTerms}>
          {checkedTerms ? (
            <FontAwesome name="check" size={14} color="black" />
          ) : null}
        </Circle>

        <Title>
          I agree to the terms and conditions and understand the deposit/refund
          policy
        </Title>
      </HeaderContainer>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 40px;
`;

const HeaderContainer = styled(View)`
  width: 80%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const Title = styled(Text)`
  font-size: 10px;
  font-family: poppins-500;
`;

const Circle = styled(TouchableOpacity)`
  width: 24px;
  height: 24px;
  border-radius: 20px;
  border-color: #707070;
  border-width: 3px;
  margin-right: 20px;
  align-items: center;
  justify-content: center;
`;
