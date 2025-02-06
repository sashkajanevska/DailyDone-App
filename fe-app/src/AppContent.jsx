import { useContext, useEffect } from "react";
import { ThemeContext } from "./context/ThemeContext";
import { UserContext } from "./context/UserContext";
import AuthPage from "./auth/components//AuthPage";
import TodosPage from "./todos/components/TodosPage";
import "./App.css";

export default function AppContent() {
  const { isDarkTheme } = useContext(ThemeContext);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));

    if (userData) {
      const storedToken = userData.jwt;
      setUser(storedToken);
    }
  }, [setUser]);

  return (
    <div className={`App ${isDarkTheme ? "dark-theme" : ""}`}>
      {!user ? <AuthPage /> : <TodosPage />}
    </div>
  );
}
