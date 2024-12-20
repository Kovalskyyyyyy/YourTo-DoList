import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import TodoItem from './TodoItem';
import './TodoList.css';

const TodoList = ({ list }) => {
  const [todos, setTodos] = useState(list.todos || []);

  const addItem = (newItem) => {
    setTodos([...todos, newItem]);
  };

  return (
    <div className="todo-list-container">
      <h3 className="todo-list-title">{list.name}</h3>
      <ul className="todo-ul">
        {todos.map((todo) => (
          <TodoItem key={todo._id} item={todo} />
        ))}
      </ul>
      <AddItemForm listId={list._id} addItem={addItem} />
    </div>
  );
};

export default TodoList;
