import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Header from "./Header";
import Main from "./Main";
import styles from "../styles/TodosPage.module.css";

export default function TodosPage() {
  const [isActive, setIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";

  const closeMenu = (e) => {
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div
      style={{ position: isMenuOpen ? "fixed" : "relative" }}
      className={styles["todos-page"]}
    >
      <Header
        isActive={isActive}
        setIsActive={setIsActive}
        setIsMenuOpen={setIsMenuOpen}
      />

      <Main
        isActive={isActive}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
      />

      <div
        className={`${styles["modal-bg"]} ${themeClassName} ${
          isMenuOpen ? styles["active"] : ""
        }`}
        onClick={(e) => closeMenu(e)}
      ></div>
    </div>
  );
}
