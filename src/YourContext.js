// src/YourContext.js
import React, { createContext } from 'react';

const YourContext = createContext();

const YourContextProvider = ({ children }) => {
  const value = { /* context values here */ };
  
  return (
    <YourContext.Provider value={value}>
      {children}
    </YourContext.Provider>
  );
};

export { YourContext, YourContextProvider };
