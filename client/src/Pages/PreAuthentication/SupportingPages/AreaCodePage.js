import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";

import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";
import { CountryCodesData } from "../../../Components/CountryCodeButton/CountryCodesData";
import { CountryCodeItem } from "../../../Components/CountryCodeButton/CountryCodeItem";
import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";

export const AreaCodePage = ({ navigation }) => {
  const { setCountryCode, setCountryFlag } = useContext(
    AuthenticationStackContext
  );

  const onHandleClose = () => {
    navigation.goBack();
  };

  return (
    <SafeArea>
      <Row>
        <HeaderText>Select a country</HeaderText>
        <CloseButton onPress={onHandleClose}>
          <Ionicons name="close-sharp" size={24} color="black" />
        </CloseButton>
      </Row>
      <FlatList
        data={CountryCodesData}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => {
          return (
            <View>
              <CountryCodeItem
                card={item}
                setCountryCode={setCountryCode}
                setCountryFlag={setCountryFlag}
                navigation={navigation}
              />
            </View>
          );
        }}
      />
    </SafeArea>
  );
};

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const HeaderText = styled(Text)`
  font-size: 20px;
  font-family: poppins-600;
  text-align: center;
`;

const CloseButton = styled(TouchableOpacity)`
  position: absolute;
  right: 10px;
`;

const CloseText = styled(Text)`
  font-size: 20px;
  font-family: poppins-500;
`;
