import { Image, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import { PostDateContext } from "../../../../../Context/PostPagesContext";

import styled from "styled-components/native"; // make sure this is styled-components/native

export const VibeCardStatic = ({ image, navigation }) => {
  const { setSparkImage } = useContext(PostDateContext);

  const onHandleNavigate = () => {
    setSparkImage(image);
    navigation.navigate("PostSparkFour");
  };

  return (
    <VibeButton key={image} onPress={onHandleNavigate}>
      <VibeImage source={{ uri: image }} />
    </VibeButton>
  );
};

const VibeButton = styled(TouchableOpacity)`
  height: 140px;
  width: 100%;
  margin-top: 8px;
  padding: 2px;
  position: relative;
`;

const VibeImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 17px;
`;
