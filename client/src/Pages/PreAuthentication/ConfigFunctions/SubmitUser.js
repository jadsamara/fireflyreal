import { Alert, Text, TouchableOpacity } from "react-native";
import React, { useContext } from "react";
import styled from "styled-components";

import { auth, database } from "../../../Config/firebase";

import { setDoc, doc, getDoc } from "firebase/firestore";

import { AuthenticationStackContext } from "../../../Context/AuthenticationStackContext";

import { setUserData } from "../../../Slices/userSlice";
import { useDispatch } from "react-redux";

export const SubmitUser = ({ navigation }) => {
  const dispatch = useDispatch();
  const {
    verificationId,
    name,
    gender,
    age,
    profilePicture,
    allPhotos,
    bio,
    recordedAudioLink,
    isPhotoIDVerified,
    voicePrompt,
    homeTown,
    languagesSpoken,
    userEthnicity,
    userReligion,
    userPoliticalOpinion,
    userSchool,
    userHighestSchoolDegree,
    userWork,
    userJobTitle,
  } = useContext(AuthenticationStackContext);

  const handleSubmit = async () => {
    try {
      if (name) {
        const userNumber = auth.currentUser.phoneNumber;
        const currentDate = new Date();

        const futureDate = new Date(
          currentDate.getTime() + 7 * 24 * 60 * 60 * 1000
        );
        try {
          await setDoc(doc(database, "Users", userNumber), {
            name,
            gender,
            age,
            userBio: bio,
            userNumber,
            verificationId,
            isVerified: isPhotoIDVerified,
            profilePicture,
            allPhotos,
            userLumins: 30,
            numberOfRatings: 0,
            averageUserRating: 0,
            postedSparksByUser: [],
            sparksRequestedByUser: [],
            currentActiveSparks: [],
            currentConfirmedSparks: [],
            notificationsArray: [],
            pastSparks: [],
            userInformation: [
              languagesSpoken,
              userEthnicity,
              userReligion,
              userPoliticalOpinion,
              userSchool,
              userHighestSchoolDegree,
              userWork,
              userJobTitle,
            ],
            homeTown: homeTown,
            voiceAudioObj: {
              recordedAudioLink: recordedAudioLink,
              voicePrompt: voicePrompt,
            },
            filters: [
              { maxDistance: 50, isEnabled: true },
              { city: "Toronto, Canada", isEnabled: true },
              {
                date: { startDate: currentDate, futureDate: futureDate },
                isEnabled: true,
              },
              { maxPeople: 10, isEnabled: true },
              { minPeople: 2, isEnabled: true },
              { vibes: "All the vibes", isEnabled: true },
              { tags: [], isEnabled: true },
            ],
            accountStatus: "active",
          });
        } catch (e) {
          console.log(e);
        }

        const userDocRef = doc(database, "Users", userNumber);
        const userDocSnapshot = await getDoc(userDocRef);
        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          dispatch(setUserData(userData));
        }
      } else {
        Alert.alert("Incomplete Fields");
      }
    } catch (e) {}
  };

  return (
    <ButtonContainer onPress={handleSubmit}>
      <ButtonText>Finish</ButtonText>
    </ButtonContainer>
  );
};

const ButtonContainer = styled(TouchableOpacity)`
  width: 165px;
  height: 40px;
  border-radius: 18px;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 120px;
  right: 20px;
  background-color: #527e65;
`;

const ButtonText = styled(Text)`
  color: white;
  font-size: 18px;
  font-family: poppins-600;
`;
