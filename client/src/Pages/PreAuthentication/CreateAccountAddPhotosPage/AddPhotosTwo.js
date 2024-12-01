import React, { useState, useContext, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";

import { PhotoCard } from "./PhotoCard";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";
import Carousel from "react-native-reanimated-carousel";
import { FontAwesome } from "@expo/vector-icons";

export const AddPhotosTwo = ({ navigation }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const { allPhotos } = useContext(AuthenticationStackContext);

  const selectedPhotoObject = allPhotos.find(
    (photo) => photo.id === selectedPhoto
  );

  let prompt = "";

  if (
    selectedPhotoObject &&
    selectedPhotoObject.prompt &&
    selectedPhotoObject.picture
  ) {
    prompt = selectedPhotoObject.prompt;
  } else if (selectedPhotoObject && selectedPhotoObject.picture) {
    prompt = "Add Prompt!";
  }

  const renderCarouselItem = ({ item }) => (
    <PhotoCard
      id={item.id}
      photo={item}
      selectedPhoto={selectedPhoto}
      navigation={navigation}
    />
  );

  const onHandleNavigation = () => {
    navigation.navigate("AddPhotosPrompts", {
      selectedPhoto,
      uri: selectedPhotoObject.picture,
    });
  };

  const onHandleContinue = () => {
    navigation.navigate("CreateAccountPageSix");
  };

  return (
    <SafeArea>
      <Header>Show off more about yourself</Header>

      <Container>
        <Carousel
          data={allPhotos.slice(
            0,
            Math.min(
              6,
              allPhotos.findIndex((photo) => !photo.picture) + 1 || 6 // Ensure we stop at 6
            )
          )}
          height={400}
          loop={true}
          pagingEnabled={true}
          snapEnabled={true}
          width={300}
          style={{
            width: 300,
            marginTop: 50,
          }}
          mode="parallax"
          modeConfig={{
            parallaxScrollingScale: 0.9,
            parallaxScrollingOffset: 50,
          }}
          onProgressChange={(progress, absoluteProgress) => {
            const index = Math.round(absoluteProgress);
            setSelectedPhoto(index + 1);
          }}
          renderItem={renderCarouselItem}
        />

        {prompt && (
          <Row>
            <Text>{prompt}</Text>
            <AdvanceToPromptsButton onPress={onHandleNavigation}>
              <FontAwesome name="refresh" size={18} color="green" />
            </AdvanceToPromptsButton>
          </Row>
        )}
        <ProceedButton onPress={onHandleContinue}>
          <ProceedText>Looks good for now!</ProceedText>
        </ProceedButton>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Header = styled(Text)`
  color: black;
  font-family: "poppins-700";
  font-size: 32px;
  text-align: center;
  position: absolute;
  top: 60px;
  align-self: center;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const AdvanceToPromptsButton = styled(TouchableOpacity)`
  margin-left: 5px;
`;

const ProceedButton = styled(TouchableOpacity)`
  margin-top: 30px;
  align-self: center;
`;

const ProceedText = styled(Text)`
  color: #527e65;
  font-family: "poppins-500";
  font-size: 22px;
`;
