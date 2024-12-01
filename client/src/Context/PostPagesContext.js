import React, { useState, createContext, useEffect, useContext } from "react";
import { AuthContext } from "../Config/AuthContext";

export const PostDateContext = createContext({});

export const PostDateProvider = ({ children }) => {
  const { location } = useContext(AuthContext);

  const [sparkImage, setSparkImage] = useState("");
  const [sparkTitle, setSparkTitle] = useState("");
  const [sparkDescription, setSparkDescription] = useState("");

  const [fullAddress, setFullAddress] = useState("");
  const [totalNumberOfParticipants, setTotalNumberOfParticipants] = useState(1);
  const [
    totalNumberOfCurrentParticipants,
    setTotalNumberOfCurrentParticipants,
  ] = useState(1);
  const [luminsPrice, setLuminsPrice] = useState(10);
  const [tags, setTags] = useState([]);
  const [distanceFromUser, setDistanceFromUser] = useState(0);
  const [locationName, setLocationName] = useState("");
  const [fullLocationName, setFullLocationName] = useState("");
  const [useShortName, setUseShortName] = useState(false);
  const [selectedDateOnCalendar, setSelectedDateOnCalendar] = useState({});
  const [hangoutCoordinates, setHangoutCoordinates] = useState(location);
  const [userHangoutName, setUserHangoutName] = useState("");
  const [hangoutPhotos, setHangoutPhotos] = useState([""]);

  const [acceptTerms, setAcceptTerms] = useState(false);

  return (
    <PostDateContext.Provider
      value={{
        sparkImage,
        setSparkImage,
        sparkTitle,
        setSparkTitle,
        fullAddress,
        setFullAddress,
        totalNumberOfParticipants,
        setTotalNumberOfParticipants,
        totalNumberOfCurrentParticipants,
        setTotalNumberOfCurrentParticipants,
        luminsPrice,
        setLuminsPrice,
        tags,
        setTags,
        distanceFromUser,
        setDistanceFromUser,
        sparkDescription,
        setSparkDescription,
        locationName,
        setLocationName,
        fullLocationName,
        setFullLocationName,
        useShortName,
        setUseShortName,
        selectedDateOnCalendar,
        setSelectedDateOnCalendar,
        hangoutCoordinates,
        setHangoutCoordinates,
        userHangoutName,
        setUserHangoutName,
        hangoutPhotos,
        setHangoutPhotos,
        acceptTerms,
        setAcceptTerms,
      }}
    >
      {children}
    </PostDateContext.Provider>
  );
};
