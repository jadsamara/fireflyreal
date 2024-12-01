import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./src/Slices/userSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
