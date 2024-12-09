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
        theme={{ colors: { primary: "green" } }}
        mode="bar"
        style={{
          height: 50,
          fontSize: 12,
          fontFamily: "poppins-600-italic",
        }}
        inputStyle={{
          minHeight: 0, // Add this
          fontSize: 12,
          fontFamily: "poppins-600-italic",
        }}
      />
    </SearchBarContainer>
  );
};

const SearchBarContainer = styled(View)`
  width: 100%;
  margin-top: 10px;
`;
