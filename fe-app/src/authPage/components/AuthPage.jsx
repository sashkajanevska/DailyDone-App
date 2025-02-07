import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import useWindowSize from "../../hooks/useWindowSize";
import ThemeButton from "../../context/ThemeButton";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import styles from "../styles/AuthPage.module.css";

export default function AuthPage() {
  const [activeForm, setActiveForm] = useState("login");
  const { isDarkTheme } = useContext(ThemeContext);
  const { width } = useWindowSize();
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";

  return (
    <div className={styles["auth-page"]}>
      <div className={styles["container"]}>
        <div className={styles["auth-page-inner"]}>
          <ThemeButton styles={styles} />

          <div className={styles["auth-page-title"]}>
            {width < 992 ? (
              <img src="../../../images/to-do-list.svg" alt="todoIcon" />
            ) : (
              <></>
            )}

            <h1>DailyDone</h1>
          </div>

          <div className={styles["auth-page-content"]}>
            <div className={styles["auth-img-box"]}>
              <img src="../../../images/to-do-list.svg" alt="todoIcon" />
            </div>

            <div className={styles["auth-form-wrapper"]}>
              <div className={styles["auth-form-nav"]}>
                <div
                  className={`${styles["auth-form-nav-link"]} ${
                    activeForm === "login" ? styles["active"] : ""
                  }`}
                  onClick={() => setActiveForm("login")}
                >
                  <div>Log In</div>
                </div>

                <div
                  className={`${styles["auth-form-nav-link"]} ${
                    activeForm === "register" ? styles["active"] : ""
                  }`}
                  onClick={() => setActiveForm("register")}
                >
                  <div>Register</div>
                </div>
              </div>

              <div className={`${styles["auth-form"]} ${themeClassName}`}>
                {activeForm === "login" ? (
                  <LoginForm styles={styles} />
                ) : (
                  <RegisterForm styles={styles} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
