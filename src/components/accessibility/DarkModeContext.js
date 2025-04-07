import { createContext, useContext, useState, useEffect } from 'react';

// Used for sharing state across components: With the header for logo and dark/light mode toggle
const DarkModeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => document.body.classList.contains('dark'));

  const toggleDarkMode = () => {
    document.body.classList.toggle('dark');
    setIsDark(prev => !prev);
  };

  return (
    <DarkModeContext.Provider value={{ isDark, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useTheme = () => useContext(DarkModeContext);