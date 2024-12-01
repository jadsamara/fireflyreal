import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

import { SafeArea } from "../../../../../Components/GlobalComponents";
import { SettingsHeader, SettingsSearchBar } from "../Components";
import { NotifyMeComponent } from "./NotifyMeComponent";

export const NotificationsPage = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <SafeArea>
      <ScrollContainer>
        <SettingsHeader
          navigation={navigation}
          title="Notifications"
          icon="notifications"
        />
        <SearchBarContainer>
          <SettingsSearchBar
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
          />
        </SearchBarContainer>
        <NotifyMeComponent />
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
