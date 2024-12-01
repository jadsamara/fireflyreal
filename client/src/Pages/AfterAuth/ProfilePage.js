import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import React, { useState } from "react";

import styled from "styled-components";

import { SafeArea } from "../../Components/GlobalComponents/";
import { HeaderComponent, BodyComponent } from "./ProfilePageComponents";

import { Ionicons } from "@expo/vector-icons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useSelector } from "react-redux";

export const ProfilePage = ({ navigation }) => {
  const onHandleNavigateToSettings = () => {
    navigation.navigate("SettingsPage");
  };
  const userData = useSelector((state) => state.user.userData);

  const [bio, setBio] = useState(userData.userBio);

  return (
    <SafeArea>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20} // Add extra scroll height to avoid overlap
      >
        <ScrollContainer>
          <HeaderRow>
            <HeaderText>Profile</HeaderText>
            <SettingsButton onPress={onHandleNavigateToSettings}>
              <Ionicons name="settings-sharp" size={30} color="#527E65" />
            </SettingsButton>
          </HeaderRow>
          <HeaderComponent navigation={navigation} />
          <BodyComponent navigation={navigation} />
          <InputContainer>
            <BioInput
              onChangeText={setBio}
              value={bio}
              placeholder="Start typing here"
              placeholderTextColor="black"
              multiline={true}
              textAlignVertical="top"
              blurOnSubmit={true}
            />
            <MaxCharText>{bio.length}/250 char</MaxCharText>
          </InputContainer>
        </ScrollContainer>
      </KeyboardAwareScrollView>
    </SafeArea>
  );
};

const ScrollContainer = styled(ScrollView)`
  height: 100%;
  width: 100%;
`;

const HeaderRow = styled(View)`
  width: 100%;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 5px;
`;

const HeaderText = styled(Text)`
  font-size: 30px;
  font-family: poppins-600;
`;

const SettingsButton = styled(TouchableOpacity)`
  position: absolute;
  right: 20px;
`;

const InputContainer = styled(View)`
  width: 100%;
  align-items: center;
  margin-top: 45px;
  position: relative;
  margin-top: 60px;
  margin-bottom: 30px;
`;

const BioInput = styled(TextInput)`
  width: 90%;
  height: 170px;
  background-color: #e0dfdf;
  border-radius: 20px;
  text-align: left;
  padding: 18px;
  font-family: poppins-400;
  font-size: 15px;
`;

const MaxCharText = styled(Text)`
  font-family: poppins-400;
  font-size: 14px;
  position: absolute;
  bottom: 10px;
  right: 40px;
`;
