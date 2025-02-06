export default function checkPasswordValidity(passwordInput) {
  if (!passwordInput) {
    return "Please enter your password.";
  }

  if (passwordInput.length < 8) {
    return "Password must be at least 8 characters or longer.";
  }

  if (!passwordInput.match(/[A-Z]/g)) {
    return "Password must contain an uppercase letter (A-Z).";
  }

  if (!passwordInput.match(/[a-z]/g)) {
    return "Password must contain a lowercase letter (a-z).";
  }

  if (!passwordInput.match(/[0-9]/g)) {
    return "Password must contain at least one digit (0-9).";
  }

  if (!passwordInput.match(/[^a-zA-Z0-9]/g)) {
    return "Password must contain at least one special character (e.g. !@#$%^&*()_-=+/).";
  }

  return;
}
