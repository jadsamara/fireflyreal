import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import styled from "styled-components";

export const FooterComponent = ({ sendPushNotification }) => {
  const onHandleCancelRequest = () => {};

  return (
    <Container>
      <SendRequestButton onPress={sendPushNotification}>
        <SendRequestText>Send Request</SendRequestText>
      </SendRequestButton>
      <CancelRequestButton onPress={onHandleCancelRequest}>
        <CancelRequestText>Cancel Request</CancelRequestText>
      </CancelRequestButton>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 40px;
  margin-bottom: 50px;
  align-items: center;
`;

const SendRequestButton = styled(TouchableOpacity)`
  width: 200px;
  height: 55px;
  background-color: #79d17c;
  border-radius: 20px;
  align-items: center;
  justify-content: center;
`;

const SendRequestText = styled(Text)`
  font-size: 16px;
  font-family: poppins-600;
  color: white;
`;

const CancelRequestButton = styled(TouchableOpacity)`
  margin-top: 30px;
`;

const CancelRequestText = styled(Text)`
  font-size: 12px;
  font-family: poppins-400;
  color: red;
`;
