import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";

import { auth, database } from "../../../../../../Config/firebase";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";

export const FooterComponent = ({
  spark,
  navigation,
  type,
  setToggleCancelModal,
  setToggleCancelReqModal,
}) => {
  const userNumber = auth.currentUser.phoneNumber;

  const cancelSpark = async () => {
    setToggleCancelModal(true);
  };

  const onRemoveRequest = async () => {
    setToggleCancelReqModal(true);
  };

  if (type === "joined") {
    return (
      <Container>
        <CancelSparkButton onPress={cancelSpark}>
          <CancelSparkText>Leave Spark</CancelSparkText>
        </CancelSparkButton>
      </Container>
    );
  } else if (type === "requested") {
    return (
      <Container>
        <CancelSparkButton onPress={onRemoveRequest}>
          <CancelSparkText>Cancel Request</CancelSparkText>
        </CancelSparkButton>
      </Container>
    );
  }
};

const Container = styled(View)`
  width: 100%;
  margin-top: 50px;
  margin-bottom: 50px;
  align-items: center;
  justify-content: center;
`;

const CancelSparkButton = styled(TouchableOpacity)`
  justify-content: center;
  align-items: center;
  width: 160px;
  height: 40px;
  border-radius: 20px;
  background-color: red;
`;

const CancelSparkText = styled(Text)`
  font-size: 12px;
  font-family: poppins-600;
  color: white;
`;
