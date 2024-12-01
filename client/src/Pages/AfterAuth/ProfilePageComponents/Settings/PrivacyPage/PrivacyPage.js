import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

import { SafeArea } from "../../../../../Components/GlobalComponents";
import { SettingsHeader, SettingsSearchBar } from "../Components";
import { PersonalizedAds } from "./PersonalizedAds";
import { DownloadData } from "./DownloadData";
import { DeleteAccount } from "./DeleteAccount";
import { PrivacyPolicy } from "./PrivacyPolicy";

export const PrivacyPage = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <SafeArea>
      <ScrollContainer>
        <SettingsHeader
          navigation={navigation}
          title="Privacy & Data"
          icon="lock"
        />
        <SearchBarContainer>
          <SettingsSearchBar
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
          />
        </SearchBarContainer>
        <PersonalizedAds />
        <DownloadData />
        <DeleteAccount />
      </ScrollContainer>
    </SafeArea>
  );
};

const ScrollContainer = styled(ScrollView)`
  width: 100%;
  height: 100%;
`;

const SearchBarContainer = styled(View)`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 15px;
`;
