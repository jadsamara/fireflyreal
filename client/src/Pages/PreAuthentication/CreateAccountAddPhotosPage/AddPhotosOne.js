import React, { useEffect, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Alert,
} from "react-native";
import styled from "styled-components/native";

import { SafeArea } from "../../../Components/GlobalComponents/SafeArea";
import ImagePicker from "react-native-image-crop-picker";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";
import { FontAwesome, FontAwesome6 } from "@expo/vector-icons";
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
      const image = await ImagePicker.openPicker({
        width: 300,
        height: 300,
        cropping: true,
        mediaType: "photo",
      });

      const uri = image.path;

      // Upload the selected image to Firebase Storage
      await uploadImageToFirebase(uri);
    } catch (error) {
      if (error.code === "E_PICKER_CANCELLED") {
        // Handle case where user cancels the image picker
        Alert.alert("Image selection cancelled");
        return;
      }
      console.error("Error selecting image:", error);
      Alert.alert("Error", "Failed to select image");
    }
  };

  const uploadImageToFirebase = async (imageUri) => {
    try {
      if (imageUri) {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Generate a unique filename for the uploaded image
        const fileName = `${auth.currentUser.uid}-${0}-profile-picture.jpg`;
        const storageRef = ref(storage, `profile-pictures/${fileName}`);

        await uploadBytes(storageRef, blob);

        const downloadURL = await getDownloadURL(storageRef);
        setProfilePicture(downloadURL);
      }
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
        <Header>Set your profile picture.</Header>
        <UploadProfilePictureContainer>
          <UploadProfilePictureButton
            onPress={selectImageFromGallery}
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5, // For Android
            }}
          >
            {!profilePicture ? (
              <>
                <FontAwesome name="camera" size={94} color="#527e65" />
                <PlusLogoContainer>
                  <PlusLogo name="circle-plus" size={40} color="#79b17c" />
                </PlusLogoContainer>
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

        <SubTitle>
          *Please select a clear picture of your face. Your profile pic will be
          used for our mandatory facial recognition screen.
        </SubTitle>

        <ContinueButton onPress={onHandleNavigate} bottom={120} />
        <ProgressBar width={"10%"} bottom={0} />
      </Container>
    </SafeArea>
  );
};

const Container = styled(View)`
  height: 100%;
  width: 100%;
  padding: 15px;
`;

const Header = styled(Text)`
  font-size: 36px;
  color: black;
  font-family: poppins-900;
  margin-left: 15px;
`;

const UploadProfilePictureContainer = styled(View)`
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 50px;
`;

const UploadProfilePictureButton = styled(TouchableOpacity)`
  width: 220px;
  height: 220px;
  background-color: #e3e1e1;
  border-radius: 1000px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const PlusLogo = styled(FontAwesome6)`
  border-radius: 100px;
`;

const PlusLogoContainer = styled(View)`
  background-color: white;
  bottom: 55px;
  right: 45px;
  border-radius: 100px;
  position: absolute;
`;

const ProfilePictureImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  border-radius: 10000px;
`;

const SubTitle = styled(Text)`
  font-size: 14px;
  color: black;
  font-family: poppins-500;
  text-align: center;
  width: 80%;
  align-self: center;
`;
