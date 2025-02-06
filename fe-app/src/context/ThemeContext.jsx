import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
    const savedTheme = JSON.parse(localStorage.getItem("isDarkTheme"));
    return savedTheme || false;
  });

  const toggleTheme = () => setIsDarkTheme((prev) => !prev);

  useEffect(() => {
    localStorage.setItem("isDarkTheme", JSON.stringify(isDarkTheme));
  }, [isDarkTheme]);

  return (
    <ThemeContext.Provider value={{ isDarkTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
