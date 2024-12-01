import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { database, auth } from "../../../../../../../Config/firebase";
import { getUserInfo } from "../../../../../../../Functions/GetUserInfo";
import { doc, getDoc } from "firebase/firestore";

export const FooterComponent = ({ spark, navigation, arrivalData }) => {
  const navigateToReviewPage = () => {
    navigation.navigate("ReviewAccountsPage", {
      spark,
      arrivalData,
    });
  };

  return (
    <Container>
      <ReviewButton onPress={navigateToReviewPage}>
        <ReviewText>Review</ReviewText>
      </ReviewButton>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: space-between;
  align-items: center;
`;

const ReviewButton = styled(TouchableOpacity)`
  width: 180px;
  height: 50px;
  background-color: #79d17c;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const ReviewText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: white;
`;
