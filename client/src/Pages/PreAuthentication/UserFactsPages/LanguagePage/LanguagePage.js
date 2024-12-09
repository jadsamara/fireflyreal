import React, { useContext, useState, useMemo } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Switch,
  FlatList,
} from "react-native";
import styled from "styled-components/native";
import { FontAwesome } from "@expo/vector-icons";

import { AuthenticationStackContext } from "../../../../Context/AuthenticationStackContext";

import {
  ProgressBar,
  ContinueButton,
  BackArrow,
} from "../../../../Components/PreAuthentication";

import { SafeArea } from "../../../../Components/GlobalComponents/SafeArea";

import { ListOfLanguages } from "./LanguageListData";

export const LanguagePage = ({ navigation }) => {
  const { languagesSpoken, setLanguagesSpoken } = useContext(
    AuthenticationStackContext
  );
  const [textChange, setTextChange] = useState("");

  // Filtered language list computed dynamically
  const filteredLanguages = useMemo(() => {
    const availableLanguages = ListOfLanguages.filter(
      (language) => !languagesSpoken.languagesList.includes(language) // Exclude selected languages
    );

    if (!textChange) return availableLanguages;

    return availableLanguages.filter((language) =>
      language.toLowerCase().includes(textChange.toLowerCase())
    );
  }, [textChange, languagesSpoken.languagesList]);

  const handleAddLanguage = (item) => {
    if (languagesSpoken.languagesList.length >= 6) return;

    setLanguagesSpoken((prev) => ({
      ...prev,
      languagesList: [...prev.languagesList, item],
    }));

    setTextChange(""); // Clear input
  };

  const handleRemoveLanguage = (item) => {
    setLanguagesSpoken((prev) => ({
      ...prev,
      languagesList: prev.languagesList.filter((language) => language !== item),
    }));
  };

  const toggleHidden = () => {
    setLanguagesSpoken((prev) => ({
      ...prev,
      isHidden: !prev.isHidden,
    }));
  };

  const onHandleNavigate = () => {
    navigation.navigate("EthnicityPage");
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <Title>Languages Spoken</Title>

        {/* Language Input */}
        <InputContainer>
          <TextInputComponent
            onChangeText={setTextChange}
            value={textChange}
            maxLength={60}
            placeholder="Add Language"
            placeholderTextColor="gray"
            returnKeyType={"default"}
          />
        </InputContainer>

        {/* Filtered Languages */}
        <CurrentTagContainer>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={filteredLanguages}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TagDisabled onPress={() => handleAddLanguage(item)}>
                <TagDisabledText>{item}</TagDisabledText>
              </TagDisabled>
            )}
          />
        </CurrentTagContainer>

        <SubTitle>Select up to 6 languages</SubTitle>

        {/* Selected Languages */}
        <CurrentTagContainerEnabled>
          {languagesSpoken.languagesList.map((item) => (
            <Tag key={item}>
              <TagText>{item}</TagText>
              <TagClose onPress={() => handleRemoveLanguage(item)}>
                <FontAwesome name="close" size={12} color="white" />
              </TagClose>
            </Tag>
          ))}
        </CurrentTagContainerEnabled>

        {/* Profile Visibility Toggle */}
        <IsHiddenContainer>
          <Row>
            <Switch
              value={!languagesSpoken.isHidden}
              onValueChange={toggleHidden}
            />
            <IsHiddenText>Visible on profile</IsHiddenText>
          </Row>
        </IsHiddenContainer>

        {/* Navigation */}
        <ContinueButton onPress={onHandleNavigate} bottom={80} />
        <ProgressBar width={"10%"} bottom={0} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const Title = styled(Text)`
  font-size: 38px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const SubTitle = styled(Text)`
  color: black;
  font-family: poppins-500;
  font-size: 12px;
  margin-top: 20px;
  margin-bottom: 10px;
  margin-left: 10px;
`;

const InputContainer = styled(View)`
  width: 100%;
  align-items: center;
  margin-top: 35px;
`;

const TextInputComponent = styled(TextInput)`
  width: 100%;
  height: 50px;
  background-color: #ebebeb;
  border-radius: 16px;
  flex-direction: row;
  align-items: center;
  padding-left: 15px;
`;

const CurrentTagContainer = styled(View)`
  flex-direction: row;
  align-items: self-start;
  justify-content: center;
  margin-top: 20px;
`;

const CurrentTagContainerEnabled = styled(View)`
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: flex-start;
`;

const TagDisabled = styled(TouchableOpacity)`
  background-color: #e2e2e2;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 10px;
`;

const TagDisabledText = styled(Text)`
  color: black;
  font-family: poppins-500;
  font-size: 12px;
`;

const Tag = styled(View)`
  background-color: #527e65;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-left: 10px;
  margin-top: 15px;
`;

const TagText = styled(Text)`
  color: white;
  font-family: poppins-600;
  font-size: 12px;
`;

const TagClose = styled(TouchableOpacity)`
  position: absolute;
  height: 25px;
  width: 25px;
  justify-content: center;
  align-items: center;
  top: -8px;
  right: -5px;
  border-radius: 20px;
  background-color: #79d17c;
`;

const IsHiddenContainer = styled(View)`
  border-top-width: 1px;
  border-top-color: gray;
  margin-top: 20px;
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
  margin-left: 12px;
`;
