import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { UserContext } from "../../context/UserContext";
import Api from "../../Api";
import getRandomColor from "../../utils/getRandomColor";
import handleErrorMessage from "../../utils/handleErrorMessage";
import handleAuthFormSubmit from "../../utils/handleAuthFormSubmit";

export default function RegisterForm({ styles }) {
  const [registerCredentials, setRegisterCredentials] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [registerError, setRegisterError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const { isDarkTheme } = useContext(ThemeContext);
  const { setUser } = useContext(UserContext);
  const themeClassName = isDarkTheme ? styles["dark-theme"] : "";

  const register = async () => {
    try {
      const result = await Api().post("/users/register", registerCredentials);
      const userData = {
        jwt: result.data.token,
        username: result.data.username,
        avatarColor: getRandomColor(),
      };

      localStorage.setItem("userData", JSON.stringify(userData));
      setUser(userData.jwt);
      setIsLoading(false);
      setRegisterCredentials({ username: "", email: "", password: "" });
      setRegisterError("");
    } catch (error) {
      let message = handleErrorMessage(error);

      setIsLoading(false);
      setRegisterError(message);
    }
  };

  return (
    <form
      action="#"
      className={styles["register-form"]}
      noValidate={true}
      onSubmit={(e) => {
        e.preventDefault();
        setIsLoading(true);
        handleAuthFormSubmit(registerCredentials, setRegisterError, register);
      }}
    >
      <div className={`${styles["register-title"]} ${themeClassName}`}>
        <h2>Create Account</h2>
      </div>

      <div className={styles["register-username-input"]}>
        <input
          type="text"
          placeholder="Username"
          value={registerCredentials.username}
          onChange={(e) =>
            setRegisterCredentials({
              ...registerCredentials,
              username: e.target.value,
            })
          }
        />
      </div>

      <div className={styles["register-email-input"]}>
        <input
          type="email"
          placeholder="Email"
          value={registerCredentials.email}
          onChange={(e) =>
            setRegisterCredentials({
              ...registerCredentials,
              email: e.target.value,
            })
          }
        />
      </div>

      <div className={styles["register-password-input"]}>
        <input
          type={isVisible ? "text" : "password"}
          placeholder="Password"
          value={registerCredentials.password}
          onChange={(e) =>
            setRegisterCredentials({
              ...registerCredentials,
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
          registerError ? styles["active"] : ""
        }`}
      >
        <p>{registerError}</p>
      </div>

      <div className={styles["register-btn"]}>
        <button type="submit">
          Sign Up {isLoading && <p className={styles["loading"]}></p>}
        </button>
      </div>
    </form>
  );
}
