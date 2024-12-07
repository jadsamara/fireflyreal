import React, { useState } from "react";
import { View, TextInput, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../../../Components/GlobalComponents/SafeArea";

import { Ionicons } from "@expo/vector-icons";

export const LanguagesPage = ({ navigation }) => {
  const [languagesSpoken, setLanguagesSpoken] = useState({
    languagesList: [],
    isHidden: false,
  });

  const [textChange, setTextChange] = useState("");

  const onHandleNavigate = () => {
    navigation.navigate("EthnicityPage");
  };

  const handleAddLanguage = () => {
    if (textChange.trim() !== "") {
      setLanguagesSpoken((prevState) => ({
        ...prevState,
        languagesList: [...prevState.languagesList, textChange],
      }));
      setTextChange(""); // Clear input field after adding
    }
  };

  const handleRemoveLanguage = (indexToRemove) => {
    setLanguagesSpoken((prevState) => ({
      ...prevState,
      languagesList: prevState.languagesList.filter(
        (_, index) => index !== indexToRemove
      ),
    }));
  };

  const toggleHidden = () => {
    setLanguagesSpoken((prevState) => ({
      ...prevState,
      isHidden: !prevState.isHidden,
    }));
  };

  return (
    <SafeArea>
      <Container>
        <Title>Languages Spoken</Title>
        <InputContainer>
          <TextInputComponent
            onChangeText={setTextChange}
            value={textChange}
            maxLength={60}
            placeholder="Add Language"
            placeholderTextColor="gray"
            returnKeyType={"default"}
            onSubmitEditing={handleAddLanguage}
          />
        </InputContainer>
        <CurrentTagContainer>
          {languagesSpoken.languagesList.map((language, index) => (
            <Tag key={index}>
              <TagText>{language}</TagText>
              <TagClose onPress={() => handleRemoveLanguage(index)}>
                <TagCloseText>x</TagCloseText>
              </TagClose>
            </Tag>
          ))}
        </CurrentTagContainer>
        <IsHiddenContainer>
          <Row>
            <TouchableOpacity onPress={toggleHidden}>
              {languagesSpoken.isHidden ? (
                <Ionicons name="square-outline" size={34} color="black" />
              ) : (
                <Ionicons name="checkbox" size={34} color="black" />
              )}
            </TouchableOpacity>
            <IsHiddenText>Visible on profile?</IsHiddenText>
          </Row>
        </IsHiddenContainer>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const Title = styled(Text)`
  font-size: 39px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const InputContainer = styled(View)`
  width: 100%;
  height: 70px;
  align-items: center;
  margin-top: 45px;
`;

const TextInputComponent = styled(TextInput)`
  width: 90%;
  height: 50px;
  background-color: #cac8c8;
  border-radius: 16px;
  padding-left: 20px;
`;

const CurrentTagContainer = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 10px;
`;

const Tag = styled(View)`
  height: 30px;
  background-color: #527e65;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: 10px;
`;

const TagText = styled(Text)`
  color: white;
  font-family: poppins-600;
  font-size: 12px;
`;

const TagClose = styled(TouchableOpacity)`
  position: absolute;
  height: 20px;
  width: 20px;
  justify-content: center;
  align-items: center;
  top: -8px;
  right: -8px;
  border-radius: 20px;
  background-color: #79d17c;
`;

const TagCloseText = styled(Text)`
  color: white;
  font-family: poppins-700;
  font-size: 10px;
`;

const IsHiddenContainer = styled(View)`
  border-top-width: 1px;
  border-top-color: gray;
  margin-top: 60px;
  width: 90%;
  align-self: center;
`;

const Row = styled(View)`
  flex-direction: row;
  margin-top: 20px;
  width: 100%;
  align-items: center;
`;

const IsHiddenText = styled(Text)`
  color: black;
  font-family: poppins-500;
  font-size: 14px;
  margin-left: 10px;
`;
