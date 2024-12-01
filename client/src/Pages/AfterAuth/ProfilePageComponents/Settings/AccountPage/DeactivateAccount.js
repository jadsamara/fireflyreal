import { View, Text, Switch } from "react-native";
import React, { useState, useContext } from "react";
import styled from "styled-components";

import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../../../../../Config/firebase";

import { SectionComponent } from "../Components";

export const DeactivateAccount = ({
  toggleModal,
  setToggleModal,
  isEnabled,
  setIsEnabled,
}) => {
  const userNumber = auth.currentUser.phoneNumber;

  const toggleSwitch = (value) => {
    setIsEnabled(value);
    setToggleModal(true);
  };

  return (
    <>
      <SectionComponent title="Deactivate Account">
        <DescriptionText>
          Deactivating your account stops all Firefly notifications and updates,
          hides new Sparks, and automatically cancels your active Sparks.
        </DescriptionText>
        <FooterRow>
          <Label>Deactivate Account ?</Label>
          <Switch
            disabled={toggleModal}
            value={isEnabled}
            onValueChange={(value) => toggleSwitch(value)}
          />
        </FooterRow>
      </SectionComponent>
    </>
  );
};

const DescriptionText = styled(Text)`
  font-size: 8px;
  color: black;
  font-family: poppins-400;
  text-align: center;
`;

const FooterRow = styled(View)`
  flex-direction: row;
  margin-top: 20px;
  margin-bottom: 20px;

  align-items: center;
  justify-content: space-between;
`;

const Label = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: poppins-400;
  text-align: center;
`;
