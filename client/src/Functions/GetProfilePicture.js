import React from "react";
import { database } from "../Config/firebase";
import { doc, getDoc } from "firebase/firestore";

// Function to fetch profile picture based on phone number
export const getProfilePicture = async (phoneNumber) => {
  try {
    // Get the user document from Firestore
    const userDocRef = doc(database, "Users", phoneNumber);
    const userDocSnap = await getDoc(userDocRef);

    // Check if the document exists
    if (userDocSnap.exists()) {
      // Get the profile picture from the user document
      const userData = userDocSnap.data();
      return userData.profilePicture;
    } else {
      console.error("User document not found for phone number:", phoneNumber);
      return null; // Return null if user document not found
    }
  } catch (error) {
    console.error("Error fetching user profile picture:", error);
    return null; // Return null if error occurs
  }
};
