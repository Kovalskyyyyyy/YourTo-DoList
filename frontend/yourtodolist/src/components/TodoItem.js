import React from 'react';
import './TodoItem.css';

const TodoItem = ({ item }) => {
  return (
    <li className={`todo-item ${item.completed ? 'todo-completed' : ''}`}>{item.text}</li>
  );
};

export default TodoItem;