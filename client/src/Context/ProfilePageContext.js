import React, { useState, createContext } from "react";

export const ProfilePageContext = createContext({});

export const ProfilePageProvider = ({ children }) => {
  const [allPhotos, setAllPhotos] = useState([
    { id: 1, picture: "", prompt: "Add Prompt" },
    { id: 2, picture: "", prompt: "Add Prompt" },
    { id: 3, picture: "", prompt: "Add Prompt" },
    { id: 4, picture: "", prompt: "Add Prompt" },
    { id: 5, picture: "", prompt: "Add Prompt" },
    { id: 6, picture: "", prompt: "Add Prompt" },
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
