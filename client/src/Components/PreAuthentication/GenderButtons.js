import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

export const GenderButtons = ({ gender, setGender }) => {
  const handleGenderSelect = (selectedGender) => {
    setGender(selectedGender);
  };

  return (
    <>
      <GenderColumn
        onPress={() => {
          handleGenderSelect("male");
        }}
      >
        <Ionicons
          name="male-outline"
          size={74}
          color={gender === "male" ? "#79D17C" : "#686868"}
          style={{ marginLeft: 10 }}
        />

        {gender === "male" ? (
          <GenderTextActive>Male</GenderTextActive>
        ) : (
          <GenderText>Male</GenderText>
        )}
      </GenderColumn>

      <GenderColumn
        onPress={() => {
          handleGenderSelect("female");
        }}
      >
        <Ionicons
          name="female-outline"
          size={74}
          color={gender === "female" ? "#79D17C" : "#686868"}
        />
        {gender === "female" ? (
          <GenderTextActive>Female</GenderTextActive>
        ) : (
          <GenderText>Female</GenderText>
        )}
      </GenderColumn>

      <GenderColumn
        onPress={() => {
          handleGenderSelect("non-binary");
        }}
      >
        <Ionicons
          name="transgender-outline"
          size={74}
          color={gender === "non-binary" ? "#79D17C" : "#686868"}
        />
        {gender === "non-binary" ? (
          <GenderTextActive>Non-Binary</GenderTextActive>
        ) : (
          <GenderText>Non-Binary</GenderText>
        )}
      </GenderColumn>
    </>
  );
};

const GenderColumn = styled(TouchableOpacity)`
  flex-direction: column;
  height: 70%;
  width: 30%;
  justify-content: space-around;
  align-items: center;
  border-radius: 20px;
`;

const GenderText = styled(Text)``;

const GenderTextActive = styled(Text)`
  color: #79d17c;
  font-family: poppins-600;
`;
