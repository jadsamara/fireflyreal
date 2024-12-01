import { View, ScrollView } from "react-native";
import React, { useState } from "react";
import styled from "styled-components";

import { SafeArea } from "../../../../../Components/GlobalComponents";
import { SettingsHeader, SettingsSearchBar } from "../Components";
import { TabCard } from "./TabCard";
import { AnyQuestionsComponent } from "../Components/AnyQuestionsComponent";

export const LegalPage = ({ navigation }) => {
  const [searchKeyword, setSearchKeyword] = useState("");

  const listOfLegalTabs = ["Terms of Use", "Privacy Policy", "Cookies Policy"];

  return (
    <SafeArea>
      <ScrollContainer>
        <SettingsHeader
          navigation={navigation}
          title="Legal & Policies"
          icon="gavel"
        />
        <SearchBarContainer>
          <SettingsSearchBar
            setSearchKeyword={setSearchKeyword}
            searchKeyword={searchKeyword}
          />
        </SearchBarContainer>
        <Container>
          {listOfLegalTabs.map((res, index) => {
            return <TabCard res={res} key={index} />;
          })}
          <AnyQuestionsComponent />
        </Container>
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

const Container = styled(View)`
  margin-top: 20px;
  width: 90%;
  align-self: center;
`;
