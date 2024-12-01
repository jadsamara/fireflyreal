import { View, Text, Image } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";

import LuminsLogo from "../../Assets/luminslogo.png";
import { TouchableOpacity } from "react-native";
import { auth } from "../../Config/firebase";

import { useDispatch } from "react-redux";

import { cancelSparkRequest } from "../../Functions/CancelSpark";

export const CancelRequest = ({ setToggleCancelModal, spark, navigation }) => {
  const [luminPrice, setLuminPrice] = useState(0);
  const userNumber = auth.currentUser.phoneNumber;
  const dispatch = useDispatch();

  const onRemoveRequest = async () => {
    cancelSparkRequest(spark, userNumber, dispatch);
    setToggleCancelModal(false);
    navigation.goBack();
  };

  return (
    <Container
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
      }}
    >
      <TitleText>Are you sure you want to cancel?</TitleText>
      <SubTitleText>Cancelling now will incur a penalty of:</SubTitleText>
      <Row>
        <LuminsText>{luminPrice} Lumins</LuminsText>
        <LuminsImageContainer>
          <LuminLogo
            source={LuminsLogo}
            resizeMode={"contain"}
            style={{ tintColor: "green" }}
          />
        </LuminsImageContainer>
      </Row>
      <CancelPolicyText>As per our cancel policy</CancelPolicyText>
      <CancelButton onPress={onRemoveRequest}>
        <CancelButtonText>Cancel Spark Request</CancelButtonText>
      </CancelButton>
      <GoBackButton onPress={() => setToggleCancelModal(false)}>
        <GoBackText>Go back</GoBackText>
      </GoBackButton>
    </Container>
  );
};

const Container = styled(View)`
  width: 350px;
  height: 300px;
  background-color: white;
  position: absolute;
  align-self: center;
  top: 40%;
  z-index: 999999;
  border-radius: 10px;
`;

const TitleText = styled(Text)`
  font-size: 14px;
  color: green;
  font-family: poppins-800;
  text-align: center;
  margin-top: 10px;
`;

const SubTitleText = styled(Text)`
  font-size: 10px;
  color: black;
  font-family: poppins-800;
  text-align: center;
  margin-top: 10px;
`;

const Row = styled(View)`
  margin-top: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LuminsText = styled(Text)`
  font-size: 20px;
  color: black;
  font-family: poppins-800;
  text-align: center;
`;

const LuminsImageContainer = styled(View)`
  width: 30px;
  height: 30px;
  margin-left: 5px;
`;

const LuminLogo = styled(Image)`
  height: 100%;
  width: 100%;
`;

const CancelPolicyText = styled(Text)`
  margin-top: 30px;
  font-size: 12px;
  color: black;
  font-family: poppins-600;
  text-align: center;
  text-decoration: underline;
`;

const CancelButton = styled(TouchableOpacity)`
  background-color: red;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 25px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 30px;
  padding-right: 30px;

  border-radius: 40px;
`;

const CancelButtonText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-600;
`;

const GoBackButton = styled(TouchableOpacity)`
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 15px;
`;

const GoBackText = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: poppins-600;
`;
