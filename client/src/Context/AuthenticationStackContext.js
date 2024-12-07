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

  const [isPhotoIDVerified, setIsPhotoIDVerified] = useState(0);

  const [allPhotos, setAllPhotos] = useState([
    {
      id: 1,
      picture: "",
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
    {
      id: 2,
      picture: "",
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
    {
      id: 3,
      picture: "",
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
    {
      id: 4,
      picture: "",
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
    {
      id: 5,
      picture: "",
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
    {
      id: 6,
      picture: "",
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
  ]);
  const [recordedAudioLink, setRecordedAudioLink] = useState(null);
  const [voicePrompt, setVoicePrompt] = useState("Interesting Fact About me");

  const [homeTown, setHomeTown] = useState("");
  const [languagesSpoken, setLanguagesSpoken] = useState({
    languagesList: [],
    isHidden: false,
  });

  const [userEthnicity, setUserEthnicity] = useState({
    ethnicity: "",
    isHidden: false,
  });

  const [userReligion, setUserReligion] = useState({
    religion: "",
    isHidden: false,
  });

  const [userPoliticalOpinion, setUserPoliticalOpinion] = useState({
    opinion: "",
    isHidden: false,
  });

  const [userSchool, setUserSchool] = useState({
    school: "",
    isHidden: false,
  });

  const [userHighestSchoolDegree, setUserHighestSchoolDegree] = useState({
    schoolGrad: "",
    isHidden: false,
  });

  const [userWork, setUserWork] = useState({
    company: "",
    isHidden: false,
  });

  const [userJobTitle, setUserJobTitle] = useState({
    title: "",
    isHidden: false,
  });

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
        homeTown,
        setHomeTown,
        languagesSpoken,
        setLanguagesSpoken,
        userEthnicity,
        setUserEthnicity,
        userReligion,
        setUserReligion,
        userPoliticalOpinion,
        setUserPoliticalOpinion,
        userSchool,
        setUserSchool,
        userHighestSchoolDegree,
        setUserHighestSchoolDegree,
        userWork,
        setUserWork,
        userJobTitle,
        setUserJobTitle,
      }}
    >
      {children}
    </AuthenticationStackContext.Provider>
  );
};
