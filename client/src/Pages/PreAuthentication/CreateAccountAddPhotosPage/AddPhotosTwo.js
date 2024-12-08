import React, { useState, useContext, useEffect, useCallback } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";

import { PhotoCard } from "./PhotoCard";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import DraggableGrid from "react-native-draggable-grid";
import { BackArrow, ProgressBar } from "../../../Components/PreAuthentication";

const GRID_COLUMNS = 3; // Number of columns in the grid

export const AddPhotosTwo = ({ navigation }) => {
  const { allPhotos, setAllPhotos } = useContext(AuthenticationStackContext);
  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const [filteredData, setFilteredData] = useState(allPhotos);

  useEffect(() => {
    // Reorganize `allPhotos` so items with photos come first
    const filteredDataTemp = [...allPhotos].sort((a, b) => {
      // If both have pictures, maintain order
      if (a.picture && b.picture) return a.id - b.id;

      // If only one has a picture, prioritize the one with a picture
      if (a.picture && !b.picture) return -1;
      if (!a.picture && b.picture) return 1;

      // If neither has a picture, maintain order
      return a.id - b.id;
    });

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
    navigation.navigate("HomeTown");
  };

  const onHandleDeletePhoto = (id) => {
    // Update the photo list by removing the picture for the matching ID
    const updatedPhotos = allPhotos.map((photo) => {
      // Ensure we return a new object for the updated photo
      if (photo.id === id) {
        return { ...photo, picture: "", prompt: "" }; // Remove the picture and prompt
      }
      return { ...photo }; // Return a shallow copy of other photos
    });

    // Sort the list: photos with pictures first, then empty ones, maintaining ID order
    const sortedPhotos = updatedPhotos.sort((a, b) => {
      if (a.picture && b.picture) return a.id - b.id;

      // If only one has a picture, prioritize the one with a picture
      if (a.picture && !b.picture) return -1;
      if (!a.picture && b.picture) return 1;

      // If neither has a picture, maintain order by ID
      return a.id - b.id;
    });

    // Update the state with the new sorted list
    setAllPhotos(sortedPhotos);
  };

  const renderItem = (item) => {
    return (
      <View
        key={item.key}
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
      <BackArrow navigation={navigation} />
      <Container>
        <Header>Show off more about yourself</Header>

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
              <FontAwesome name="refresh" size={18} color="#527e65" />
            </AdvanceToPromptsButton>
          </Row>
        )}

        <ProceedButton onPress={onHandleContinue}>
          <ProceedText>Looks good for now</ProceedText>
          <FontAwesome5 name="arrow-right" size={22} color={"white"} />
        </ProceedButton>
        <ProgressBar width={"10%"} bottom={0} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  width: 100%;
  flex: 1;
  padding: 15px;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: center;
  align-self: center;
  margin-top: 30px;
`;

const Header = styled(Text)`
  font-size: 36px;
  color: black;
  font-family: poppins-900;
  margin-left: 5px;
`;

const AdvanceToPromptsButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const ProceedButton = styled(TouchableOpacity)`
  align-self: center;
  align-items: center;
  position: absolute;
  bottom: 110px;
  background-color: #527e65;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 30px;
  flex-direction: row;
`;

const ProceedText = styled(Text)`
  color: white;
  font-size: 20px;
  font-family: poppins-600;
  margin-right: 20px;
`;

const PromptText = styled(Text)`
  color: #527e65;
  font-family: "poppins-600";
  font-size: 14px;
  margin-right: 10px;
`;
