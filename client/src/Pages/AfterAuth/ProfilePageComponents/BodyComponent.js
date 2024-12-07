import { View, Text, TouchableOpacity } from "react-native";
import React, { useState, useContext, useEffect } from "react";

import styled from "styled-components";

import { auth, database } from "../../../Config/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FontAwesome } from "@expo/vector-icons";

import { PhotoCard } from "./PhotoCard";

import { ProfilePageContext } from "../../../Context/ProfilePageContext";
import DraggableGrid from "react-native-draggable-grid";
import { useDispatch } from "react-redux";
import { updateProfilePhotos } from "../../../Slices/userSlice";

const GRID_COLUMNS = 3; // Number of columns in the grid

export const BodyComponent = ({ navigation, setEnableScroll }) => {
  const userNumber = auth.currentUser.phoneNumber;
  const { setAllPhotos, allPhotos } = useContext(ProfilePageContext);

  const [selectedPhoto, setSelectedPhoto] = useState(1);
  const [filteredData, setFilteredData] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const userDocRef = doc(database, "Users", userNumber);
        const docSnap = await getDoc(userDocRef);

        if (docSnap.exists()) {
          const photos = docSnap.data().allPhotos || [];
          const updatedPhotos = photos.map((photo, index) => ({
            disabledDrag: !photo.picture, // Set to true if no picture, false otherwise
            disabledReSorted: !photo.picture,
            id: photo.id, // Unique ID
            key: photo.id, // Unique key
            picture: photo.picture || "",
            prompt: photo.prompt || "Add Prompt",
          }));

          setAllPhotos(updatedPhotos); // Replace the state
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [userNumber]);

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
    uploadNewDraggedAndSaveLocally(finalPhotos);
  };

  const render_item = (item) => {
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
    let updatedData = [...newData]; // Make a copy to ensure immutability

    while (updatedData.length < 6) {
      const missingItem = allPhotos.find(
        (item) => !updatedData.some((data) => data.id === item.id)
      );

      if (missingItem) {
        updatedData.push({ ...missingItem }); // Ensure missingItem retains its unique properties
      } else {
        break; // Avoid infinite loop
      }
    }

    setAllPhotos(updatedData);
    setEnableScroll(true);
    uploadNewDraggedAndSaveLocally(updatedData);
  };

  const uploadNewDraggedAndSaveLocally = async (newData) => {
    dispatch(updateProfilePhotos(newData));

    await updateDoc(doc(database, "Users", userNumber), {
      allPhotos: newData,
    });
  };

  return (
    <Container>
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "space-between",
          width: "100%",
          marginBottom: 20,
          flex: 1,
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
            }}
            renderItem={(item) => render_item(item)}
            onDragStart={() => setEnableScroll(false)}
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
    </Container>
  );
};

const Container = styled(View)`
  width: 100%;
  margin-bottom: 100px;
`;

const Row = styled(View)`
  flex-direction: row;
  width: 90%;
  align-items: center;
  justify-content: center;
  align-self: center;
`;

const AdvanceToPromptsButton = styled(TouchableOpacity)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const PromptText = styled(Text)`
  color: black;
  font-family: "poppins-600";
  font-size: 12px;
  margin-right: 10px;
`;
