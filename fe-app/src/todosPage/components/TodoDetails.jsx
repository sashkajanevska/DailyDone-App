import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import styles from "../styles/Todos.module.css";

export default function TodoDetails({
  todo,
  handleEdit,
  updateTodo,
  deleteTodo,
}) {
  const { isDarkTheme } = useContext(ThemeContext);
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";

  const toggleCompleted = () => {
    updateTodo({ ...todo, isCompleted: !todo.isCompleted });
  };

  const togglePriority = () => {
    updateTodo({ ...todo, isHighPriority: !todo.isHighPriority });
  };

  return (
    <div className={styles["todo-details"]}>
      <div
        className={`${styles["todo-completed-btn"]} ${
          todo.isCompleted ? styles["active"] : ""
        }`}
      >
        <button onClick={toggleCompleted}>
          <img src="../../images/completed-todos.svg" alt="completedIcon" />
        </button>
      </div>

      <div
        className={`${styles["todo-text-content"]} ${themeClassName} ${
          todo.isCompleted ? styles["inactive"] : ""
        }`}
      >
        <h2 className={styles["todo-title"]}>{todo.title}</h2>
        <p className={styles["todo-desc"]}>{todo.description}</p>
        <div className={styles["todo-date"]}>
          <img src="../../images/todo-date.svg" alt="dateIcon" />
          <p>{new Date(todo.dueDate).toLocaleDateString()}</p>
        </div>
        <p className={styles["todo-list"]}>
          #{todo.list.at(0).toUpperCase() + todo.list.slice(1)}
        </p>
      </div>

      <div className={styles["todo-btns-wrapper"]}>
        <div
          className={`${styles["todo-btns-top"]} ${
            todo.isCompleted ? styles["inactive"] : ""
          }`}
        >
          <button
            className={`${styles["todo-edit-btn"]} ${themeClassName}`}
            onClick={() => handleEdit(todo)}
          >
            <img src="../../images/edit-todo.svg" alt="editIcon" />
          </button>
          <button
            className={`${styles["todo-flag-btn"]} ${
              todo.isHighPriority ? styles["active"] : ""
            }`}
            onClick={togglePriority}
          >
            <img src="../../images/priority-high.svg" alt="flagIcon" />
          </button>
        </div>
        <div className={styles["todo-btn-bottom"]}>
          <button
            className={`${styles["todo-delete-btn"]} ${themeClassName}`}
            onClick={() => deleteTodo(todo._id)}
          >
            <img src="../../images/delete-todo.svg" alt="deleteIcon" />
          </button>
        </div>
      </div>
    </div>
  );
}
