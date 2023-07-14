import React, { useEffect, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import "./TODO.css";

const TODO = () => {
  const initialState = JSON.parse(localStorage.getItem("todos")) || [];
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState(initialState);
  const [editTodo, setEditTodo] = useState(null);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const updateTodo = (title, id, completed) => {
    const newTodo = todos.map((todo) =>
      todo.id === id ? { title, id, completed } : todo
    );
    setTodos(newTodo);
    setEditTodo("");
  };

  useEffect(() => {
    if (editTodo) {
      setInput(editTodo.title);
    } else {
      setInput("");
    }
  }, [setInput, editTodo]);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };
  const onFormSubmit = (event) => {
    event.preventDefault();
    if (!editTodo) {
      setTodos([...todos, { id: uuidV4(), title: input, completed: false }]);
      setInput("");
    } else {
      updateTodo(input, editTodo.id, editTodo.completed);
    }
  };

  const handleDelete = ({ id }) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  const handleComplete = (todo) => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };
  const handleEdit = ({ id }) => {
    const findTodo = todos.find((todo) => todo.id === id);
    setEditTodo(findTodo);
  };

  return (
    <div className="conatiner">
      <div className="app-wrapper">
        <div className="header">
          <h1>To Do list</h1>
        </div>
        <div>
          <form onSubmit={onFormSubmit}>
            <input
              type="text"
              placeholder="Enter a Todo..."
              className="task-input"
              value={input}
              required
              onChange={onInputChange}
            />
            <button className="button-add" type="submit">
              {editTodo ? "Ok" : "Add"}
            </button>
          </form>
        </div>
        <div>
          {todos.map((todo) => (
            <li className="list-item" key={todo.id}>
              <input
                type="text"
                value={todo.title}
                className={`list ${todo.completed ? "complete" : ""}`}
                onChange={(event) => event.preventDefault()}
              />
              <button
                className="button-complete task-button"
                onClick={() => handleComplete(todo)}
              >
                <i className="fa fa-check-circle"></i>
              </button>
              <button
                className="button-edit task-button"
                onClick={() => handleEdit(todo)}
              >
                <i className="fa fa-edit"></i>
              </button>
              <button
                className="button-delete task-button"
                onClick={() => handleDelete(todo)}
              >
                <i className="fa fa-trash"></i>
              </button>
            </li>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TODO;
