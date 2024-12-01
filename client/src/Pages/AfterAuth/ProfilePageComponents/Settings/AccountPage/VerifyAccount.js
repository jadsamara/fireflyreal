import { TouchableOpacity, Image } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

import FastImage from "react-native-fast-image";

import VerifyAccountPNG from "../../../../../Assets/verifyaccount.png";
import { SectionComponent } from "../Components";

export const VerifyAccount = () => {
  useEffect(() => {
    FastImage.preload([
      { uri: Image.resolveAssetSource(VerifyAccountPNG).uri },
    ]);
  }, []);

  return (
    <SectionComponent title="Verify Account">
      <VerifyAccountImageButton>
        <VerifyAccountImage
          source={{
            uri: Image.resolveAssetSource(VerifyAccountPNG).uri, // Resolve local URI
            priority: FastImage.priority.high,
          }}
          resizeMode={FastImage.resizeMode.contain}
        />
      </VerifyAccountImageButton>
    </SectionComponent>
  );
};

const VerifyAccountImageButton = styled(TouchableOpacity)`
  margin-top: 10px;
  height: 100px;
  width: 100%;
`;

const VerifyAccountImage = styled(FastImage).attrs({})`
  flex: 1;
`;
