import React, { useState, createContext } from "react";

export const AuthenticationStackContext = createContext({});

export const AuthenticationStackProvider = ({ children }) => {
  const [verificationId, setVerificationId] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("03/03/2002");
  const [bio, setBio] = useState("");

  const [profilePicture, setProfilePicture] = useState("");

  const [countryCode, setCountryCode] = useState("+1");
  const [countryFlag, setCountryFlag] = useState("CA");

  const [profilePictureURI, setProfilePictureURI] = useState("");
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const [isPhotoIDVerified, setIsPhotoIDVerified] = useState(0);

  const [allPhotos, setAllPhotos] = useState([
    {
      id: 1,
      picture: "",
      key: 1,
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
    {
      id: 2,
      picture: "",
      key: 2,
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
    {
      id: 3,
      picture: "",
      key: 3,
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
    {
      id: 4,
      picture: "",
      key: 4,
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
    {
      id: 5,
      picture: "",
      key: 5,
      prompt: "Add Prompt",
      disabledDrag: true, // Set to true if no picture, false otherwise
      disabledReSorted: true,
    },
    {
      id: 6,
      picture: "",
      key: 6,
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
    ethnicity: [],
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
        countryCode,
        setCountryCode,
        countryFlag,
        setCountryFlag,
      }}
    >
      {children}
    </AuthenticationStackContext.Provider>
  );
};
