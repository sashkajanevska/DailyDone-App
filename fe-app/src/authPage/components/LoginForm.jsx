import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import Api from "../../Api";
import getRandomColor from "../../utils/getRandomColor";
import handleErrorMessage from "../../utils/handleErrorMessage";
import handleAuthFormSubmit from "../../utils/handleAuthFormSubmit";

export default function LoginForm({ styles }) {
  const [loginCredentials, setLoginCredentials] = useState({
    email: "",
    password: "",
  });
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";

  const login = async () => {
    try {
      const result = await Api().post("/users/login", loginCredentials);
      const userData = {
        jwt: result.data.token,
        username: result.data.username,
        avatarColor: getRandomColor(),
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData.jwt);
      setIsLoading(false);
      setLoginCredentials({ email: "", password: "" });
      setLoginError("");
    } catch (error) {
      let message = handleErrorMessage(error);

      setIsLoading(false);
      setLoginError(message);
    }
  };

  return (
    <form
      action="#"
      className={styles["login-form"]}
      noValidate={true}
      onSubmit={(e) => {
        e.preventDefault(e);
        setIsLoading(true);
        handleAuthFormSubmit(loginCredentials, setLoginError, login);
      }}
    >
      <div className={`${styles["login-title"]} ${themeClassName}`}>
        <h2>Log In</h2>
      </div>

      <div className={styles["login-email-input"]}>
        <input
          type="email"
          placeholder="Email"
          value={loginCredentials.email}
          onChange={(e) =>
            setLoginCredentials({
              ...loginCredentials,
              email: e.target.value,
            })
          }
        />
      </div>

      <div className={styles["login-password-input"]}>
        <input
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          value={loginCredentials.password}
          onChange={(e) =>
            setLoginCredentials({
              ...loginCredentials,
              password: e.target.value,
            })
          }
        />
        <div onClick={() => setIsVisible(!isVisible)}>
          {isVisible ? (
            <img src="../../../images/show-password.svg" alt="" />
          ) : (
            <img src="../../../images/hide-password.svg" alt="" />
          )}
        </div>
      </div>

      <div
        className={`${styles["error-msg"]} ${
          loginError ? styles["active"] : ""
        }`}
      >
        <p>{loginError}</p>
      </div>

      <div className={styles["login-btn"]}>
        <button type="submit">
          Log In {isLoading && <p className={styles["loading"]}></p>}
        </button>
      </div>
    </form>
  );
}
