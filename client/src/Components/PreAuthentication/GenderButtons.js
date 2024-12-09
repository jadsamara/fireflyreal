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
          handleGenderSelect("Man");
        }}
      >
        <Ionicons
          name="male-outline"
          size={74}
          color={gender === "Man" ? "#79D17C" : "#686868"}
          style={{
            marginLeft: 10,
            ...(gender === "Man" && {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3.84,
              elevation: 5,
            }),
          }}
        />

        {gender === "Man" ? (
          <GenderTextActive>Man</GenderTextActive>
        ) : (
          <GenderText>Man</GenderText>
        )}
      </GenderColumn>

      <GenderColumn
        onPress={() => {
          handleGenderSelect("Women");
        }}
      >
        <Ionicons
          name="female-outline"
          size={74}
          color={gender === "Women" ? "#79D17C" : "#686868"}
          style={{
            ...(gender === "Women" && {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3.84,
              elevation: 5,
            }),
          }}
        />
        {gender === "Women" ? (
          <GenderTextActive>Women</GenderTextActive>
        ) : (
          <GenderText>Women</GenderText>
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
          style={{
            ...(gender === "non-binary" && {
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.15,
              shadowRadius: 3.84,
              elevation: 5,
            }),
          }}
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

const GenderText = styled(Text)`
  font-family: poppins-400;
`;

const GenderTextActive = styled(Text)`
  color: #79d17c;
  font-family: poppins-700;
`;
