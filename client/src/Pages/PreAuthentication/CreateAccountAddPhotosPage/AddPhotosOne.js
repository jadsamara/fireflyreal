import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";
import * as ImagePicker from "expo-image-picker";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";
import { FontAwesome } from "@expo/vector-icons";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { auth, storage } from "../../../Config/firebase";

import {
  ProgressBar,
  ContinueButton,
  BackArrow,
} from "../../../Components/PreAuthentication/";

import FastImage from "react-native-fast-image";

export const AddPhotosOne = ({ navigation }) => {
  const windowHeight = useWindowDimensions().height;
  const { setProfilePicture, profilePicture } = useContext(
    AuthenticationStackContext
  );

  useEffect(() => {
    if (profilePicture) {
      FastImage.preload([{ uri: profilePicture }]);
    }
  }, [profilePicture]);

  const selectImageFromGallery = async () => {
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

        console.log("Selected image URI:", uri); // Log the selected image URI to verify it's not undefined or null

        // Upload the selected image to Firebase Storage
        await uploadImageToFirebase(uri);
      }
    } catch (error) {
      console.error("Error selecting image:", error);
    }
  };

  const uploadImageToFirebase = async (imageUri) => {
    try {
      const response = await fetch(imageUri);
      const blob = await response.blob();

      // Generate a unique filename for the uploaded image
      const fileName = `${auth.currentUser.uid}-${0}-profile-picture.jpg`;
      const storageRef = ref(storage, `profile-pictures/${fileName}`);

      // Upload the image to Firebase Storage
      await uploadBytes(storageRef, blob);

      // Get the download URL of the uploaded image
      const downloadURL = await getDownloadURL(storageRef);
      setProfilePicture(downloadURL);
      // Perform further actions with the download URL, such as updating the user's profile picture in Firestore or displaying it in your app
      console.log("Image uploaded successfully:", downloadURL);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const onHandleNavigate = () => {
    navigation.navigate("AddPhotosTwo");
  };

  return (
    <SafeArea style={[{ minHeight: Math.round(windowHeight) }]}>
      <BackArrow navigation={navigation} />

      <Container>
        <Header>Show who you are.</Header>
        <UploadProfilePictureContainer>
          <UploadProfilePictureButton onPress={selectImageFromGallery}>
            {!profilePicture ? (
              <>
                <FontAwesome name="camera" size={74} color="#379E5F" />
                <PlusLogo>
                  <PlusLogoText>+</PlusLogoText>
                </PlusLogo>
              </>
            ) : (
              <ProfilePictureImage
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: profilePicture,
                }}
              />
            )}
          </UploadProfilePictureButton>
        </UploadProfilePictureContainer>

        <ContinueButton onPress={onHandleNavigate} />
        <ProgressBar width={"40%"} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
`;

const Header = styled(Text)`
  color: black;
  font-family: "poppins-700";
  font-size: 34px;
  margin-top: 25px;
  text-align: center;
`;

const UploadProfilePictureContainer = styled(View)`
  align-items: center;
  justify-content: center;
  height: 70%;
`;

const UploadProfilePictureButton = styled(TouchableOpacity)`
  width: 150px;
  height: 150px;
  background-color: #e3e1e1;
  border-radius: 100px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const PlusLogo = styled(View)`
  height: 28px;
  width: 28px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 30px;
  right: 20px;
  border-radius: 100px;
  background-color: #66bf88;
`;

const PlusLogoText = styled(Text)`
  color: white;
  font-size: 22px;
  text-align: center;
`;

const ProfilePictureImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`;
