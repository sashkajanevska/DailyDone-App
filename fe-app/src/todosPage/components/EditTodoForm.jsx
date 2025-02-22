import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import handleTodoFormSubmit from "../../utils/handleTodoFormSubmit";
import useWindowSize from "../../hooks/useWindowSize";
import styles from "../styles/Todos.module.css";

export default function EditTodoForm({
  editedTodo,
  setEditedTodo,
  updateTodo,
  handleDiscard,
}) {
  const [invalidFields, setInvalidFields] = useState([]);
  const [validationError, setValidationError] = useState("");
  const { width } = useWindowSize();
  const { isDarkTheme } = useContext(ThemeContext);
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";

  return (
    <form
      action="#"
      className={styles["todo-edit-form"]}
      noValidate={true}
      onSubmit={(e) => {
        e.preventDefault();
        handleTodoFormSubmit(
          editedTodo,
          setInvalidFields,
          setValidationError,
          updateTodo
        );
      }}
    >
      <div className={`${styles["edit-title-input"]} ${themeClassName}`}>
        <input
          type="text"
          maxLength={30}
          className={invalidFields.includes("title") ? "invalid" : ""}
          placeholder="Title"
          value={editedTodo.title}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, title: e.target.value })
          }
        />
      </div>

      <div className={styles["edit-desc-input"]}>
        <textarea
          rows={3}
          maxLength={200}
          className={invalidFields.includes("description") ? "invalid" : ""}
          placeholder="Description"
          value={editedTodo.description}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, description: e.target.value })
          }
        ></textarea>
      </div>

      <div
        className={`${styles["edit-date-input"]} ${themeClassName} ${
          width < 1200 && !editedTodo.dueDate ? styles["active"] : ""
        }`}
      >
        <input
          style={{
            appearance: "none",
            WebkitAppearance: "none",
            MozAppearance: "none",
          }}
          type="date"
          max={"9999-12-31"}
          className={invalidFields.includes("dueDate") ? "invalid" : ""}
          value={editedTodo.dueDate}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, dueDate: e.target.value })
          }
        />
      </div>

      <div className={styles["edit-list-input"]}>
        <select
          className={invalidFields.includes("list") ? "invalid" : ""}
          value={editedTodo.list}
          onChange={(e) =>
            setEditedTodo({ ...editedTodo, list: e.target.value })
          }
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
        className={`${styles["edit-validation-err"]} ${
          validationError ? styles["active"] : ""
        } ${themeClassName}`}
      >
        <p>{validationError}</p>
      </div>

      <div className={styles["edit-btns"]}>
        <div className={styles["save-edit-btn"]}>
          <button type="submit">Save changes</button>
        </div>

        <div className={styles["discard-edit-btn"]}>
          <button
            onClick={() => {
              handleDiscard();
              setInvalidFields([]);
              setValidationError("");
            }}
          >
            Discard
          </button>
        </div>
      </div>
    </form>
  );
}
