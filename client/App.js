import React, { useState, useEffect } from "react";
import { LogBox } from "react-native";
import * as Font from "expo-font";

import { RootNav } from "./src/Navigation";
import { AuthProvider } from "./src/Config/AuthContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";

import { store } from "./store";

export default function App() {
  LogBox.ignoreAllLogs();

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        "poppins-100": require("./src/Fonts/Poppins-Thin.ttf"),
        "poppins-200": require("./src/Fonts/Poppins-ExtraLight.ttf"),
        "poppins-300": require("./src/Fonts/Poppins-Light.ttf"),
        "poppins-400": require("./src/Fonts/Poppins-Regular.ttf"),
        "poppins-500": require("./src/Fonts/Poppins-Medium.ttf"),
        "poppins-600": require("./src/Fonts/Poppins-SemiBold.ttf"),
        "poppins-700": require("./src/Fonts/Poppins-Bold.ttf"),
        "poppins-800": require("./src/Fonts/Poppins-ExtraBold.ttf"),
        "poppins-900": require("./src/Fonts/Poppins-Black.ttf"),

        "poppins-100-italic": require("./src/Fonts/Poppins-ThinItalic.ttf"),
        "poppins-200-italic": require("./src/Fonts/Poppins-ExtraLightItalic.ttf"),
        "poppins-300-italic": require("./src/Fonts/Poppins-LightItalic.ttf"),
        "poppins-400-italic": require("./src/Fonts/Poppins-Italic.ttf"),
        "poppins-500-italic": require("./src/Fonts/Poppins-MediumItalic.ttf"),
        "poppins-600-italic": require("./src/Fonts/Poppins-SemiBoldItalic.ttf"),
        "poppins-700-italic": require("./src/Fonts/Poppins-BoldItalic.ttf"),
        "poppins-800-italic": require("./src/Fonts/Poppins-ExtraBoldItalic.ttf"),
        "poppins-900-italic": require("./src/Fonts/Poppins-BlackItalic.ttf"),
      });
      setFontsLoaded(true);
    }

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    // Render a loading indicator or splash screen while fonts are loading
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <AuthProvider>
          <RootNav />
        </AuthProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
