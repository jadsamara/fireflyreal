import React, { useState, createContext } from "react";

export const AuthenticationStackContext = createContext({});

export const AuthenticationStackProvider = ({ children }) => {
  const [verificationId, setVerificationId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("03/03/2002");
  const [bio, setBio] = useState("");

  const [profilePicture, setProfilePicture] = useState("");

  const [profilePictureURI, setProfilePictureURI] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const [isPhotoIDVerified, setIsPhotoIDVerified] = useState(false);

  const [allPhotos, setAllPhotos] = useState([
    { id: 1, picture: "", prompt: "Add Prompt" },
    { id: 2, picture: "", prompt: "Add Prompt" },
    { id: 3, picture: "", prompt: "Add Prompt" },
    { id: 4, picture: "", prompt: "Add Prompt" },
    { id: 5, picture: "", prompt: "Add Prompt" },
    { id: 6, picture: "", prompt: "Add Prompt" },
  ]);

  const [recordedAudioLink, setRecordedAudioLink] = useState(null);

  const [voicePrompt, setVoicePrompt] = useState("Interesting Fact About me");

  return (
    <AuthenticationStackContext.Provider
      value={{
        verificationId,
        setVerificationId,
        name,
        setName,
        gender,
        setGender,
        age,
        setAge,
        profilePicture,
        setProfilePicture,
        allPhotos,
        setAllPhotos,
        bio,
        setBio,
        profilePictureURI,
        setProfilePictureURI,
        front,
        setFront,
        voicePrompt,
        setVoicePrompt,
        recordedAudioLink,
        setRecordedAudioLink,
        isPhotoIDVerified,
        setIsPhotoIDVerified,
        back,
        setBack,
      }}
    >
      {children}
    </AuthenticationStackContext.Provider>
  );
};
