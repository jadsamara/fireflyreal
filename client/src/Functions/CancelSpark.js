import { auth, database } from "../Config/firebase";
import {
  doc,
  updateDoc,
  arrayRemove,
  arrayUnion,
  getDoc,
  deleteDoc,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { signOut, deleteUser } from "firebase/auth";

import { setUserData, clearUserData, setUser } from "../Slices/userSlice";

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

export const deleteUserFunction = async (userNumber, dispatch) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser || !userNumber) {
      throw new Error(
        "No authenticated user found. Or invalid user number provided"
      );
    }

    const userRef = doc(database, "Users", userNumber);
    const userDoc = await getDoc(userRef);

    if (!userDoc.exists()) {
      throw new Error("User document not found.");
    }

    // If requested
    const userData = userDoc.data();
    if (userData.sparksRequestedByUser) {
      await onHandleDeleteSparkRequest(
        userNumber,
        userData.sparksRequestedByUser
      );
    }

    // active or confirmed
    if (userData.currentConfirmedSparks || userData.currentActiveSparks) {
      await handleCurrentConfirmedSparks(
        userNumber,
        userData.sparksRequestedByUser
      );
    }

    // if spark completed already
    if (userData.pastSparks) {
      await handlePastSparks(userNumber, userData.sparksRequestedByUser);
    }

    await deleteChatMessagesBySender(userNumber);

    await signOut(auth); // Firebase sign-out
    await deleteDoc(userRef);
    await deleteUser(auth.currentUser);
    dispatch(setUser(null)); // Clear Redux user info
    dispatch(clearUserData());

    console.log("User account and related Sparks cleaned up successfully.");
  } catch (error) {}
};

// only if requested

const onHandleDeleteSparkRequest = async (
  userNumber,
  sparksRequestedByUser
) => {
  try {
    // Iterate through each Spark ID in sparksRequestedByUser
    const promises = sparksRequestedByUser.map(async (sparkId) => {
      const sparkRef = doc(database, "Sparks", sparkId);
      const sparkDoc = await getDoc(sparkRef);

      if (sparkDoc.exists()) {
        const sparkData = sparkDoc.data();

        // Remove the user's object from allRequesters
        const updatedRequesters = sparkData.allRequesters
          ? sparkData.allRequesters.filter(
              (requester) => requester.user !== userNumber
            )
          : [];

        // Update the Spark document
        await updateDoc(sparkRef, {
          allRequesters: updatedRequesters,
        });

        console.log(
          `Removed user ${userNumber} from allRequesters in Spark ${sparkId}`
        );
      } else {
        console.warn(`Spark with ID ${sparkId} not found.`);
      }
    });

    // Wait for all Spark updates to complete
    await Promise.all(promises);
    console.log("All requested Sparks have been handled.");
  } catch (error) {
    console.error("Error handling sparksRequestedByUser:", error);
  }
};

// works for both active and confirmed and posted spark by host
const handleCurrentConfirmedSparks = async (
  userNumber,
  currentConfirmedSparks
) => {
  try {
    const promises = currentConfirmedSparks.map(async (sparkId) => {
      const sparkRef = doc(database, "Sparks", sparkId);
      const sparkDoc = await getDoc(sparkRef);

      if (!sparkDoc.exists()) {
        console.warn(`Spark with ID ${sparkId} not found.`);
        return;
      }

      const sparkData = sparkDoc.data();
      const participants = sparkData.currentlyJoinedProfileParticipants || [];

      // If only one participant is left, delete the Spark
      if (participants.length === 1) {
        console.log(
          `Deleting Spark ${sparkId} as only one participant remains.`
        );
        await deleteDoc(sparkRef);
        return;
      }

      // If the user is the host
      if (sparkData.host === userNumber) {
        // Filter out the user from participants
        const updatedParticipants = participants.filter(
          (participant) => participant !== userNumber
        );

        if (updatedParticipants.length === 0) {
          // If no participants left after filtering, delete the Spark
          console.log(`Deleting Spark ${sparkId} as no participants remain.`);
          await deleteDoc(sparkRef);
          return;
        }

        // Assign the next participant as the new host
        const newHost = updatedParticipants[0];

        console.log(
          `Updating Spark ${sparkId}: Setting new host to ${newHost}.`
        );

        // Update the new host's document
        const newHostRef = doc(database, "Users", newHost);
        await updateDoc(newHostRef, {
          postedSparksByUser: arrayUnion(sparkId),
        });

        // Update the Spark document
        await updateDoc(sparkRef, {
          host: newHost,
          currentlyJoinedProfileParticipants: arrayRemove(userNumber),
          totalNumberOfCurrentParticipants:
            sparkData.totalNumberOfCurrentParticipants - 1, // Remove the user
        });

        console.log(`Host updated to ${newHost} for Spark ${sparkId}.`);
      } else {
        // If the user is not the host, simply remove them from the participants
        console.log(
          `Removing user ${userNumber} from participants in Spark ${sparkId}.`
        );
        await updateDoc(sparkRef, {
          currentlyJoinedProfileParticipants: arrayRemove(userNumber),
          totalNumberOfCurrentParticipants:
            sparkData.totalNumberOfCurrentParticipants - 1,
        });
      }
    });

    // Wait for all operations to complete
    await Promise.all(promises);
    console.log("All currentConfirmedSparks have been handled.");
  } catch (error) {
    console.error("Error handling currentConfirmedSparks:", error);
  }
};

