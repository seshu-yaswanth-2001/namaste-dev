import { useState } from "react";
import "./todo.css";

const Todo = () => {
  const [inputValue, setInputValue] = useState("");
  const [todos, setTodos] = useState([]);

  const handleClick = (e) => {
    e.preventDefault();
    if (inputValue.trim() === "") return;

    setTodos((prev) => [
      ...prev,
      {
        id: Date.now(),
        label: inputValue,
        completed: false,
      },
    ]);

    setInputValue("");
  };

  const handleCheckbox = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div>
      <h1>Todo Progress</h1>
      <form onSubmit={handleClick}>
        <input
          type="text"
          placeholder="Enter todo"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className="item">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleCheckbox(todo.id)}
            />
            <span className={todo.completed ? "active" : ""}>{todo.label}</span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
