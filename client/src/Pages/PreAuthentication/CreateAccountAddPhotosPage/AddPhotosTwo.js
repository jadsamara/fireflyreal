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
  const [filteredData, setFilteredData] = useState(0);

  useEffect(() => {
    const maxPhotos = 6;
    const index = allPhotos.findIndex((photo) => !photo.picture);
    const endIndex = index !== -1 ? index + 1 : maxPhotos; // Use index+1 if a photo without a picture is found, otherwise use maxPhotos
    const filteredDataTemp = allPhotos.slice(
      0,
      Math.min(allPhotos.length, endIndex)
    );

    if (filteredDataTemp.length > 0) {
      setFilteredData(filteredDataTemp[filteredDataTemp.length - 1].id);
    } else {
      setFilteredData(null); // or some other default value indicating no valid selection
    }
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
          filteredData={filteredData}
        />
      </View>
    );
  };

  const onReleaseDrag = (newData) => {
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
              key={allPhotos.length}
              numColumns={GRID_COLUMNS}
              data={allPhotos}
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
