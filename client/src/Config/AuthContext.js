import React, { useState, createContext, useEffect, useMemo } from "react";
import * as Location from "expo-location";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [accountStatus, setAccountStatus] = useState(null);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let awaitedLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Low,
      });
      setLocation(awaitedLocation.coords);
    })();
  }, []);

  // Memoize the context value
  const contextValue = useMemo(
    () => ({
      user,
      setUser,
      location,
      errorMsg,
      accountStatus,
      setAccountStatus,
    }),
    [user, location, errorMsg, accountStatus]
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
