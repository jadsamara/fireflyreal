import { auth, database } from "../Config/firebase";
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
  deleteDoc,
} from "firebase/firestore";

import { setUserData } from "../Slices/userSlice";

export const cancelSpark = async (
  spark,
  userNumber,
  timeLeftInHours,
  deposit,
  dispatch
) => {
  if (!spark || !userNumber) {
    console.error("Invalid spark or user number provided.");
    return;
  }

  const sparkDocID = spark.documentId;
  const isHost = spark.host === userNumber;
  const participants = spark.currentlyJoinedProfileParticipants.filter(
    (participant) => participant !== spark.host
  ); // Exclude the host from participants array
  const totalParticipants = participants.length + 1; // Add host to participants count
  const alreadyCanceled = spark.canceledUsers || []; // Array of already canceled users
  const canceledCount = alreadyCanceled.length;

  try {
    // If there's only one host in the spark
    if (totalParticipants === 1) {
      console.log(`No penalty applied: Only one user in the spark.`);
      await deleteDoc(doc(database, "Sparks", sparkDocID));
      const userRef = doc(database, "Users", userNumber);
      await updateDoc(userRef, {
        userLumins: userDoc.data().userLumins + deposit, // Deduct penalty from user's current lumins
        penalties: arrayUnion({
          sparkDocID,
          penalty: 0,
          canceledAt: new Date().toISOString(),
        }),
        currentActiveSparks: arrayRemove(sparkDocID),
        currentConfirmedSparks: arrayRemove(sparkDocID),
        postedSparksByUser: arrayRemove(sparkDocID),
      });
      return;
    }

    // Fetch the user document to update their penalties
    const userRef = doc(database, "Users", userNumber);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error("User does not exist.");
      return;
    }

    let penalty;
    if (isHost) {
      if (canceledCount === 0) {
        // Host cancels first
        penalty =
          getBasePenalties(true, timeLeftInHours, deposit) +
          getAdditionalPenaltiesHostFirst(timeLeftInHours);
      } else {
        // Host cancels after participants
        const Rhost = canceledCount / (totalParticipants - 1);
        penalty =
          getBasePenalties(true, timeLeftInHours, deposit) * (1 - Rhost);
      }
    } else {
      // Participant cancels
      const Rparticipant = canceledCount / totalParticipants;
      penalty =
        getBasePenalties(false, timeLeftInHours, deposit) * (1 - Rparticipant);
    }

    // Update user penalties
    await updateDoc(userRef, {
      userLumins: userDoc.data().userLumins + deposit + Math.round(penalty), // Deduct penalty from user's current lumins
      penalties: arrayUnion({
        sparkDocID,
        penalty: Math.round(penalty),
        canceledAt: new Date().toISOString(),
      }),
      currentActiveSparks: arrayRemove(sparkDocID),
      currentConfirmedSparks: arrayRemove(sparkDocID),
      postedSparksByUser: arrayRemove(sparkDocID),
    });

    const sparkRef = doc(database, "Sparks", sparkDocID);

    if (isHost) {
      if (participants.length === 1) {
        // Handle case where only one participant remains
        const remainingParticipant = participants[0];
        const remainingUserRef = doc(database, "Users", remainingParticipant);
        const remainingUserDoc = await getDoc(remainingUserRef);

        if (remainingUserDoc.exists()) {
          const remainingUserLumins = remainingUserDoc.data().userLumins || 0;
          await updateDoc(remainingUserRef, {
            userLumins: remainingUserLumins + deposit, // Refund deposit or adjust as needed
            penalties: arrayUnion({
              sparkDocID,
              penalty: 0, // No penalty for remaining participant
              canceledAt: new Date().toISOString(),
            }),
            currentActiveSparks: arrayRemove(sparkDocID),
            currentConfirmedSparks: arrayRemove(sparkDocID),
            postedSparksByUser: arrayRemove(sparkDocID),
          });
        }

        // Delete the spark
        await deleteDoc(sparkRef);
        console.log(
          `Spark ${sparkDocID} deleted as only one participant remained.`
        );
      } else {
        // Promote the next participant to host
        const newHost = participants[0];
        await updateDoc(sparkRef, {
          host: newHost,
          currentlyJoinedProfileParticipants: arrayRemove(userNumber),
          totalNumberOfCurrentParticipants:
            spark.totalNumberOfCurrentParticipants - 1,
          canceledUsers: arrayUnion(userNumber),
        });

        const newHostRef = doc(database, "Users", newHost);
        await updateDoc(newHostRef, {
          postedSparksByUser: arrayUnion(sparkDocID),
        });

        console.log(`Host transferred to ${newHost} for Spark ${sparkDocID}.`);
      }
    } else {
      // If a participant cancels
      await updateDoc(sparkRef, {
        canceledUsers: arrayUnion(userNumber),
        currentlyJoinedProfileParticipants: arrayRemove(userNumber),
        totalNumberOfCurrentParticipants:
          spark.totalNumberOfCurrentParticipants - 1, // Remove the participant
      });
      console.log(
        `Participant ${userNumber} removed from Spark ${sparkDocID}.`
      );
    }

    const updatedUserDoc = await getDoc(userRef);
    const updatedUserData = updatedUserDoc.exists()
      ? updatedUserDoc.data()
      : null;
    if (updatedUserData) {
      dispatch(setUserData(updatedUserData));
    }
  } catch (error) {}
};

