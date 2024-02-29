import React, { createContext, useContext, useState } from 'react';

const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [players, setPlayers] = useState(1);
  const [difficulty, setDifficulty] = useState('easy');
  const [howManyQuestions, setHowManyQuestions] = useState(50)

  return (
    <SettingsContext.Provider value={{ players, setPlayers, difficulty, setDifficulty, howManyQuestions, setHowManyQuestions }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);