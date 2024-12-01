import { View, Text, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";

import LuminsLogo from "../../Assets/luminslogo.png";
import { TouchableOpacity } from "react-native";
import { auth } from "../../Config/firebase";
import {
  getCancellationPenaltyWarning,
  cancelSpark,
} from "../../Functions/CancelSpark";

import { useDispatch } from "react-redux";
import { setUserData } from "../../Slices/userSlice";
import { useSelector } from "react-redux";

export const CancelModal = ({ setToggleCancelModal, spark, navigation }) => {
  const [luminPrice, setLuminPrice] = useState(0);
  const userNumber = auth.currentUser.phoneNumber;
  const timeLeftInHours = (spark.chosenTime - Date.now()) / (1000 * 60 * 60);
  const dispatch = useDispatch();

  useEffect(() => {
    let isHost = false;

    if (userNumber === spark.host) {
      isHost = true;
    }

    const luminCost = getCancellationPenaltyWarning(
      spark,
      userNumber,
      Math.floor(timeLeftInHours),
      spark.luminsPrice
    );
    setLuminPrice(luminCost);
  }, []);

  const onHandleCancelSpark = async () => {
    await cancelSpark(
      spark,
      userNumber,
      Math.floor(timeLeftInHours),
      spark.luminsPrice,
      dispatch
    );
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
      <CancelButton onPress={onHandleCancelSpark}>
        <CancelButtonText>Cancel Spark</CancelButtonText>
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
