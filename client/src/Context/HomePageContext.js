import React, { useState, createContext, useEffect } from "react";

import { auth } from "../Config/firebase";
import { getUserInfo } from "../Functions/GetUserInfo";

export const HomePageContext = createContext({});

export const HomePageProvider = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState({});
  const [reset, setReset] = useState(false);
  const [availableTimesSelected, setAvailableTimesSelected] = useState([]);
  const [filters, setFilters] = useState([]);

  const userNumber = auth.currentUser.phoneNumber;

  useEffect(() => {
    const getUser = async () => {
      try {
        const userDataFetched = await getUserInfo(userNumber);
        setFilters(userDataFetched.filters);
      } catch (e) {
        console.log(e);
      }
    };
    getUser();
  }, []);

  return (
    <HomePageContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        reset,
        setReset,
        availableTimesSelected,
        setAvailableTimesSelected,
        filters,
        setFilters,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
