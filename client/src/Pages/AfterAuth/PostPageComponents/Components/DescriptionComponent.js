import React, { useContext } from "react";
import { View, Text, TextInput } from "react-native";
import styled from "styled-components";

import { PostDateContext } from "../../../../Context/PostPagesContext";

export const DescriptionComponent = () => {
  const { sparkDescription, setSparkDescription } = useContext(PostDateContext);

  const handleTextChange = (newText) => {
    if (sparkDescription.length <= 250) {
      setSparkDescription(newText);
    }
  };

  return (
    <Container>
      <DescriptionHeaderText>Describe your Spark</DescriptionHeaderText>
      <DescriptionBox
        placeholder="Type a short description here."
        value={sparkDescription}
        onChangeText={handleTextChange}
        placeholderTextColor="black"
        multiline={true}
        blurOnSubmit={true}
        maxLength={250}
      />
      <CharactersLeftText>
        {250 - sparkDescription.length} characters left
      </CharactersLeftText>
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  height: 30%;
  position: relative;
  justify-content: space-between;
  margin-top: 10%;
`;

const DescriptionHeaderText = styled(Text)`
  font-size: 16px;
  font-family: poppins-700;
  margin-bottom: 10px;
`;

const DescriptionBox = styled(TextInput)`
  height: 90%;
  width: 100%;
  background-color: #e4e4e4;
  margin-top: 5px;
  padding: 15px;
  border-radius: 10px;
  font-size: 12px;
  font-family: poppins-300;
  color: black;
`;

const CharactersLeftText = styled(Text)`
  font-size: 10px;
  font-family: poppins-400;
  position: absolute;
  bottom: 0;
  right: 10px;
`;
