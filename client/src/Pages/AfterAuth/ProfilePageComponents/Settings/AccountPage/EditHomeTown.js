import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

import { MaterialIcons } from "@expo/vector-icons";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { auth, database } from "../../../../../Config/firebase";

import { SectionComponent } from "../Components";

import { updateHometown } from "../../../../../Slices/userSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

export const EditHomeTown = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);

  const [homeTown, setHomeTown] = useState(userData.homeTown);
  const [isValid, setIsValid] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);

  const userNumber = auth.currentUser.phoneNumber;

  const handleChange = (text) => {
    setHomeTown(text);
    setIsValid(false); // Reset validity when typing starts

    if (typingTimeout) {
      clearTimeout(typingTimeout); // Clear the previous timeout
    }

    setTypingTimeout(
      setTimeout(() => {
        setIsValid(!!text); // Validate only if there's text
      }, 1000)
    );
  };

  const onHandleChangeName = async () => {
    if (!homeTown.trim()) {
      return;
    }

    try {
      const userDocRef = doc(database, "Users", userNumber);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        await updateDoc(userDocRef, { homeTown: homeTown.trim() });

        dispatch(updateHometown(homeTown.trim()));

        Alert.alert("Name successfully changed");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SectionComponent title="Edit Home Town">
      <InputWrapper>
        <Label>Your city and country</Label>
        <StyledTextInput
          value={homeTown}
          onChangeText={handleChange}
          placeholder="City, Country"
          maxLength={26}
        />
        {homeTown !== "" && homeTown.trim() !== userData.homeTown ? (
          <CheckmarkIcon name="check-circle" visible={isValid} />
        ) : null}
      </InputWrapper>
      <ConfimButton
        disabled={homeTown === "" || homeTown.trim() === userData.homeTown}
        backgroundColor={
          homeTown !== "" && homeTown.trim() !== userData.homeTown
            ? "#527e65"
            : "gray"
        }
        onPress={onHandleChangeName}
      >
        <ConfimButtonText>Confirm Change</ConfimButtonText>
      </ConfimButton>
    </SectionComponent>
  );
};

const Label = styled(Text)`
  position: absolute;
  top: 4px;
  left: 12px;
  font-size: 8px;
  color: #aaa;
`;

const InputWrapper = styled(View)`
  position: relative;
  width: 100%;
  border: 1px solid green;
  border-radius: 8px;
  padding: 12px;
`;

const StyledTextInput = styled(TextInput)`
  font-size: 14px;
  color: #333;
  margin-top: 16px;
  padding: 0;
`;

const CheckmarkIcon = styled(MaterialIcons)`
  position: absolute;
  right: 12px;
  top: 50%;
  font-size: 24px;
  color: #4caf50;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`;

const ConfimButton = styled(TouchableOpacity)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  padding-left: 10px;
  padding-right: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 24px;
  align-self: flex-end;
  margin-top: 10px;
`;

const ConfimButtonText = styled(Text)`
  font-size: 12px;
  color: white;
  font-family: poppins-400;
`;
