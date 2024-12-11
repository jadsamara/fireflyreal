import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, Alert } from "react-native";
import styled from "styled-components/native";
import { useSelector } from "react-redux";

import { database } from "../../../Config/firebase";
import { doc, updateDoc } from "firebase/firestore";

import { setNewBio } from "../../../Slices/userSlice";
import { useDispatch } from "react-redux";

export const BioComponent = ({ bio, setBio }) => {
  const userData = useSelector((state) => state.user.userData);
  const userNumber = userData.userNumber;
  const [initialBio, setInitialBio] = useState(bio);

  const dispatch = useDispatch();

  const uploadNewBio = async () => {
    try {
      if (initialBio !== bio) {
        setInitialBio(bio);
        await updateDoc(doc(database, "Users", userNumber), {
          userBio: bio,
        });
        dispatch(
          setNewBio({
            userBio: bio,
          })
        );
      }
      Alert.alert("Your bio has been updated!");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container>
      <Title>Bio</Title>
      <InputContainer>
        <BioInput
          onChangeText={setBio}
          value={bio}
          placeholder="Start typing here"
          placeholderTextColor="black"
          multiline={true}
          textAlignVertical="top"
          blurOnSubmit={true}
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        />
        <MaxCharText>{bio.length}/250 char</MaxCharText>
      </InputContainer>
      <UpdateBioButton
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5, // For Android
        }}
        backgroundColor={initialBio === bio ? "#b1b1b1" : "green"}
        disabled={initialBio === bio}
        onPress={uploadNewBio}
      >
        <UpdateBioButtonText>Confirm Bio Changes</UpdateBioButtonText>
      </UpdateBioButton>
    </Container>
  );
};

const Container = styled(View)`
  width: 95%;
  padding: 10px;
  margin-top: 10px;
  align-self: center;
`;

const Title = styled(Text)`
  font-size: 15px;
  color: black;
  font-family: poppins-500;
`;

const InputContainer = styled(View)`
  width: 100%;
  align-items: center;
  position: relative;
  margin-top: 10px;
`;

const BioInput = styled(TextInput)`
  width: 95%;
  height: 170px;
  background-color: #e0dfdf;
  border-radius: 20px;
  text-align: left;
  padding: 18px;
  font-family: poppins-400;
  font-size: 12px;
`;

const MaxCharText = styled(Text)`
  font-family: poppins-400;
  font-size: 10px;
  position: absolute;
  bottom: 10px;
  right: 30px;
`;

const UpdateBioButton = styled(TouchableOpacity)`
  width: 60%;
  height: 50px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  justify-content: center;
  align-items: center;
  align-self: center;
  margin-top: 40px;
  margin-bottom: 50px;
  border-radius: 20px;
`;

const UpdateBioButtonText = styled(Text)`
  font-size: 13px;
  color: white;
  font-family: poppins-500;
`;
