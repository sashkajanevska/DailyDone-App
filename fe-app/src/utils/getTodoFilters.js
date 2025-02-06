export default function getTodoFilters(todos) {
  const today = todos.filter((todo) => {
    const today = new Date().toLocaleDateString();
    let todoDate = new Date(todo.dueDate).toLocaleDateString();

    return todoDate === today && !todo.isCompleted;
  });

  const upcoming = todos.filter((todo) => {
    const todoDate = new Date(todo.dueDate);
    const today = new Date();

    todoDate.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    return todoDate > today && !todo.isCompleted;
  });

  const all = todos;

  const priority = todos.filter(
    (todo) => todo.isHighPriority === true && !todo.isCompleted
  );

  const completed = todos.filter((todo) => todo.isCompleted);

  return { today, upcoming, all, priority, completed };
}
