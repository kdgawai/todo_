
import React, { useState, useEffect } from 'react';
import './App.css';
import DigitalClock from './DigitalClock'; 
import AnalogClock from './AnalogClock'; 

function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  // Load initial data from local storage on app load
  useEffect(() => {
    const savedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(savedTodos);
  }, []);

  const addTodo = () => {
    if (inputText.trim() !== '') {
      const newTodo = {
        id: Date.now(),
        text: inputText,
        completed: false,
      };

      const updatedTodos = [newTodo, ...todos];
      setTodos(updatedTodos);
      localStorage.setItem('todos', JSON.stringify(updatedTodos));
      setInputText('');
    }
  };

  const markAsComplete = (id) => {
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );

    setTodos(updatedTodos);
    localStorage.setItem('todos', JSON.stringify(updatedTodos));
  };

  const resetTodos = () => {
    setTodos([]);
    localStorage.setItem('todos', JSON.stringify([]));
  };

  return (
    <div className="App">
           <h1>TODO App</h1>

      <DigitalClock />
      <AnalogClock />
      <div className="input-container">
        <input
          type="text"
          placeholder="Add a new todo..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTodo();
            }
          }}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <div className="todo-list">
        <h2>Active Todos</h2>
        {todos
          .filter((todo) => !todo.completed)
          .map((todo) => (
            <div
              key={todo.id}
              className={`todo ${todo.completed ? 'completed' : ''}`}
              onClick={() => markAsComplete(todo.id)}
            >
              {todo.text}
            </div>
          ))}
      </div>

      <div className="completed-list">
        <h2>Completed Todos</h2>
        {todos
          .filter((todo) => todo.completed)
          .map((todo) => (
            <div
              key={todo.id}
              className={`todo ${todo.completed ? 'completed' : ''}`}
              onClick={() => markAsComplete(todo.id)}
            >
              {todo.text}
            </div>
          ))}
      </div>

      <button className="reset-button" onClick={resetTodos}>
        Reset
      </button>
    </div>
  );
}

export default App;




