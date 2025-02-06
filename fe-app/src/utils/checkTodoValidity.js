export default function checkTodoValidity(todo) {
  const invalidProps = Object.keys(todo).filter((key) => !todo[key]);

  if (invalidProps.length > 0) {
    return {
      invalidProps: invalidProps,
      message: "Please fill out the required fields to continue.",
    };
  }
}
