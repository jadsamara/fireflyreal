import { View, Text } from "react-native";
import React from "react";
import styled from "styled-components/native";

import { TouchableOpacity } from "react-native";
import { auth, database } from "../../../../../Config/firebase";

import { doc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { disableAccountFunction } from "../../../../../Slices/userSlice";

export const DeactivateModal = ({
  setToggleModal,
  setIsEnabled,
  navigation,
}) => {
  const userNumber = auth.currentUser.phoneNumber;
  const dispatch = useDispatch();

  const disableAccount = async () => {
    try {
      const userRef = doc(database, "Users", userNumber);

      // Update the user's status to "disabled"
      await updateDoc(userRef, {
        accountStatus: "disabled",
      });

      dispatch(disableAccountFunction());
      setToggleModal(false);

      navigation.navigate("DeactivatedPage");
    } catch (error) {
      console.error("Error disabling account:", error);
    }
  };

  const goBack = () => {
    setToggleModal(false);
    setIsEnabled((res) => !res);
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
      <TitleText>Are you sure you want to deactivate account?</TitleText>
      <SubTitleText>
        Note: Cancelling Sparks less than 24 hours before their scheduled date
        will result in loss of your deposit.
      </SubTitleText>

      <CancelButton onPress={disableAccount}>
        <CancelButtonText>Deactivate</CancelButtonText>
      </CancelButton>
      <GoBackButton onPress={goBack}>
        <GoBackText>Go back</GoBackText>
      </GoBackButton>
    </Container>
  );
};

const Container = styled(View)`
  width: 350px;
  background-color: white;
  position: absolute;
  align-self: center;
  top: 40%;
  z-index: 999999;
  border-radius: 10px;
  padding-bottom: 20px;
`;

const TitleText = styled(Text)`
  font-size: 14px;
  color: green;
  font-family: poppins-800;
  text-align: center;
  margin-top: 10px;
`;

const SubTitleText = styled(Text)`
  font-size: 8px;
  color: black;
  font-family: poppins-800;
  text-align: center;
  margin-top: 10px;
  width: 80%;
  align-self: center;
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
