import React from "react";
import { Searchbar } from "react-native-paper";
import { View } from "react-native";

import styled from "styled-components";

export const HomePageFilterSearchBar = ({
  searchKeyword,
  setSearchKeyword,
  placeholder,
  navigation,
}) => {
  const onHandleIconFunction = () => {
    navigation.navigate("HomeScreenFiltersPage");
  };

  return (
    <SearchBarContainer>
      <Searchbar
        onIconPress={onHandleIconFunction}
        icon="text-search"
        placeholder={placeholder}
        value={searchKeyword}
        onChangeText={setSearchKeyword}
        mode="bar"
        style={{ fontSize: 12 }}
        inputStyle={{ fontSize: 12 }}
      />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled(View)`
  width: 100%;
  margin-top: 10px;
`;
