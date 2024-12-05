import React, { useState, createContext } from "react";

export const ProfilePageContext = createContext({});

export const ProfilePageProvider = ({ children }) => {
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

  return (
    <ProfilePageContext.Provider
      value={{
        allPhotos,
        setAllPhotos,
      }}
    >
      {children}
    </ProfilePageContext.Provider>
  );
};
