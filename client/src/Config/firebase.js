import { initializeApp } from "@firebase/app";
import { getReactNativePersistence, initializeAuth } from "@firebase/auth";
import { initializeFirestore } from "@firebase/firestore";
import { getStorage } from "firebase/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const firebaseConfig = {
  apiKey: "AIzaSyBksprCnfQOqrhOpgnF8dy-7CZ5FgZMdyA",
  authDomain: "acompany-a863a.firebaseapp.com",
  projectId: "acompany-a863a",
  storageBucket: "acompany-a863a.appspot.com",
  messagingSenderId: "635511081223",
  appId: "1:635511081223:web:933cf1948f7611beac5da2",
};

const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const database = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});
