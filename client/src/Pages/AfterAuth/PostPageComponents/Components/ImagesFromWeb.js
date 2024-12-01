import React from "react";
import { View, TouchableOpacity, Image } from "react-native";
import styled from "styled-components";

export const ImagesFromWeb = ({ imageURL, setCurrentPhoto, currentPhoto }) => {
  const GOOGLE_API_KEY = "AIzaSyCGaJwEFJ65xMcXTPGFBgLg6LGNPXmAeKo";

  const googlePlacesPhotoUrl = `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${imageURL}&key=${GOOGLE_API_KEY}`;

  const changePhoto = () => {
    setCurrentPhoto(googlePlacesPhotoUrl);
  };

  if (googlePlacesPhotoUrl === currentPhoto) {
    return (
      <ImageButton>
        <SelectedItteratedPhoto source={{ uri: googlePlacesPhotoUrl }} />
      </ImageButton>
    );
  }

  return (
    <ImageButton onPress={changePhoto}>
      <ItteratedPhoto source={{ uri: googlePlacesPhotoUrl }} />
    </ImageButton>
  );
};

const ImageButton = styled(TouchableOpacity)`
  flex: 1;
`;

const SelectedItteratedPhoto = styled(Image)`
  flex: 1;
  margin-top: 10px;
  margin-right: 10px;
  border-radius: 10px;
  border-width: 5px;
  border-color: green;
`;

const ItteratedPhoto = styled(Image)`
  flex: 1;
  margin-top: 10px;
  margin-right: 10px;
  border-radius: 10px;
`;
