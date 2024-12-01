import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
import styled from "styled-components";

export const CountryCodeItem = ({ card, setCountryCode, setDropdownOpen }) => {
  const onHandleCountryCode = () => {
    setCountryCode(card.code);
    setDropdownOpen(false);
  };

  return (
    <DropdownItemContainer>
      <DropdownItem onPress={onHandleCountryCode}>
        <DropdownItemText>{card.name}</DropdownItemText>
      </DropdownItem>
    </DropdownItemContainer>
  );
};

const DropdownItemContainer = styled(View)`
  border-bottom-color: black; /* Add a black line */
  border-bottom-width: 1px;
`;

const DropdownItem = styled(TouchableOpacity)`
  padding: 10px;
`;

const DropdownItemText = styled(Text)`
  font-size: 18px;
`;
