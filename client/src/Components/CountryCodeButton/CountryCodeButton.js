import React, { useState } from "react";
import { Text, TouchableOpacity, View, FlatList } from "react-native";
import styled from "styled-components";
import { AntDesign } from "@expo/vector-icons";
import { CountryCodesData } from "./CountryCodesData";
import { CountryCodeItem } from "./CountryCodeItem";

export const CountryCodeButton = ({ setCountryCode, countryCode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <View>
      <CodeButton onPress={handleDropdownToggle}>
        <CountryCodeText>{countryCode}</CountryCodeText>
        <AntDesign
          name={dropdownOpen ? "caretup" : "caretdown"}
          size={10}
          color="black"
        />
      </CodeButton>
      {dropdownOpen ? (
        <ListContainer>
          <FlatList
            data={CountryCodesData}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return (
                <View>
                  <CountryCodeItem
                    card={item}
                    setCountryCode={setCountryCode}
                    setDropdownOpen={setDropdownOpen}
                  />
                </View>
              );
            }}
          />
        </ListContainer>
      ) : null}
    </View>
  );
};

const CodeButton = styled(TouchableOpacity)`
  width: 80px;
  height: 50px;
  background-color: #ebebeb;
  margin-left: 10px;
  border-radius: 16px;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: row;
  padding: 3px;
`;

const CountryCodeText = styled(Text)`
  font-size: 16px;
`;

const ListContainer = styled(View)`
  position: absolute;
  top: 55px;
  left: 0px;
  width: 190px;
  height: 250px;
  background-color: #a8a8a8;
  border-radius: 10px;
  shadow-color: #171717;
  shadow-offset: 2px 3px;
  shadow-opacity: 0.1875;
  shadow-radius: 2.7px;
  margin-left: 10px;
`;
