import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styled from "styled-components/native";

import { BackArrow } from "../../../Components/PreAuthentication";

import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";
import { ProfilePageContext } from "../../../Context/ProfilePageContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { doc, updateDoc } from "firebase/firestore";
import { auth, storage, database } from "../../../Config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

import { LoadingScreen } from "../../../Components/GlobalComponents/LoadingScreen";
import { useDispatch } from "react-redux";
import { updateProfilePhotos } from "../../../Slices/userSlice";

export const AddPhotosPrompts = ({ navigation, route }) => {
  const { uri, selectedPhoto, userNumber } = route.params;
  const { setAllPhotos, allPhotos } = useContext(ProfilePageContext);
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    // Simulate a loading process (e.g., API call or app initialization)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 3 seconds delay

    return () => clearTimeout(timer); // Clean up the timer
  }, []);

  const promptsList = [
    "Playing your favourite sport/game",
    "At the last movie you saw",
    "In front or beside something you made",
    "The last thing that made you smile",
    "At an event you attended recently",
    "At the last place you ate out at",
    "When you last held a microphone",
  ];

  const onHandlePromptPressed = async (prompt) => {
    navigation.goBack();
    if (!uri) {
      selectImageFromGallery(prompt);
    } else {
      await uploadImageToFirebase(uri, prompt);
    }
  };

  const uploadImageToFirebase = async (imageUri, prompt) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      const fileName = `${auth.currentUser.uid}-${selectedPhoto}-profile-picture.jpg`;
      const storageRef = ref(storage, `profile-pictures/${fileName}`);

      await uploadBytes(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);

      const updatedPhotos = allPhotos.map((p) =>
        p.id === selectedPhoto
          ? {
              ...p,
              picture: downloadURL,
              id: selectedPhoto,
              prompt: prompt,
            }
          : p
      );

      setAllPhotos(updatedPhotos); // Update the context state
      dispatch(updateProfilePhotos(updatedPhotos));

      await updateDoc(doc(database, "Users", userNumber), {
        allPhotos: updatedPhotos,
      });

      console.log("Prompt updated successfully!");
    } catch (error) {
      console.error("Error updating prompt or uploading image:", error);
    }
  };

  const selectImageFromGallery = async (prompt) => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access gallery denied");
        return;
      }

      const imagePickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0,
      });

      if (!imagePickerResult.canceled) {
        const uri = imagePickerResult.assets[0].uri;
        await uploadImageToFirebase(uri, prompt);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const onHandleCreateYourOwnPrompt = () => {
    navigation.navigate("CreateYourOwnPrompt", {
      uri: uri,
      selectedPhoto: selectedPhoto,
      userNumber,
    });
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <TitleContainer>
          <Title>Choose from our photo prompts</Title>
        </TitleContainer>

        <InputContainer>
          {promptsList.map((res) => {
            return (
              <ListCard onPress={() => onHandlePromptPressed(res)}>
                <ListCardText>{res}</ListCardText>
              </ListCard>
            );
          })}
          <CreateButtonLabel>Didn’t find one you like? </CreateButtonLabel>
          <CreateButton onPress={onHandleCreateYourOwnPrompt}>
            <CreateButtonText>Create one yourself</CreateButtonText>
            <MaterialCommunityIcons
              name="pencil-circle-outline"
              size={24}
              color="#fff"
            />
          </CreateButton>
        </InputContainer>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const TitleContainer = styled(View)`
  justify-content: flex-end;
`;

const Title = styled(Text)`
  font-size: 25px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const InputContainer = styled(View)`
  width: 100%;
  margin-top: 20px;
  padding: 15px;
`;

const ListCard = styled(TouchableOpacity)`
  border-bottom-color: #707070; /* Add a black line */
  border-bottom-width: 1px;
`;

const ListCardText = styled(Text)`
  font-size: 12px;
  color: black;
  font-family: poppins-600;
  margin-bottom: 15px;
  margin-top: 15px;
`;

const CreateButtonLabel = styled(Text)`
  font-size: 12px;
  color: #677e52;
  font-family: poppins-500;
  margin-top: 40px;
  text-align: center;
`;

const CreateButton = styled(TouchableOpacity)`
  width: 80%;
  height: 60px;
  background-color: #79d17c;
  align-self: center;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 30px;
  flex-direction: row;
  margin-top: 15px;
`;

const CreateButtonText = styled(Text)`
  font-size: 12px;
  color: #fff;
  font-family: poppins-500;
`;
