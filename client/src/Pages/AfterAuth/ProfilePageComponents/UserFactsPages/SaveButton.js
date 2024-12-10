import { TouchableOpacity, Text } from "react-native";
import React from "react";
import styled from "styled-components";

import { useDispatch } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";
import { database } from "../../../../Config/firebase";

import { updateUserInformation } from "../../../../Slices/userSlice";

export const SaveButton = ({
  backgroundColor,
  newInfo,
  indexToUpdate,
  navigation,
  userData,
  disabled,
}) => {
  const dispatch = useDispatch();

  const saveInfo = async () => {
    try {
      dispatch(
        updateUserInformation({ index: indexToUpdate, newInfo: newInfo })
      );

      // Prepare the updated array for Firestore
      const updatedUserInformation = [...userData.userInformation];
      updatedUserInformation[indexToUpdate] = newInfo;

      // Update the Firestore document
      await updateDoc(doc(database, "Users", userData.userNumber), {
        userInformation: updatedUserInformation,
      });
      navigation.goBack();
    } catch (error) {
      console.error("Error updating user information in Firestore:", error);
    }
  };

  return (
    <ContinueTouchable
      onPress={saveInfo}
      backgroundColor={backgroundColor}
      disabled={disabled}
      style={{
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5, // For Android
      }}
    >
      <ContinueButtonText>Save</ContinueButtonText>
    </ContinueTouchable>
  );
};

const ContinueTouchable = styled(TouchableOpacity)`
  width: 165px;
  height: 40px;
  border-radius: 26px;
  align-items: center;
  justify-content: center;
  background-color: ${({ backgroundColor }) => backgroundColor};
  margin-top: 180px;
  align-self: center;
`;

const ContinueButtonText = styled(Text)`
  color: white;
  font-size: 20px;
  font-family: poppins-600;
`;
