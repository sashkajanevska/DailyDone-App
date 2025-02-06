const handleErrorMessage = (error) => {
  let message;
  if (error.response) {
    message = error.response.data.error;
  } else if (error.message) {
    message =
      "We're having trouble connecting to the server. Please check your internet connection.";
  } else {
    message = "An unknown error occurred. Please try again later.";
  }
  return message;
};

export default handleErrorMessage;
