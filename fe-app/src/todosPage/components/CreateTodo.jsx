import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Api from "../../Api";
import handleErrorMessage from "../../utils/handleErrorMessage";
import handleTodoFormSubmit from "../../utils/handleTodoFormSubmit";
import styles from "../styles/CreateTodo.module.css";

export default function CreateTodo({ setError, getTodos, isActive }) {
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    dueDate: "",
    list: "",
  });
  const [validationError, setValidationError] = useState("");
  const [invalidFields, setInvalidFields] = useState([]);
  const { isDarkTheme } = useContext(ThemeContext);
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";

  const saveTodo = async () => {
    try {
      await Api().post("/todos", {
        ...newTodo,
        isCompleted: false,
        isHighPriority: false,
      });

      setNewTodo({
        title: "",
        description: "",
        dueDate: "",
        list: "",
      });
      setError("");
      setValidationError("");
      getTodos();
    } catch (error) {
      let message = handleErrorMessage(error);
      setError(message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (!isActive) {
        setNewTodo({
          title: "",
          description: "",
          dueDate: "",
          list: "",
        });
        setValidationError("");
        setInvalidFields([]);
      }
    }, 200);
  }, [isActive]);

  return (
    <div
      className={`${styles["todo-form-wrapper"]} ${
        isActive ? styles["active"] : ""
      }`}
    >
      <form
        action="#"
        className={`${styles["todo-form"]} ${themeClassName}`}
        noValidate={true}
        onSubmit={(e) => {
          e.preventDefault();
          handleTodoFormSubmit(
            newTodo,
            setInvalidFields,
            setValidationError,
            saveTodo
          );
        }}
      >
        <div className={`${styles["todo-title-input"]} ${themeClassName}`}>
          <input
            type="text"
            maxLength={30}
            className={invalidFields.includes("title") ? "invalid" : ""}
            placeholder="Title"
            value={newTodo.title}
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
        </div>

        <div className={styles["todo-desc-input"]}>
          <textarea
            rows={3}
            maxLength={200}
            className={invalidFields.includes("description") ? "invalid" : ""}
            placeholder="Description"
            value={newTodo.description}
            onChange={(e) =>
              setNewTodo({ ...newTodo, description: e.target.value })
            }
          ></textarea>
        </div>

        <div className={`${styles["todo-date-input"]} ${themeClassName}`}>
          <input
            style={{
              appearance: "none",
              WebkitAppearance: "none",
              MozAppearance: "none",
            }}
            type="date"
            max={"9999-12-31"}
            placeholder="dd/mm/yyyy"
            className={invalidFields.includes("dueDate") ? "invalid" : ""}
            value={newTodo.dueDate}
            onChange={(e) =>
              setNewTodo({ ...newTodo, dueDate: e.target.value })
            }
          />
        </div>

        <div className={styles["todo-list-input"]}>
          <select
            className={invalidFields.includes("list") ? "invalid" : ""}
            value={newTodo.list}
            onChange={(e) => setNewTodo({ ...newTodo, list: e.target.value })}
          >
            <option value="">Select list</option>
            <option value="home">Home</option>
            <option value="travel">Travel</option>
            <option value="work">Work</option>
            <option value="hobbies">Hobbies</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div
          className={`${styles["todo-validation-err"]} ${themeClassName} ${
            validationError ? styles["active"] : ""
          }`}
        >
          <p>{validationError}</p>
        </div>

        <div className={styles["todo-save-btn"]}>
          <button type="submit">Create to-do</button>
        </div>
      </form>
    </div>
  );
}
