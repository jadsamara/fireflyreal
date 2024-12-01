import React, { useState, createContext } from "react";

export const ListingPageContext = createContext({});

export const ListingPageProvider = ({ children }) => {
  const [availableTimesSelected, setAvailableTimesSelected] = useState([]);
  const [currentFilter, setCurrentFilter] = useState(0);

  return (
    <ListingPageContext.Provider
      value={{
        availableTimesSelected,
        setAvailableTimesSelected,
        currentFilter,
        setCurrentFilter,
      }}
    >
      {children}
    </ListingPageContext.Provider>
  );
};
