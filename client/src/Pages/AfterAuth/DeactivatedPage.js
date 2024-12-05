import React, { useContext } from "react";
import { View, Text, Alert, TouchableOpacity } from "react-native";

import styled from "styled-components/native";
import { doc, updateDoc } from "firebase/firestore";
import { auth, database } from "../../Config/firebase";

import { useDispatch } from "react-redux";
import { AuthContext } from "../../Config/AuthContext";
import { enableAccountFunction } from "../../Slices/userSlice";

export const DeactivatedPage = ({ navigation }) => {
  const userNumber = auth.currentUser.phoneNumber;
  const dispatch = useDispatch();
  const { setAccountStatus } = useContext(AuthContext);

  const reactivateAccount = async () => {
    try {
      const userRef = doc(database, "Users", userNumber);

      // Update the user's status to "active"
      await updateDoc(userRef, {
        accountStatus: "active",
      });
      setAccountStatus("active");
      dispatch(enableAccountFunction());

      Alert.alert(
        "Account Reactivated",
        "Your account has been successfully reactivated.",
        [
          {
            text: "OK",
          },
        ]
      );
    } catch (error) {
      console.error("Error reactivating account:", error);
      Alert.alert(
        "Error",
        "There was an error reactivating your account. Please try again later."
      );
    }
  };

  return (
    <Container>
      <TitleText>Account Disabled</TitleText>
      <SubtitleText>
        Your account has been disabled. If you believe this is a mistake,
        contact support.
      </SubtitleText>
      <ReactivateButton onPress={reactivateAccount}>
        <ReactivateButtonText>Reactivate Account ?</ReactivateButtonText>
      </ReactivateButton>
    </Container>
  );
};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

const TitleText = styled(Text)`
  font-size: 24px;
  font-family: poppins-600;
  margin-bottom: 10px;
`;

const SubtitleText = styled(Text)`
  font-size: 16px;
  text-align: center;
  width: 90%;
`;

const ReactivateButton = styled(TouchableOpacity)`
  background-color: #4caf50;
  padding: 10px 20px;
  border-radius: 5px;
  margin-top: 80px;
`;

const ReactivateButtonText = styled(Text)`
  font-size: 16px;
  color: #fff;
  font-family: poppins-500;
`;
