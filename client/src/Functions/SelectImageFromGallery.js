import { Alert } from "react-native";
import React from "react";
import ImagePicker from "react-native-image-crop-picker";

export const selectImageFromGalleryFunc = async () => {
  try {
    const image = await ImagePicker.openPicker({
      width: 1000,
      height: 1500,
      cropping: true,
      freeStyleCropEnabled: true,
    });

    const uri = image.path;

    // Upload the selected image to Firebase Storage
    return uri;
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
