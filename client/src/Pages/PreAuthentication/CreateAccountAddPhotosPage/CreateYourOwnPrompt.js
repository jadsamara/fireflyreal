import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styled from "styled-components/native";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";

import { BackArrow } from "../../../Components/PreAuthentication";

import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";

import { auth, storage } from "../../../Config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import * as ImagePicker from "expo-image-picker";

export const CreateYourOwnPrompt = ({ navigation, route }) => {
  const { selectedPhoto, uri } = route.params;

  const { setAllPhotos, allPhotos } = useContext(AuthenticationStackContext);

  const [prompt, setPrompt] = useState("");

  const onHandlePromptPressed = async () => {
    if (!uri) {
      selectImageFromGallery();
    } else {
      await uploadImageToFirebase(uri);
    }
  };

  const uploadImageToFirebase = async (imageUri) => {
    try {
      let updatedPhotos;

      const response = await fetch(imageUri);
      const blob = await response.blob();

      const fileName = `${auth.currentUser.uid}-${selectedPhoto}-profile-picture.jpg`;
      const storageRef = ref(storage, `profile-pictures/${fileName}`);

      await uploadBytes(storageRef, blob);

      const downloadURL = await getDownloadURL(storageRef);
      updatedPhotos = allPhotos.map((p) =>
        p.id === selectedPhoto
          ? {
              ...p,
              picture: downloadURL,
              id: selectedPhoto,
              prompt: prompt,
            }
          : p
      );

      setAllPhotos(updatedPhotos);
      navigation.pop(2);
    } catch (error) {
      console.error("Error during upload to Firebase:", error);
    }
  };

  const selectImageFromGallery = async (prompt) => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access camera roll denied");
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
        await uploadImageToFirebase(uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  return (
    <SafeArea>
      <BackArrow navigation={navigation} />

      <Container>
        <Title>Create your own photo prompt.</Title>

        <InputContainer>
          <BioInput
            onChangeText={setPrompt}
            value={prompt}
            placeholder="Create prompt"
            placeholderTextColor="#527E65"
            multiline={true}
            textAlignVertical="top"
            blurOnSubmit={true}
            maxLength={50}
          />
          <MaxCharText>{prompt.length}/50 char</MaxCharText>
        </InputContainer>
        <CreateButton
          backgroundColor={prompt ? "#79d17c" : "gray"}
          onPress={onHandlePromptPressed}
          disabled={!prompt}
        >
          <CreateButtonText>Create</CreateButtonText>
        </CreateButton>
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  flex: 1;
  padding: 15px;
`;

const Title = styled(Text)`
  font-size: 25px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const InputContainer = styled(View)`
  width: 100%;
  align-items: center;
  margin-top: 200px;
  position: relative;
  justify-content: center;
  align-items: center;
`;

const BioInput = styled(TextInput)`
  width: 100%;
  border-radius: 20px;
  text-align: left;
  padding: 18px;
  font-family: poppins-600;
  font-size: 11px;
  color: #527e65;
  background-color: #ebebeb;
`;

const MaxCharText = styled(Text)`
  font-family: poppins-400;
  font-size: 8px;
  color: #527e65;
  margin-top: 10px;
`;

const CreateButton = styled(TouchableOpacity)`
  background-color: ${({ backgroundColor }) => backgroundColor};
  align-self: center;
  align-items: center;
  justify-content: space-evenly;
  border-radius: 30px;
  flex-direction: row;
  margin-top: 115px;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 150px;
`;

const CreateButtonText = styled(Text)`
  font-size: 14px;
  color: #fff;
  font-family: poppins-500;
`;
