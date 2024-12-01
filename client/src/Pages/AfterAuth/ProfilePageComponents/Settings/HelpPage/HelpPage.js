import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

import { SafeArea } from "../../../../../Components/GlobalComponents";
import { SettingsHeader, SettingsSearchBar } from "../Components";
import { FaqComponent } from "./FaqComponent";
import { AnyQuestionsComponent } from "../Components/AnyQuestionsComponent";

export const HelpPage = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  return (
    <SafeArea>
      <ScrollContainer>
        <SettingsHeader
          navigation={navigation}
          title="Help & Support"
          icon="help-outline"
        />
        <SearchBarContainer>
          <SettingsSearchBar
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
          />
        </SearchBarContainer>
        <FaqComponent />
        <ContactContainer>
          <AnyQuestionsComponent />
        </ContactContainer>
      </ScrollContainer>
    </SafeArea>
  );
};

const ScrollContainer = styled(ScrollView)`
  flex: 1;
`;

const SearchBarContainer = styled(View)`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 15px;
`;

const ContactContainer = styled(View)`
  padding-left: 20px;
`;
