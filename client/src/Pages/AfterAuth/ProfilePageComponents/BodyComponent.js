import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";
import { AuthContext } from "../../../Config/AuthContext";

import { auth, database } from "../../../Config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";

import { PhotoCard } from "./PhotoCard";

import { DraxProvider, DraxView, DraxList } from "react-native-drax";

import { ProfilePageContext } from "../../../Context/ProfilePageContext";

const GRID_COLUMNS = 3; // Number of columns in the grid
const GRID_ROWS = 2; // Number of rows in the grid
const SCREEN_WIDTH = Dimensions.get("window").width;
const ITEM_SIZE = SCREEN_WIDTH / GRID_COLUMNS - 20; // Size of each item (with padding)
const GRID_SPACING = 10; // Spacing between items in the grid

export const BodyComponent = ({ navigation }) => {
  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const [draggedItemIndex, setDraggedItemIndex] = useState(null);

  const { setAllPhotos, allPhotos } = useContext(ProfilePageContext);

  const userNumber = auth.currentUser.phoneNumber;

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const userDocRef = doc(database, "Users", userNumber);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const photos = docSnap.data().allPhotos || [];
          const updatedPhotos = photos.map((photo, index) => ({
            id: index + 1,
            picture: photo.picture || "",
            prompt: photo.prompt || "Add Prompt",
          }));
          setAllPhotos(updatedPhotos);
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [userNumber]);

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

  const onHandleNavigation = () => {
    navigation.navigate("AddPhotosPrompts", {
      selectedPhoto,
      userNumber,
      uri: selectedPhotoObject.picture,
    });
  };

  const onReceiveDragDrop = (fromIndex, toIndex) => {
    const updatedPhotos = [...allPhotos];
    const [movedItem] = updatedPhotos.splice(fromIndex, 1);
    updatedPhotos.splice(toIndex, 0, movedItem);

    // Reassign IDs based on the new order
    const reindexedPhotos = updatedPhotos.map((photo, index) => ({
      ...photo,
      id: index + 1,
    }));

    setAllPhotos(reindexedPhotos);
    setDraggedItemIndex(null); // Clear dragged item
  };

  const onDragStart = (index) => {
    console.log(index);
    setDraggedItemIndex(index);
  };

  const onDragEnd = () => {
    setDraggedItemIndex(null);
  };

  return (
    <DraxProvider>
      <Container>
        <GridContainer>
          {Array.from({ length: GRID_ROWS * GRID_COLUMNS }).map((_, index) => {
            const photo = allPhotos[index];

            if (photo) {
              return (
                <DraxView
                  key={index}
                  style={{
                    width: ITEM_SIZE,
                    height: ITEM_SIZE,
                    margin: GRID_SPACING / 2,
                    backgroundColor: draggedItemIndex === index ? "" : "",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRadius: 10,
                  }}
                  payload={index} // Pass the index of the dragged item
                  onDragStart={() => onDragStart(index)} // Track the dragged item
                  onDragEnd={onDragEnd} // Reset dragged item on drag end
                  onReceiveDragDrop={({ dragged: { payload } }) => {
                    onReceiveDragDrop(payload, index);
                  }}
                >
                  <PhotoCard
                    id={photo.id}
                    photo={photo}
                    navigation={navigation}
                  />
                </DraxView>
              );
            } else {
              return (
                <PhotoCard
                  id={photo.id}
                  photo={photo}
                  selectedPhoto={selectedPhoto}
                  setSelectedPhoto={setSelectedPhoto}
                  navigation={navigation}
                />
              );
            }
          })}
        </GridContainer>
      </Container>
    </DraxProvider>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-top: 10px;
  justify-content: center;
  align-items: center;
`;

const GridContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const AddPhotoButton = styled(TouchableOpacity)`
  height: ${ITEM_SIZE}px;
  width: ${ITEM_SIZE}px;
  justify-content: center;
  align-items: center;
  margin: ${GRID_SPACING / 2}px;
  background-color: gray;
  border-radius: 10px;
`;

const PlusText = styled(Text)`
  color: white;
  font-family: "poppins-600";
  font-size: 42px;
`;

const AdvanceToPromptsButton = styled(TouchableOpacity)`
  margin-left: 5px;
`;
