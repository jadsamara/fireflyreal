import {
  addDoc,
  collection,
  arrayUnion,
  updateDoc,
  doc,
  setDoc,
} from "firebase/firestore";
import { database } from "../../../../../Config/firebase";

import {
  updatePostedSparks,
  deductUserLumins,
} from "../../../../../Slices/userSlice";

export const postGlow = async ({
  userNumber,
  tokenNotification,
  sparkImage,
  sparkTitle,
  fullAddress,
  totalNumberOfParticipants,
  totalNumberOfCurrentParticipants,
  luminsPrice,
  tags,
  sparkDescription,
  locationName,
  fullLocationName,
  useShortName,
  selectedDateOnCalendar,
  hangoutCoordinates,
  userHangoutName,
  acceptTerms,
  userLumins,
  dispatch,
}) => {
  const formatSelectedDates = (selectedDateOnCalendar) => {
    return Object.values(selectedDateOnCalendar).map((item) => ({
      id: item.id,
      time: item.time,
    }));
  };

  const createLocationDevicesCollection = async (docId) => {
    try {
      // Create a document in the ChatRooms collection with the provided docId
      await setDoc(doc(database, "DeviceLocations", docId), {});

      console.log("DeviceLocations created successfully!");
    } catch (error) {
      console.error("Error creating DeviceLocations:", error);
    }
  };

  const formattedDates = formatSelectedDates(selectedDateOnCalendar);

  const uploadDate = async () => {
    let chosenTime = null;
    if (formattedDates.length === 1) {
      chosenTime = formattedDates[0].time;
    }

    try {
      const docRef = await addDoc(collection(database, "Sparks"), {
        host: userNumber,
        sparkTitle,
        sparkImage,
        sparkDescription,
        tags,
        locationName,
        totalNumberOfParticipants: totalNumberOfParticipants,
        totalNumberOfCurrentParticipants,
        fullAddress,
        luminsPrice,
        currentlyJoinedProfileParticipants: [userNumber],
        timeOfPost: Date.now(),
        selectedDateOnCalendar: formattedDates,
        hangoutCoordinates,
        fullLocationName,
        useShortName,
        userHangoutName,
        termsAccepted: acceptTerms,
        notifToken: tokenNotification,
        allRequesters: [],
        chosenTime: chosenTime,
        isSparkActive: false,
        isCompleted: [],
        canceledUsers: [],
        neverShownUsers: [],
        userReviewList: [],
      });

      const docId = docRef.id;

      const userDocRef = doc(database, "Users", userNumber);
      await updateDoc(userDocRef, {
        postedSparksByUser: arrayUnion(docId),
        userLumins: userLumins - luminsPrice,
      });

      dispatch(updatePostedSparks(docId));
      dispatch(deductUserLumins(luminsPrice));

      createLocationDevicesCollection(docId);

      // navigation.navigate("Home");
    } catch (e) {
      console.log("Error uploading date:", e);
    }
  };

  await uploadDate();
};
