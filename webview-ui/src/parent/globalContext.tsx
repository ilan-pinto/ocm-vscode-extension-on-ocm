import React, { createContext, useContext, useState } from 'react';

// Create a context
const GlobalContext = createContext([]);

// Create a provider component
const GlobalProvider = ({ children }) => {
  const [globalVariable, setGlobalVariable] = useState('Global Value');

  return (
    <GlobalContext.Provider value={{ globalVariable, setGlobalVariable }}>
      {children}
    </GlobalContext.Provider>
  );
};

// Custom hook to access the context
const useGlobalContext = () => {
  return useContext(GlobalContext);
};

export { GlobalProvider, useGlobalContext };