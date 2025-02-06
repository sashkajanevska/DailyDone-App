import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import getTodoFilters from "../../utils/getTodoFilters";
import useWindowSize from "../../hooks/useWindowSize";
import ThemeButton from "../../context/ThemeButton";
import styles from "../styles/TodosSidebarMenu.module.css";

export default function TodosSidebarMenu({
  todos,
  setTodos,
  logout,
  isMenuOpen,
}) {
  const { isDarkTheme } = useContext(ThemeContext);
  const { width } = useWindowSize();
  const userData = JSON.parse(localStorage.getItem("userData"));
  const avatarColor = userData.avatarColor;
  const username = userData.username;
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";
  const todoFilters = getTodoFilters(todos);
  const todoLists = ["home", "travel", "work", "hobbies", "other"];

  return (
    <section
      className={`${styles["sidebar-menu-section"]} ${themeClassName} ${
        isMenuOpen ? styles["active"] : ""
      }`}
    >
      <div className={styles["todos-avatar-wrapper"]}>
        {width >= 992 ? <ThemeButton styles={styles} /> : <></>}
        <div style={{ backgroundColor: avatarColor }}>
          {username.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className={styles["todo-filter-btns"]}>
        {Object.keys(todoFilters).map((key) => (
          <button
            key={key}
            className={`${styles["todo-filter-btn"]} ${themeClassName}`}
            onClick={() => setTodos(todoFilters[key])}
          >
            <div>
              <div className={`${styles[`${key}-img`]}`}>
                <img src={`../../images/${key}-todos.svg`} alt="todosIcon" />
              </div>
              <p>{key.at(0).toUpperCase() + key.slice(1)}</p>
            </div>
            <p>
              {todoFilters[key].length <= 99 ? todoFilters[key].length : "99+"}
            </p>
          </button>
        ))}
      </div>

      <div className={`${styles["todo-list-btns"]} ${themeClassName}`}>
        <h3>My Lists</h3>
        <div>
          {todoLists.map((listName) => (
            <button
              key={listName}
              className={`${styles["todo-list-btn"]} ${themeClassName}`}
              onClick={() => {
                const listTodos = todos.filter(
                  (todo) => todo.list === listName
                );
                setTodos(listTodos);
              }}
            >
              <div className={`${styles[`${listName}-list`]}`}>
                <img src={`../../images/${listName}-list.svg`} alt="listIcon" />
              </div>
              <p>{listName.at(0).toUpperCase() + listName.slice(1)}</p>
            </button>
          ))}
        </div>
      </div>

      {width < 992 ? (
        <div className={styles["theme-btn-wrapper"]}>
          <div>
            <div className={styles["theme-icon"]}>
              <img src="../../images/dark-theme.svg" alt="darkThemeIcon" />
            </div>
            <p className={`${styles["theme-text"]} ${themeClassName}`}>
              Dark Theme
            </p>
          </div>

          <ThemeButton styles={styles} />
        </div>
      ) : (
        <></>
      )}

      <button
        className={`${styles["logout-btn"]} ${themeClassName}`}
        onClick={logout}
      >
        <div>
          <img src="../../images/logout-icon.svg" alt="logoutIcon" />
        </div>
        <p>Log Out</p>
      </button>
    </section>
  );
}