export const getBasePenalties = (isHost, timeLeftInHours, deposit) => {
  if (isHost) {
    if (timeLeftInHours > 24) {
      return -2; // Default green color
    } else if (timeLeftInHours <= 24 && timeLeftInHours > 18) {
      return -4; // Yellow
    } else if (timeLeftInHours <= 18 && timeLeftInHours > 12) {
      return -6; // Orange
    } else if (timeLeftInHours <= 12 && timeLeftInHours > 6) {
      return -8; // Red
    } else if (timeLeftInHours <= 6) {
      return -deposit; // Purple
    } else {
      return 0;
    }
  }
  if (!isHost) {
    if (timeLeftInHours > 24) {
      return 0; // Default green color
    } else if (timeLeftInHours <= 24 && timeLeftInHours > 18) {
      return -2; // Yellow
    } else if (timeLeftInHours <= 18 && timeLeftInHours > 12) {
      return -4; // Orange
    } else if (timeLeftInHours <= 12 && timeLeftInHours > 6) {
      return -6; // Red
    } else if (timeLeftInHours <= 6) {
      return -deposit; // Purple
    } else {
      return 0;
    }
  }
};

export const getAdditionalPenaltiesHostFirst = (timeLeftInHours) => {
  if (timeLeftInHours > 24) {
    return -2; // Default green color
  } else if (timeLeftInHours <= 24 && timeLeftInHours > 18) {
    return -3; // Yellow
  } else if (timeLeftInHours <= 18 && timeLeftInHours > 12) {
    return -4; // Orange
  } else if (timeLeftInHours <= 12 && timeLeftInHours > 6) {
    return -5; // Red
  } else if (timeLeftInHours <= 6) {
    return -5; // Purple
  } else {
    return 0;
  }
};

export const getCancellationPenaltyWarning = (
  spark,
  userNumber,
  timeLeftInHours,
  deposit
) => {
  if (!spark || !userNumber) {
    console.error("Invalid spark or user number provided.");
    return null;
  }

  const isHost = spark.host === userNumber;
  const participants = spark.currentlyJoinedProfileParticipants.filter(
    (participant) => participant !== spark.host
  ); // Exclude the host from participants array
  const totalParticipants = participants.length + 1; // Add host to participants count
  const alreadyCanceled = spark.canceledUsers || []; // Array of already canceled users
  const canceledCount = alreadyCanceled.length;

  // If there's only one user in the spark, no penalty
  if (totalParticipants === 1) {
    return 0;
  }

  let penalty;
  if (isHost) {
    if (canceledCount === 0) {
      // Host cancels first
      penalty =
        getBasePenalties(true, timeLeftInHours, deposit) +
        getAdditionalPenaltiesHostFirst(timeLeftInHours);
    } else {
      // Host cancels after participants
      const Rhost = canceledCount / (totalParticipants - 1);
      penalty = getBasePenalties(true, timeLeftInHours, deposit) * (1 - Rhost);
    }
  } else {
    // Participant cancels
    const Rparticipant = canceledCount / totalParticipants;
    penalty =
      getBasePenalties(false, timeLeftInHours, deposit) * (1 - Rparticipant);
  }

  return Math.round(penalty);
};

export const cancelSparkRequest = async (spark, userNumber, dispatch) => {
  if (!spark || !userNumber) {
    console.error("Invalid spark or user number provided.");
    return;
  }

  const sparkDocID = spark.documentId;

  try {
    // Reference the Spark document
    const sparkRef = doc(database, "Sparks", sparkDocID);

    // Fetch user document to update lumins and other fields
    const userRef = doc(database, "Users", userNumber);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      console.error("User document does not exist.");
      return;
    }

    const userLumins = userDoc.data().userLumins || 0; // Default to 0 if undefined
    const luminsPrice = spark.luminsPrice || 0; // Use Spark's lumins price for refund

    // Update the `allRequesters` array in the Spark document
    const allRequesters = spark.allRequesters || [];
    const updatedRequesters = allRequesters.filter(
      (requester) => requester.user !== userNumber
    );

    await updateDoc(sparkRef, {
      allRequesters: updatedRequesters,
    });

    // Update the User document to:
    // - Remove the Spark ID from `sparksRequestedByUser`
    // - Adjust user's lumins
    await updateDoc(userRef, {
      userLumins: userLumins + luminsPrice, // Refund lumins price to user
      sparksRequestedByUser: arrayRemove(sparkDocID),
    });

    // Fetch the updated user document
    const updatedUserDoc = await getDoc(userRef);

    if (updatedUserDoc.exists()) {
      const updatedUserData = updatedUserDoc.data();

      // Dispatch updated user data to application state
      dispatch(setUserData(updatedUserData));
    }

    console.log(
      `Successfully removed user ${userNumber} from Spark ${sparkDocID}. Lumins refunded: ${luminsPrice}`
    );
  } catch (error) {
    console.error("Error removing request:", error);
  }
};
