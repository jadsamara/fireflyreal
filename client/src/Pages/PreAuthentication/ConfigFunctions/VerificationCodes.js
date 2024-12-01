import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { auth, database } from "../../../Config/firebase";

export const GOOGLE_API_KEY = "AIzaSyCGaJwEFJ65xMcXTPGFBgLg6LGNPXmAeKo";

export const sendVerification = async ({
  phoneNumber,
  setVerificationId,
  setPhoneNumber,
  countryCode,
  recaptchaVerifier,
  navigation,
}) => {
  try {
    const cleanedPhoneNumber = phoneNumber.replace(/[\s()-]/g, "");
    const sentNumber = countryCode + cleanedPhoneNumber;
    const phoneProvider = new PhoneAuthProvider(auth);
    const verificationId = await phoneProvider.verifyPhoneNumber(
      sentNumber,
      recaptchaVerifier.current
    );
    setVerificationId(verificationId);
    setPhoneNumber("");
    navigation.navigate("VerifyCodePage");
  } catch (error) {
    console.log("Verification failed:", error);
  }
};

export const confirmCode = async ({
  verificationCode,
  verificationId,
  setVerificationCode,
  navigation,
}) => {
  const credential = PhoneAuthProvider.credential(
    verificationId,
    verificationCode
  );

  signInWithCredential(auth, credential)
    .then(() => {
      setVerificationCode("");
      getData({ navigation });
    })
    .catch((error) => {
      console.log("Verification failed:", error);
    });
};

const getData = async ({ navigation }) => {
  const user = auth.currentUser.phoneNumber;
  const docRef = doc(database, "Users", user);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) {
    navigation.navigate("CreateAccountPageOne");
  }
};
