import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "../styles/Header.module.css";

export default function Header({ isActive, setIsActive, setIsMenuOpen }) {
  const { isDarkTheme } = useContext(ThemeContext);
  const userData = JSON.parse(localStorage.getItem("userData"));
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";
  const avatarColor = userData.avatarColor;
  const username = userData.username;

  return (
    <header className={styles["todos-header"]}>
      <div className={styles["header-title"]}>
        <img src="../../images/to-do-list.svg" alt="todoIcon" />
        <h2>DailyDone</h2>
      </div>

      <div className={styles["header-toolbar"]}>
        <div className={styles["add-todo-wrapper"]}>
          <button
            title="Add to-do"
            className={styles["add-todo-btn"]}
            onClick={() => setIsActive((prev) => !prev)}
          >
            {isActive ? (
              <img src="../../images/cancel-todo.svg" alt="cancelIcon" />
            ) : (
              <img src="../../images/add-todo.svg" alt="addIcon" />
            )}
          </button>
        </div>
        <div className={styles["avatar-btn-wrapper"]}>
          <div
            style={{ backgroundColor: avatarColor }}
            className={`${styles["avatar-btn"]} ${themeClassName}`}
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {username.charAt(0).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
}
