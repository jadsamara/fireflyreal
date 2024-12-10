import { createSlice } from "@reduxjs/toolkit";

const currentDate = new Date();
const futureDate = new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000);

const initialState = {
  user: null,
  userData: {
    name: "",
    gender: "",
    age: null,
    userBio: "",
    userNumber: "",
    verificationId: "",
    isVerified: 1,
    profilePicture: null,
    profilePictureURI: "",
    allPhotos: [
      {
        id: 1,
        picture: "",
        prompt: "Add Prompt",
        disabledDrag: true, // Set to true if no picture, false otherwise
        disabledReSorted: true,
      },
      {
        id: 2,
        picture: "",
        prompt: "Add Prompt",
        disabledDrag: true, // Set to true if no picture, false otherwise
        disabledReSorted: true,
      },
      {
        id: 3,
        picture: "",
        prompt: "Add Prompt",
        disabledDrag: true, // Set to true if no picture, false otherwise
        disabledReSorted: true,
      },
      {
        id: 4,
        picture: "",
        prompt: "Add Prompt",
        disabledDrag: true, // Set to true if no picture, false otherwise
        disabledReSorted: true,
      },
      {
        id: 5,
        picture: "",
        prompt: "Add Prompt",
        disabledDrag: true, // Set to true if no picture, false otherwise
        disabledReSorted: true,
      },
      {
        id: 6,
        picture: "",
        prompt: "Add Prompt",
        disabledDrag: true, // Set to true if no picture, false otherwise
        disabledReSorted: true,
      },
    ],
    userLumins: 30,
    numberOfRatings: 0,
    averageUserRating: 0,
    postedSparksByUser: [],
    sparksRequestedByUser: [],
    currentActiveSparks: [],
    currentConfirmedSparks: [],
    notificationsArray: [],
    pastSparks: [],
    homeTown: "Toronto, Ontario",
    voiceAudioObj: {
      recordedAudioLink: "",
      voicePrompt: "",
    },
    filters: [
      { maxDistance: 50, isEnabled: true },
      { city: "Toronto, Canada", isEnabled: true },
      {
        date: { startDate: currentDate, futureDate: futureDate },
        isEnabled: true,
      },
      { maxPeople: 10, isEnabled: true },
      { minPeople: 2, isEnabled: true },
      { vibes: "All the vibes", isEnabled: true },
      { tags: [], isEnabled: true },
    ],
    accountStatus: "active",
    userInformation: [],
  },
  isAllowed: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,

  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    setUserData(state, action) {
      state.userData = action.payload;
      state.isAllowed = true;
    },
    updateUserName(state, action) {
      if (state.userData) {
        state.userData.name = action.payload;
      }
    },
    updateHometown(state, action) {
      if (state.userData) {
        state.userData.homeTown = action.payload;
      }
    },
    updatePostedSparks(state, action) {
      state.userData.postedSparksByUser.push(action.payload);
    },
    deductUserLumins(state, action) {
      state.userData.userLumins -= action.payload;
    },
    updateProfilePhotos(state, action) {
      state.userData.allPhotos = action.payload;
    },
    updateLuminsAndSparks(state, action) {
      state.userData.userLumins -= action.payload.lumins; // Deduct lumins
      state.userData.sparksRequestedByUser.push(action.payload.sparkId); // Add sparkId
    },
    updateUserLumins(state, action) {
      state.userData.userLumins = action.payload.lumins; // Deduct lumins
    },
    disableAccountFunction(state) {
      state.userData.accountStatus = "disabled";
    },
    enableAccountFunction(state) {
      state.userData.accountStatus = "active";
    },
    clearUserData(state) {
      state.userData = initialState;
      state.isAllowed = false;
    },
    setNewBio(state, action) {
      state.userData.userBio = action.payload.userBio;
    },

    setIsAllowed(state, action) {
      state.isAllowed = false; // Explicitly set isAllowed
    },

    updateUserInformation(state, action) {
      const { index, newInfo } = action.payload;
      if (state.userData.userInformation[index]) {
        // Update the specific object by merging newInfo into it at the given index
        state.userData.userInformation[index] = {
          ...state.userData.userInformation[index],
          ...newInfo,
        };
      }
    },
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check
    }),
});

export const {
  setUser,
  setUserData,
  updateUserName,
  clearUserData,
  updateHometown,
  updatePostedSparks,
  deductUserLumins,
  updateLuminsAndSparks,
  updateProfilePhotos,
  updateUserLumins,
  setIsAllowed,
  disableAccountFunction,
  enableAccountFunction,
  setNewBio,
  updateUserInformation,
} = userSlice.actions;

export default userSlice.reducer;
