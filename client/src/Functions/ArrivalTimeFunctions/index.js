import { database } from "../../Config/firebase";
import { doc, getDoc, collection } from "firebase/firestore";

export const getTimeState = (timeRemaining) => {
  const currentTime = Date.now(); // Get the current time in ms
  const targetTime = currentTime + timeRemaining; // Calculate the target time

  // Calculate the difference in minutes between the current time and the target time
  const minutesDifference = (targetTime - currentTime) / 60000;

  // Return based on the difference
  if (minutesDifference >= -10 && minutesDifference <= 10) {
    return 0; // Within 10 minutes
  } else if (minutesDifference < -10 && minutesDifference >= -15) {
    return 1; // More than 10 minutes and up to 15 minutes late
  } else if (minutesDifference < -15 && minutesDifference >= -30) {
    return 2; // More than 15 minutes and up to 30 minutes late
  } else if (minutesDifference < -30 && minutesDifference >= -45) {
    return 3; // More than 30 minutes and up to 45 minutes late
  } else if (minutesDifference < -45 && minutesDifference >= -60) {
    return 4; // More than 45 minutes and up to 60 minutes late
  }

  // Return null if none of the conditions match
  return null;
};

export const getBackgroundColor = (timeState) => {
  switch (timeState) {
    case 0:
      return "#79d17c"; // Green
    case 1:
      return "#ffeb3b"; // Yellow
    case 2:
      return "#ff9800"; // Orange
    case 3:
      return "#f44336"; // Red
    case 4:
      return "#9c27b0"; // Purple
    default:
      return "#79d17c"; // Default green color
  }
};

export const getType = (timeState) => {
  switch (timeState) {
    case 0:
      return "On Time"; // Green
    case 1:
      return "Little Late"; // Yellow
    case 2:
      return "Running Late"; // Orange
    case 3:
      return "Late"; // Red
    case 4:
      return "Very Late"; // Purple
    default:
      return "On Time"; // Default green color
  }
};

export const onHandleRefundString = (timeState) => {
  switch (timeState) {
    case 0:
      return "+2"; // Green
    case 1:
      return "-2"; // Yellow
    case 2:
      return "-4"; // Orange
    case 3:
      return "-6"; // Red
    case 4:
      return "-8"; // Purple
    default:
      return "+2"; // Default green color
  }
};

export const onHandleRefundInteger = (timeState) => {
  switch (timeState) {
    case 0:
      return 2;
    case 1:
      return -2; // Yellow
    case 2:
      return -4; // Orange
    case 3:
      return -6; // Red
    case 4:
      return -8; // Purple
    default:
      return +2; // Default green color
  }
};

export const getArrivalData = async (userId, docID) => {
  try {
    const arrivedPartyRef = collection(database, "ArrivedParty");
    const arrivedPartyDocRef = doc(arrivedPartyRef, docID);

    const docSnap = await getDoc(arrivedPartyDocRef);

    if (docSnap.exists()) {
      const currentData = docSnap.data();
      const arrivals = currentData.arrivals || [];

      const userExists = arrivals.some(
        (arrival) => arrival.phoneNumber === userId
      );

      if (!userExists) {
        console.log("Not in array");
      } else {
        const currentUserArrival = arrivals.find(
          (arrival) => arrival.phoneNumber === userId
        );

        return currentUserArrival;
      }
    }
  } catch (error) {
    console.error("Error setting arrival data:", error);
  }
};
