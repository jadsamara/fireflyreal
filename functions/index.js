const functions = require("firebase-functions");
const admin = require("firebase-admin");

var serviceAccount = require("./privkey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

// Helper function to update user data
async function updateUserFields(userId, updates) {
  const userRef = db.collection("Users").doc(userId);
  try {
    await userRef.update(updates);
    console.log(`Successfully updated User ${userId}`);
  } catch (error) {
    console.error(`Error updating User ${userId}:`, error);
  }
}

// Check Sparks Within 24 Hours to make them Live
exports.checkSparksWithin24Hours = functions.pubsub
  .schedule("every 1 hours")
  .onRun(async () => {
    const now = admin.firestore.Timestamp.now().toMillis();
    const twentyFourHoursFromNow = now + 24 * 60 * 60 * 1000;

    try {
      const sparksSnapshot = await db
        .collection("Sparks")
        .where("chosenTime", ">", now)
        .where("chosenTime", "<=", twentyFourHoursFromNow)
        .get();

      if (sparksSnapshot.empty) {
        console.log("No Sparks within the next 24 hours.");
        return null;
      }

      const updates = [];
      sparksSnapshot.forEach((doc) => {
        const sparkId = doc.id;
        const sparkData = doc.data();
        if (
          sparkData.totalNumberOfCurrentParticipants > 1 &&
          !sparkData.isSparkActive
        ) {
          updates.push(
            db.collection("Sparks").doc(sparkId).update({
              isSparkActive: true,
              lastChecked: admin.firestore.Timestamp.now(),
            })
          );
          const currentlyJoinedProfileParticipants =
            sparkData.currentlyJoinedProfileParticipants || [];
          currentlyJoinedProfileParticipants.forEach((requester) => {
            const userId = requester;
            const userUpdates = {
              currentActiveSparks:
                admin.firestore.FieldValue.arrayUnion(sparkId),
              currentConfirmedSparks:
                admin.firestore.FieldValue.arrayRemove(sparkId),
            };
            updates.push(updateUserFields(userId, userUpdates));
          });
        }
      });

      await Promise.all(updates);
      console.log("Updated all Sparks and Users for 24-hour window.");
      return null;
    } catch (error) {
      console.error("Error in checkSparksWithin24Hours:", error);
      return null;
    }
  });

// Check Sparks Within 6 Hours to end the spark
exports.checkSparksWithin6Hours = functions.pubsub
  .schedule("every 1 hours")
  .onRun(async () => {
    const now = admin.firestore.Timestamp.now().toMillis();
    const sixHoursAgo = now - 6 * 60 * 60 * 1000; // Corrected to 6 hours

    try {
      const sparksSnapshot = await db
        .collection("Sparks")
        .where("chosenTime", "<=", sixHoursAgo)
        .get();

      if (sparksSnapshot.empty) {
        console.log("No Sparks 6+ hours from now.");
        return null;
      }

      const batch = db.batch(); // Initialize batch for atomic operations

      for (const doc of sparksSnapshot.docs) {
        const sparkId = doc.id;
        const sparkData = doc.data();

        if (!sparkData.isSparkActive) {
          console.log(`Skipping already processed Spark ${sparkId}.`);
          batch.update(db.collection("Sparks").doc(sparkId), {
            isSparkActive: false,
            lastChecked: admin.firestore.Timestamp.now(),
          });
        } else {
          batch.update(db.collection("Sparks").doc(sparkId), {
            lastChecked: admin.firestore.Timestamp.now(),
          });
        }

        // Update Spark status

        const participants = sparkData.currentlyJoinedProfileParticipants || [];
        const arrivalDoc = await db
          .collection("ArrivedParty")
          .doc(sparkId)
          .get();
        const arrivalData = arrivalDoc.exists
          ? arrivalDoc.data().arrivals || []
          : [];

        // Use a Set for efficient lookups
        const arrivedSet = new Set(
          arrivalData.map((arrival) => arrival.phoneNumber)
        );

        for (const res of participants) {
          const alreadyNotShown = sparkData.neverShownUsers.includes(res);
          const alreadyCancelled = sparkData.canceledUsers.includes(res);

          if (!arrivedSet.has(res) && (!alreadyNotShown || !alreadyCancelled)) {
            batch.update(db.collection("Sparks").doc(sparkId), {
              neverShownUsers: admin.firestore.FieldValue.arrayUnion(res),
            });

            const userDoc = db.collection("Users").doc(res);
            const userSnapshot = await userDoc.get();
            const userLumins = userSnapshot.data()?.userLumins || 0;

            batch.update(userDoc, {
              currentActiveSparks:
                admin.firestore.FieldValue.arrayRemove(sparkId),
              pastSparks: admin.firestore.FieldValue.arrayUnion(sparkId),
              userLumins: userLumins - (sparkData.luminsPrice || 0),
            });
          }
        }
      }

      await batch.commit(); // Execute all updates atomically
      console.log("Updated all Sparks and Users for 6-hour mark.");
      return null;
    } catch (error) {
      console.error("Error in checkSparksWithin6Hours:", error);
      return null;
    }
  });
