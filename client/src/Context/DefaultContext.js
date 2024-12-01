import React, { useState, createContext, useEffect, useRef } from "react";
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import { auth, database } from "../Config/firebase";
import { setDoc, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";

export const DefaultContext = createContext({});

export const DefaultProvider = ({ children }) => {
  const [notification, setNotification] = useState(false);

  const [tokenNotification, setTokenNotification] = useState("");
  const [notificationTrigger, setNotificationTrigger] = useState(false);
  const [trigger, setTrigger] = useState(false);

  const notificationListener = useRef();
  const responseListener = useRef();
  const userNumber = auth?.currentUser?.phoneNumber;
  const navigation = useNavigation();

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });

  useEffect(() => {
    registerForPushNotificationsAsync();

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {});

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(
          notificationListener.current
        );
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;

    if (Platform.OS === "android") {
      await Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = (
        await Notifications.getExpoPushTokenAsync({
          projectId: "8832c381-3769-4843-b00a-534372facfa8",
        })
      ).data;

      setTokenNotification(token);

      // Save the token under the Users collection in Firestore
      try {
        const userDocRef = doc(database, "Users", userNumber);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          const existingTokens = userData.notificationsArray || [];

          if (!existingTokens.includes(token)) {
            // Add the new token to the array
            await updateDoc(userDocRef, {
              notificationsArray: arrayUnion(token),
            });
            console.log("Token added to Firestore notificationsArray.");
          } else {
            console.log(
              "Token already exists in Firestore notificationsArray."
            );
          }
        } else {
          // Create a new document with the token in notificationsArray
          await setDoc(userDocRef, { notificationsArray: [token] });
          console.log("Token saved to Firestore (new document).");
        }
      } catch (error) {
        console.error("Error saving token to Firestore:", error);
      }
    } else {
      alert("Must use physical device for Push Notifications");
    }

    return token;
  }

  useEffect(() => {
    const responseListener =
      Notifications.addNotificationResponseReceivedListener((response) => {
        const { screen, params } = response.notification.request.content.data;

        if (screen && params) {
          setNotificationTrigger(true); // Mark that navigation was triggered by a notification
          setTrigger(true);
          navigation.navigate("Listings", {
            screen: screen,
            params: params,
          });
          setNotificationTrigger(false); // Mark that navigation was triggered by a notification
        }
      });

    return () => {
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  useEffect(() => {
    if (!notificationTrigger && trigger) {
      // Normal navigation to Listings screen (not triggered by a notification)
      navigation.navigate("Listings");
    }
  }, [notificationTrigger]);

  return (
    <DefaultContext.Provider
      value={{
        tokenNotification,
        notification,
      }}
    >
      {children}
    </DefaultContext.Provider>
  );
};
