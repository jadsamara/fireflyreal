import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";

import { PhotoCard } from "./PhotoCard";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";
import { FontAwesome } from "@expo/vector-icons";
import DraggableGrid from "react-native-draggable-grid";

const GRID_COLUMNS = 3; // Number of columns in the grid

export const AddPhotosTwo = ({ navigation }) => {
  const { allPhotos, setAllPhotos } = useContext(AuthenticationStackContext);
  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const [filteredData, setFilteredData] = useState(allPhotos);

  useEffect(() => {
    const filteredDataTemp = allPhotos.slice(
      0,
      Math.min(
        6,
        allPhotos.findIndex((photo) => !photo.picture) + 1 || 6 // Ensure we stop at 6
      )
    );
    setFilteredData(filteredDataTemp);
  }, [allPhotos]);

  const selectedPhotoObject = allPhotos.find(
    (photo) => photo.id === selectedPhoto
  );

  const promptGetter = (selectedPhotoObject) => {
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
    return prompt;
  };

  const onHandleNavigation = () => {
    navigation.navigate("AddPhotosPrompts", {
      selectedPhoto,
      uri: selectedPhotoObject.picture,
      type: "prompt",
    });
  };

  const onHandleContinue = () => {
    navigation.navigate("CreateAccountPageSix");
  };

  const onHandleDeletePhoto = (id) => {
    // Update the photo list by removing the picture
    const updatedPhotos = allPhotos.map((photo) => {
      if (photo.id === id) {
        return { ...photo, picture: "", prompt: "" }; // Removing the picture
      }
      return photo;
    });

    // Optionally, sort or move the deleted item to the end
    const photoWithoutPic = updatedPhotos.find((photo) => photo.id === id);
    const photosWithPic = updatedPhotos.filter((photo) => photo.id !== id);
    const finalPhotos = [...photosWithPic, photoWithoutPic]; // Moves the item to the end

    setAllPhotos(finalPhotos);
  };

  const renderItem = (item) => {
    return (
      <View
        key={item.id}
        style={{
          backgroundColor: "#fff",
        }}
      >
        <PhotoCard
          id={item.id}
          photo={item}
          selectedPhoto={selectedPhoto}
          setSelectedPhoto={setSelectedPhoto}
          navigation={navigation}
          onHandleDeletePhoto={onHandleDeletePhoto}
        />
      </View>
    );
  };

  const onReleaseDrag = (newData) => {
    while (newData.length < 6) {
      const missingItem = allPhotos.find(
        (item) => !newData.some((data) => data.id === item.id)
      );
      if (missingItem) {
        newData.push(missingItem);
      }
    }
    setAllPhotos(newData);
  };

  return (
    <SafeArea>
      <Header>Show off more about yourself</Header>
      <Container>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
            marginBottom: 20,
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        >
          {allPhotos.length > 0 ? (
            <DraggableGrid
              key={filteredData.length}
              numColumns={GRID_COLUMNS}
              data={filteredData}
              style={{
                backgroundColor: "#fff",
                marginTop: 50,
              }}
              renderItem={(item) => renderItem(item)}
              onDragRelease={onReleaseDrag}
            />
          ) : null}
        </View>

        {selectedPhotoObject.picture && selectedPhotoObject.prompt && (
          <Row>
            <AdvanceToPromptsButton onPress={onHandleNavigation}>
              <PromptText>"{promptGetter(selectedPhotoObject)}"</PromptText>
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
  width: 100%;
  flex: 1;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 80px;
`;

const Header = styled(Text)`
  width: 90%;
  color: black;
  font-family: "poppins-700";
  font-size: 28px;
  text-align: center;
  margin-top: 10px;
  align-self: center;
`;

const AdvanceToPromptsButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
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

const PromptText = styled(Text)`
  color: black;
  font-family: "poppins-600";
  font-size: 12px;
  margin-right: 10px;
`;
