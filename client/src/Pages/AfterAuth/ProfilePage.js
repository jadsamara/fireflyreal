import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";

import styled from "styled-components";

import { SafeArea } from "../../Components/GlobalComponents/";
import {
  HeaderComponent,
  BodyComponent,
  GetVerifiedComponent,
  EditVoicePrompt,
  BioComponent,
  MyGlowSection,
} from "./ProfilePageComponents";

import { Ionicons } from "@expo/vector-icons";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { useSelector } from "react-redux";

export const ProfilePage = ({ navigation }) => {
  const userData = useSelector((state) => state.user.userData);
  const isVerified = userData.isVerified;
  const [enableScroll, setEnableScroll] = useState(true);

  const [bio, setBio] = useState(userData.userBio);

  const onHandleNavigateToSettings = () => {
    navigation.navigate("SettingsPage");
  };

  return (
    <SafeArea>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        enableOnAndroid={true}
        extraScrollHeight={20} // Add extra scroll height to avoid overlap
        scrollEnabled={enableScroll}
      >
        <HeaderRow>
          <HeaderText>Profile</HeaderText>
          <SettingsButton onPress={onHandleNavigateToSettings}>
            <Ionicons name="settings-sharp" size={30} color="#527E65" />
          </SettingsButton>
        </HeaderRow>
        <HeaderComponent navigation={navigation} />
        <BodyComponent
          navigation={navigation}
          setEnableScroll={setEnableScroll}
        />
        {isVerified !== 2 ? (
          <VerificationContainer>
            <SectionLabel>Verification</SectionLabel>
            <GetVerifiedComponent />
          </VerificationContainer>
        ) : null}
        <MyGlowSection navigation={navigation} />
        <EditVoicePrompt />
        <BioComponent bio={bio} setBio={setBio} />
      </KeyboardAwareScrollView>
    </SafeArea>
  );
};

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

const VerificationContainer = styled(View)`
  margin-bottom: 40px;
`;

const SectionLabel = styled(Text)`
  font-size: 16px;
  font-family: poppins-400;
  margin-left: 10px;
  color: green;
`;
