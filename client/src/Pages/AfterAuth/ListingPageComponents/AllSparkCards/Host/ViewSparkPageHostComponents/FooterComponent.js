import { View, Text, TouchableOpacity, Alert } from "react-native";
import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import { ListingPageContext } from "../../../../../../Context/ListingPageContext";
import { auth, database } from "../../../../../../Config/firebase";

import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

export const FooterComponent = ({
  spark,
  navigation,
  setToggleCancelModal,
}) => {
  // const activateDate = async () => {
  //   try {
  //     markDateAsConfirmed();
  //     Alert.alert("Date Confirmed!");
  //     navigation.navigate("Home");
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  // const markDateAsConfirmed = async () => {
  //   const documentId = spark.documentId;
  //   const docRef = doc(database, "Sparks", documentId);
  //   try {
  //     // Update the document with the new value
  //     await updateDoc(docRef, { isSparkActive: true });
  //   } catch (error) {}
  // };

  const cancelSpark = async () => {
    setToggleCancelModal(true);
  };

  if (spark.currentlyJoinedProfileParticipants.length > 1) {
    return (
      <Container>
        <CancelSparkButton onPress={cancelSpark}>
          <CancelSparkText>Cancel Spark</CancelSparkText>
        </CancelSparkButton>
      </Container>
    );
  } else {
    return (
      <Container>
        <CancelSparkButton onPress={cancelSpark}>
          <CancelSparkText>Cancel Spark</CancelSparkText>
        </CancelSparkButton>
      </Container>
    );
  }
};

const Container = styled(View)`
  width: 90%;
  flex-direction: row;
  margin-top: 50px;
  margin-bottom: 50px;
  justify-content: space-between;
  align-self: center;
  align-items: center;
`;

const CancelSparkButton = styled(TouchableOpacity)``;

const CancelSparkText = styled(Text)`
  font-size: 14px;
  font-family: poppins-600;
  color: red;
`;

const ConfirmSparkButton = styled(TouchableOpacity)`
  width: 180px;
  height: 56px;
  background-color: #527e65;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const ConfirmSparkDisabled = styled(View)`
  width: 180px;
  height: 56px;
  background-color: gray;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
`;

const ConfirmSparkText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: white;
`;
