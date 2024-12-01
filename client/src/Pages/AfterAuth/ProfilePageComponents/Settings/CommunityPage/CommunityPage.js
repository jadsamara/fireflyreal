import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

import { SafeArea } from "../../../../../Components/GlobalComponents";
import { SettingsHeader, SettingsSearchBar } from "../Components";
import { GuidelineComponent } from "./GuidelineComponent";

export const CommunityPage = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <SafeArea>
      <ScrollContainer>
        <SettingsHeader
          navigation={navigation}
          title="Community Guidelines"
          icon="group"
        />
        <SearchBarContainer>
          <SettingsSearchBar
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
          />
        </SearchBarContainer>
        <GuidelineComponent />
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