const handlePastSparks = async (userNumber, pastSparks) => {
  try {
    const promises = pastSparks.map(async (sparkId) => {
      const sparkRef = doc(database, "Sparks", sparkId);
      const sparkDoc = await getDoc(sparkRef);

      if (!sparkDoc.exists()) {
        console.warn(`Spark with ID ${sparkId} not found.`);
        return;
      }

      const sparkData = sparkDoc.data();
      const participants = sparkData.currentlyJoinedProfileParticipants || [];

      // If only one participant is left, delete the Spark
      if (participants.length === 1) {
        console.log(
          `Deleting Spark ${sparkId} as only one participant remains.`
        );
        await deleteDoc(sparkRef);
        return;
      }

      // If the user is the host
      if (sparkData.host === userNumber) {
        // Filter out the user from participants
        const updatedParticipants = participants.filter(
          (participant) => participant !== userNumber
        );

        if (updatedParticipants.length === 0) {
          // If no participants left after filtering, delete the Spark
          console.log(`Deleting Spark ${sparkId} as no participants remain.`);
          await deleteDoc(sparkRef);
          return;
        }

        // Assign the next participant as the new host
        const newHost = updatedParticipants[0];

        console.log(
          `Updating Spark ${sparkId}: Setting new host to ${newHost}.`
        );

        // Update the new host's document
        const newHostRef = doc(database, "Users", newHost);
        await updateDoc(newHostRef, {
          postedSparksByUser: arrayUnion(sparkId),
        });

        // Update the Spark document
        await updateDoc(sparkRef, {
          host: newHost,
          currentlyJoinedProfileParticipants: arrayRemove(userNumber),
          totalNumberOfCurrentParticipants:
            sparkData.totalNumberOfCurrentParticipants - 1,
          isCompleted: arrayRemove(userNumber),
        });

        console.log(`Host updated to ${newHost} for Spark ${sparkId}.`);
      } else {
        // If the user is not the host, simply remove them from the participants
        console.log(
          `Removing user ${userNumber} from participants in Spark ${sparkId}.`
        );
        await updateDoc(sparkRef, {
          currentlyJoinedProfileParticipants: arrayRemove(userNumber),
          totalNumberOfCurrentParticipants:
            sparkData.totalNumberOfCurrentParticipants - 1,
          isCompleted: arrayRemove(userNumber),
        });
      }
    });

    // Wait for all operations to complete
    await Promise.all(promises);
    console.log("All currentConfirmedSparks have been handled.");
  } catch (error) {
    console.error("Error handling currentConfirmedSparks:", error);
  }
};

const deleteChatMessagesBySender = async (userNumber) => {
  try {
    // Reference the ChatMessages collection
    const chatMessagesRef = collection(database, "ChatMessages");

    // Query documents where sender matches userNumber
    const chatMessagesQuery = query(
      chatMessagesRef,
      where("sender", "==", userNumber)
    );

    // Get all matching documents
    const querySnapshot = await getDocs(chatMessagesQuery);

    if (querySnapshot.empty) {
      console.log("No chat messages found for the specified sender.");
      return;
    }

    // Iterate through the documents and delete them
    const deletePromises = querySnapshot.docs.map((docSnap) =>
      deleteDoc(doc(database, "ChatMessages", docSnap.id))
    );

    // Wait for all deletions to complete
    await Promise.all(deletePromises);

    console.log(
      `Successfully deleted all chat messages from sender: ${userNumber}`
    );
  } catch (error) {
    console.error("Error deleting chat messages by sender:", error);
  }
};
