import React, { useContext } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import styled from "styled-components/native";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";

import { BackArrow } from "../../../Components/PreAuthentication";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";

import { auth, storage } from "../../../Config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { selectImageFromGalleryFunc } from "../../../Functions/SelectImageFromGallery";

export const AddPhotosPrompts = ({ navigation, route }) => {
  const { setAllPhotos, allPhotos } = useContext(AuthenticationStackContext);
  const { selectedPhoto, uri, type } = route.params;

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
    if (type === "photo") {
      await selectImageFromGalleryFunc().then((res) => {
        uploadImageToFirebase(res, prompt);
      });
    } else if (type === "prompt") {
      await uploadImageToFirebase(uri, prompt);
    }
  };

  const uploadImageToFirebase = async (imageUri, prompt) => {
    try {
      if (imageUri && prompt) {
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
                disabledDrag: false,
                disabledReSorted: false,
              }
            : { ...p }
        );
        setAllPhotos([...updatedPhotos]);
      }
    } catch (error) {
      console.error("Error during upload to Firebase:", error);
    }
  };

  const onHandleCreateYourOwnPrompt = () => {
    navigation.navigate("CreateYourOwnPrompt", {
      uri: uri,
      selectedPhoto: selectedPhoto,
      type,
    });
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <TitleContainer>
          <Title>Choose from our photo prompts</Title>
        </TitleContainer>

        <InputContainer>
          {promptsList.map((res, index) => {
            return (
              <ListCard key={index} onPress={() => onHandlePromptPressed(res)}>
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
