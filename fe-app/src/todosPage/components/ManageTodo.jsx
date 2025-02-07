import { useState } from "react";
import Api from "../../Api";
import handleErrorMessage from "../../utils/handleErrorMessage";
import EditTodoForm from "./EditTodoForm";
import TodoDetails from "./TodoDetails";

export default function EditAndUpdateTodo({ todo, setError, getTodos }) {
  const [editedTodo, setEditedTodo] = useState(null);

  const updateTodo = async (updatedTodo) => {
    try {
      await Api().put(`/todos/${updatedTodo._id}`, updatedTodo);
      setEditedTodo(null);
      setError("");
      getTodos();
    } catch (error) {
      let message = handleErrorMessage(error);
      setError(message);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await Api().delete(`/todos/${id}`);
      setError("");
      getTodos();
    } catch (error) {
      let message = handleErrorMessage(error);
      setError(message);
    }
  };

  const handleEdit = (todo) => {
    const filteredTodo = Object.fromEntries(
      Object.entries(todo).filter(([key, value]) => typeof value === "string")
    );
    setEditedTodo(filteredTodo);
  };

  const handleDiscard = () => setEditedTodo(null);

  return (
    <>
      {editedTodo && editedTodo._id === todo._id ? (
        <EditTodoForm
          editedTodo={editedTodo}
          setEditedTodo={setEditedTodo}
          updateTodo={updateTodo}
          handleDiscard={handleDiscard}
        />
      ) : (
        <TodoDetails
          todo={todo}
          handleEdit={handleEdit}
          updateTodo={updateTodo}
          deleteTodo={deleteTodo}
        />
      )}
    </>
  );
}
