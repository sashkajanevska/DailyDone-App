import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ManageTodo from "./ManageTodo";
import styles from "../styles/Todos.module.css";

export default function Todos({ todos, setError, getTodos, isSearchEmpty }) {
  const { isDarkTheme } = useContext(ThemeContext);
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";

  return (
    <section className={styles["todos-section"]}>
      {todos.length > 0 ? (
        todos.map((todo) => {
          return (
            <div
              key={todo._id}
              className={`${styles["todo"]} ${themeClassName}`}
            >
              <ManageTodo todo={todo} setError={setError} getTodos={getTodos} />
            </div>
          );
        })
      ) : (
        <div className={`${styles["no-todos-msg"]} ${themeClassName}`}>
          {isSearchEmpty ? (
            <p>
              No matches found.
              <br />
              Looks like a great time to start something new 🪄
            </p>
          ) : (
            <p>
              You're all caught up! 🎉
              <br />
              Add a new task to keep the momentum going!
            </p>
          )}
        </div>
      )}
    </section>
  );
}
