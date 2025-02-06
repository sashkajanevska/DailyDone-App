import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeButton({ styles }) {
  const { isDarkTheme, toggleTheme } = useContext(ThemeContext);
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";

  return (
    <button
      className={`${styles["theme-btn"]} ${themeClassName}`}
      onClick={toggleTheme}
    >
      {isDarkTheme ? (
        <div>
          <p>On</p>
          <img src="../../images/dark-theme.svg" alt="darkThemeIcon" />
        </div>
      ) : (
        <div>
          <p>Off</p>
          <img src="../../images/light-theme.svg" alt="lightThemeIcon" />
        </div>
      )}
    </button>
  );
}
