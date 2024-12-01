import React from "react";
import { Searchbar } from "react-native-paper";

export const SettingsSearchBar = ({
  searchKeyword,
  setSearchKeyword,
  navigation,
}) => {
  //   const onHandleIconFunction = () => {
  //     navigation.navigate("HomeScreenFiltersPage");
  //   };

  return (
    <Searchbar
      // onIconPress={onHandleIconFunction}
      icon="text-search"
      placeholder={"Search"}
      value={searchKeyword}
      onChangeText={setSearchKeyword}
      mode="bar"
      style={{
        fontSize: 12,
        backgroundColor: "#DBDBDB",
      }}
      inputStyle={{ fontSize: 12 }}
    />
  );
};
