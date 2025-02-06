import checkEmailValidity from "./checkEmailValidity";
import checkPasswordValidity from "./checkPasswordValidity";

export default function handleAuthFormSubmit(
  authCredentials,
  setAuthError,
  auth
) {
  let emailError = checkEmailValidity(authCredentials.email);
  let passwordError = checkPasswordValidity(authCredentials.password);

  if (Object.keys(authCredentials).length > 2 && !authCredentials.username) {
    setAuthError("Please enter a username.");
    return;
  }
  if (emailError) {
    setAuthError(emailError);
    return;
  }
  if (passwordError) {
    setAuthError(passwordError);
    return;
  }
  auth();
}
