import React, { useState } from 'react';
import AddItemForm from './AddItemForm';
import TodoList from './TodoList';
import './List.css';

const List = ({ lists, addList }) => {
  const [newListName, setNewListName] = useState('');

  const handleAddList = () => {
    if (newListName.trim()) {
      addList(newListName);
      setNewListName('');
    }
  };

  return (
    <div className="list-container">
      <h2 className="list-heading">Lists</h2>
      <ul className="list-ul">
        {lists.map((list) => (
          <li key={list._id} className="list-item">
            <TodoList list={list} />
          </li>
        ))}
      </ul>
      <div className="list-form">
        <input
          type="text"
          placeholder="New list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="list-input"
        />
        <button onClick={handleAddList} className="list-add-btn">Add List</button>
      </div>
    </div>
  );
};

export default List;