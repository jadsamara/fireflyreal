import { database } from "../Config/firebase";
import { doc, getDoc } from "firebase/firestore";
import React from "react";

export const getUserInfo = async (phoneNumber) => {
  try {
    const userDocRef = doc(database, "Users", phoneNumber);
    const userDocSnapshot = await getDoc(userDocRef);

    if (userDocSnapshot.exists()) {
      // Extract user data from the document snapshot
      const userData = userDocSnapshot.data();

      return userData;
    } else {
      // User document does not exist
      return null;
    }
  } catch (error) {
    console.error("Error getting user information:", error);
    return null;
  }
};
