import React, { useEffect, useRef, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AuthNav } from "./AuthNav";
import { DefaultNav } from "./DefaultNav";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserData, clearUserData } from "../Slices/userSlice";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { database, auth } from "../Config/firebase";

export const RootNav = () => {
  const dispatch = useDispatch();
  const isAllowed = useSelector((state) => state.user.isAllowed); // Access isAllowed from Redux

  const [initializing, setInitializing] = useState(true);
  const navigationRef = useRef();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async (authenticatedUser) => {
        if (authenticatedUser) {
          const { uid, phoneNumber, email, displayName, photoURL } =
            authenticatedUser;
          dispatch(setUser({ uid, phoneNumber, email, displayName, photoURL }));

          const userPhone = authenticatedUser.phoneNumber;
          const docRef = doc(database, "Users", userPhone);

          try {
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
              dispatch(setUserData(docSnap.data()));
            } else {
              console.warn("Firestore document for user does not exist.");
              dispatch(clearUserData());
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
            dispatch(clearUserData());
          }
        } else {
          dispatch(setUser(null));
          dispatch(clearUserData());
        }

        if (initializing) {
          setInitializing(false);
        }
      }
    );

    return () => unsubscribeAuth();
  }, [dispatch]);

  if (initializing) return null;

  return (
    <NavigationContainer ref={navigationRef}>
      {isAllowed ? <DefaultNav /> : <AuthNav />}
    </NavigationContainer>
  );
};
