import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ListMenu.css';
import apiService from '../services/apiService';

const ListMenu = ({ lists, addList, setLists }) => {
  const [newListName, setNewListName] = useState('');
  const navigate = useNavigate();

  const handleAddList = () => {
    if (newListName.trim()) {
      addList(newListName);
      setNewListName('');
    }
  };

  const handleDeleteList = async (listId) => {
    try {
      await apiService.deleteList(listId);
      setLists((prevLists) => prevLists.filter((list) => list._id !== listId));
    } catch (err) {
      console.error('Error deleting list:', err);
    }
  };  

  return (
    <div className="list-menu-container">
      <h2 className="list-menu-title">Lists</h2>
      <div className="list-add-section">
        <input
          type="text"
          placeholder="New list name"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          className="list-add-input"
        />
        <button onClick={handleAddList} className="list-add-button">
          Add List
        </button>
      </div>
      <ul className="list-menu">
        {lists.map((list) => (
          <li key={list._id} className="list-menu-item" onClick={() => navigate(`/list/${list._id}`)}>
            <div className="list-details">
              <h3>{list.name}</h3>
              <p>{list.todos.length} items</p>
              <p>{list.members.length} members</p>
            </div>
            <button
            onClick={(e) => {
            e.stopPropagation();
            handleDeleteList(list._id);
        }}
  className="delete-list-button"
>
  Delete
</button>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListMenu;
