import { Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";
import { SectionComponent } from "../Components";
import { deleteUserFunction } from "../../../../../Functions/CancelSpark";

import { useSelector, useDispatch } from "react-redux";

export const DeleteAccount = () => {
  const userData = useSelector((state) => state.user.userData);
  const dispatch = useDispatch();

  const onHandleDeleteAccount = async () => {
    try {
      const userNumber = userData.userNumber;
      await deleteUserFunction(userNumber, dispatch);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SectionComponent title="Delete Account">
      <SectionDescription>
        Thinking of putting out the flame?
      </SectionDescription>
      <SectionDescription>Here’s what will happen:</SectionDescription>

      <SectionDescriptionTwo>
        1. Your chance to meet new people online will fade :(
      </SectionDescriptionTwo>

      <SectionDescriptionTwo>
        2. All your Lumins will disappear forever.
      </SectionDescriptionTwo>

      <SectionDescriptionTwo>
        3. Your data on Firefly will be deleted from our servers completely,
        with no option to recover it later. Your previous Sparks and chats will
        still be visible to past participants.
      </SectionDescriptionTwo>

      <SectionDescriptionThree>
        I want to permanently delete my Firefly account.
      </SectionDescriptionThree>

      <DeleteAccountButton onPress={onHandleDeleteAccount}>
        <DeleteAccountButtonText>DELETE ACCOUNT</DeleteAccountButtonText>
      </DeleteAccountButton>
    </SectionComponent>
  );
};

const SectionDescription = styled(Text)`
  font-size: 8px;
  color: black;
  font-family: poppins-500;
`;

const SectionDescriptionTwo = styled(Text)`
  font-size: 8px;
  color: black;
  font-family: poppins-500;
  margin-top: 10px;
`;

const SectionDescriptionThree = styled(Text)`
  font-size: 8px;
  color: black;
  font-family: poppins-500;
  margin-top: 60px;
`;

const DeleteAccountButton = styled(TouchableOpacity)`
  background-color: #79d17c;
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 8px;
  padding-bottom: 8px;
  border-radius: 24px;
  align-self: flex-start;
  margin-top: 24px;
  margin-bottom: 24px;
`;

const DeleteAccountButtonText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-400;
`;
