import { View, Text } from "react-native";
import React from "react";

import styled from "styled-components/native";

export const BlurAddressComponent = ({ useShortName, fullAddress }) => {
  return (
    <>
      {useShortName ? (
        <BlurAddressView>
          <BlurAddressViewText>
            Address only visible for joined participants
          </BlurAddressViewText>
        </BlurAddressView>
      ) : (
        <AddressText numberOfLines={1} ellipsizeMode="tail">
          {fullAddress}
        </AddressText>
      )}
    </>
  );
};

const AddressText = styled(Text)`
  font-size: 8px;
  font-family: poppins-500;
  margin-left: 5px;
  width: 90%;
`;

const BlurAddressView = styled(View)`
  background-color: #415f74;
  width: 80%;
  height: 25px;
  border-radius: 10px;
  justify-content: center;
  padding-left: 10px;
`;

const BlurAddressViewText = styled(Text)`
  font-size: 10px;
  font-family: poppins-600;
  color: white;
`;
