import React, { useState } from "react";
import styled from "styled-components/native";
import { TextInput, View } from "react-native";

export const ItalicTextInput = ({ value, onChangeText, placeholder }) => {
  return (
    <View>
      <SparkTitle
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        style={{
          fontFamily: value ? "poppins-400" : "poppins-400-italic",
        }}
      />
    </View>
  );
};

const SparkTitle = styled(TextInput)`
  height: 30px;
  width: 90%;
  font-size: 10px;
  background-color: white;
  color: black;
  align-self: center;
  padding-left: 10px;
  border-radius: 40px;
  margin-top: 10px;
`;
