import checkTodoValidity from "./checkTodoValidity";

export default function handleTodoFormSubmit(
  todo,
  setInvalidFields,
  setValidationError,
  submitTodo
) {
  const error = checkTodoValidity(todo);
  if (error) {
    setInvalidFields(error.invalidProps);
    setValidationError(error.message);
    return;
  }
  setInvalidFields([]);
  setValidationError("");
  submitTodo(todo);
}
