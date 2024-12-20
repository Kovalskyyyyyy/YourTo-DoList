import React, { useState } from 'react';
import apiService from '../services/apiService';

const AddItemForm = ({ listId, addItem }) => {
  const [text, setText] = useState('');

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await apiService.createItem({ text, listId });
      addItem(response.data);
      setText('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a new item"
        required
      />
      <button type="submit">Add</button>
    </form>
  );
};

export default AddItemForm;
