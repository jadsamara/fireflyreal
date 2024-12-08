import { Text, View, TouchableOpacity, Image } from "react-native";
import React from "react";
import styled from "styled-components";

export const CountryCodeItem = ({
  card,
  setCountryCode,
  navigation,
  setCountryFlag,
}) => {
  const onHandleCountryCode = () => {
    setCountryFlag(card.flag);
    setCountryCode(card.code);
    navigation.goBack();
  };

  return (
    <DropdownItemContainer>
      <DropdownItem onPress={onHandleCountryCode}>
        <DropdownItemText>{card.name}</DropdownItemText>

        <Row>
          <FlagContainer>
            <Flag
              source={{
                uri: `https://flagcdn.com/w40/${card.flag.toLowerCase()}.png`,
              }}
            />
          </FlagContainer>
          <CodeText>({card.code})</CodeText>
        </Row>
      </DropdownItem>
    </DropdownItemContainer>
  );
};

const DropdownItemContainer = styled(View)`
  border-bottom-color: black; /* Add a black line */
  border-bottom-width: 0.5px;
  margin-top: 20px;
`;

const DropdownItem = styled(TouchableOpacity)`
  padding: 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const DropdownItemText = styled(Text)`
  font-size: 14px;
  text-align: center;
  font-family: poppins-600;
`;

const CodeText = styled(Text)`
  font-size: 11px;
  text-align: center;
  font-family: poppins-500;
`;

const FlagContainer = styled(View)`
  margin-right: 10px; /* Space between flag and text */
`;

const Flag = styled(Image)`
  width: 25px;
  height: 15px;
`;

const Row = styled(View)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
