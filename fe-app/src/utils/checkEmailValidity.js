export default function checkEmailValidity(emailInput) {
  const atIndex = emailInput.indexOf("@");
  const emailDomain = emailInput.slice(atIndex + 1);

  if (!emailInput) {
    return "Please enter your email address.";
  }

  if (!emailInput.includes("@")) {
    return "An email address must include the '@' symbol.";
  }

  if (atIndex === 0) {
    return "An email address can't start with '@' symbol.";
  }

  if (!emailDomain || !emailDomain.includes(".") || emailDomain.endsWith(".")) {
    return "The email address must contain a valid domain (e.g. email@domain.com)";
  }

  return;
}
