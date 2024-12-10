import React, { useState, createContext } from "react";
import { useSelector } from "react-redux";

export const ProfilePageContext = createContext({});

export const ProfilePageProvider = ({ children }) => {
  const userData = useSelector((state) => state.user.userData);

  const [allPhotos, setAllPhotos] = useState(userData.allPhotos);

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
