import { useCallback, useContext, useEffect, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import Api from "../../Api";
import handleErrorMessage from "../../utils/handleErrorMessage";
import useWindowSize from "../../hooks/useWindowSize";
import CreateTodo from "./CreateTodo";
import Todos from "./Todos";
import TodosSidebarMenu from "./TodosSidebarMenu";
import styles from "../styles/Main.module.css";

export default function Main({ isActive, isMenuOpen, setIsMenuOpen }) {
  const [todos, setTodos] = useState([]);
  const [unfilteredTodos, setUnfilteredTodos] = useState([]);
  const [sorting, setSorting] = useState("isHighPriority");
  const [order, setOrder] = useState(-1);
  const [searchTitle, setSearchTitle] = useState("");
  const [isSearchEmpty, setIsSearchEmpty] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const { isDarkTheme } = useContext(ThemeContext);
  const { width } = useWindowSize();
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";

  const getTodos = useCallback(async () => {
    try {
      const response = await Api().get(
        `/todos?sortBy=${sorting}&order=${order}&search=${searchTitle}`
      );

      if (response.data) {
        setTodos(response.data);
        setUnfilteredTodos(response.data);
        setIsSearchEmpty(false);
      }

      if (searchTitle && response.data.length === 0) {
        setIsSearchEmpty(true);
      }

      setError("");
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } catch (error) {
      let message = handleErrorMessage(error);
      setError(message);
    }
  }, [sorting, order, searchTitle]);

  const logout = () => {
    localStorage.removeItem("userData");
    setUser(null);
    setTodos([]);
  };

  useEffect(() => {
    if (user) {
      getTodos();
    }
  }, [user, getTodos]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [todos, setIsMenuOpen]);

  return (
    <main className={styles["todos-main"]}>
      <section className={styles["todos-container"]}>
        <CreateTodo
          setError={setError}
          getTodos={getTodos}
          isActive={isActive}
        />

        <div
          className={`${styles["todos-error-wrapper"]} ${
            error ? styles["active"] : ""
          }`}
        >
          <div className={`${styles["todos-error-msg"]} ${themeClassName}`}>
            <p>{error}</p>
            <button onClick={() => setError("")}></button>
          </div>
        </div>

        <div className={styles["todos-toolbar"]}>
          <div className={styles["todos-search-input"]}>
            <input
              type="text"
              placeholder="Search title"
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>

          <div className={`${styles["todos-sort-controls"]} ${themeClassName}`}>
            <select
              value={sorting}
              onChange={(e) => setSorting(e.target.value)}
            >
              <option value="isHighPriority">Relevance</option>
              <option value="title">Title</option>
            </select>
            <button onClick={() => setOrder(order === -1 ? 1 : -1)}>
              {order === -1 ? (
                <img src="../../images/desc-order.svg" alt="orderIcon" />
              ) : (
                <img src="../../images/asc-order.svg" alt="orderIcon" />
              )}
            </button>
          </div>
        </div>

        <div className={styles["todos-section-wrapper"]}>
          {loading ? (
            <div className={styles["spinner-wrapper"]}>
              <div className={styles["spinner"]}></div>
            </div>
          ) : (
            <Todos
              todos={todos}
              setError={setError}
              getTodos={getTodos}
              isSearchEmpty={isSearchEmpty}
            />
          )}
        </div>
      </section>

      {width > 991 || isMenuOpen ? (
        <TodosSidebarMenu
          todos={unfilteredTodos}
          setTodos={setTodos}
          logout={logout}
          isMenuOpen={isMenuOpen}
        />
      ) : (
        <></>
      )}
    </main>
  );
}
