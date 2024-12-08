import React, { useContext } from "react";
import { Text, TouchableOpacity, View, Image } from "react-native";
import styled from "styled-components";

import { AuthenticationStackContext } from "../../Context/AuthenticationStackContext";

export const CountryCodeButton = ({ navigation }) => {
  const { countryCode, countryFlag } = useContext(AuthenticationStackContext);

  const handleDropdownToggle = () => {
    navigation.navigate("AreaCodePage");
  };

  const countryCodeLength = countryCode.length - 1;

  return (
    <View>
      <CodeButton onPress={handleDropdownToggle}>
        {countryCodeLength <= 2 ? (
          <FlagContainer>
            <Flag
              source={{
                uri: `https://flagcdn.com/w40/${countryFlag.toLowerCase()}.png`,
              }}
            />
          </FlagContainer>
        ) : null}

        <CountryCodeText>{countryCode}</CountryCodeText>
      </CodeButton>
    </View>
  );
};

const CodeButton = styled(TouchableOpacity)`
  height: 50px;
  background-color: #ebebeb;
  border-radius: 16px;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding-left: 13px;
  padding-right: 13px;
`;

const CountryCodeText = styled(Text)`
  font-size: 13px;
  font-family: poppins-500;
`;

const FlagContainer = styled(View)`
  margin-right: 5px; /* Space between flag and text */
`;

const Flag = styled(Image)`
  width: 20px;
  height: 10px;
`;
