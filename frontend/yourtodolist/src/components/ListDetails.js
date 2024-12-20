import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import './ListDetails.css';
import apiService from '../services/apiService';

// Register required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const ListDetails = ({ updateListInMenu }) => {
  const { id } = useParams();
  const [list, setList] = useState(null);
  const [todos, setTodos] = useState([]);
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newMemberName, setNewMemberName] = useState('');
  const [newItemText, setNewItemText] = useState('');

  const fetchUpdatedList = async () => {
    try {
      const response = await apiService.getListById(id);
      setList(response.data);
      setTodos(response.data.todos || []);
      setMembers(response.data.members || []);

      if (updateListInMenu) {
        updateListInMenu(response.data);
      }
    } catch (err) {
      console.error('Error fetching updated list:', err);
    }
  };

  useEffect(() => {
    const fetchList = async () => {
      try {
        const response = await apiService.getListById(id);
        setList(response.data);
        setTodos(response.data.todos || []);
        setMembers(response.data.members || []);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching list:', err);
        setError('Failed to load the list.');
        setLoading(false);
      }
    };

    fetchList();
  }, [id]);

  const toggleComplete = async (todoId) => {
    try {
      await apiService.updateItem(todoId, { completed: true });
      await fetchUpdatedList();
    } catch (err) {
      console.error('Error updating item:', err);
    }
  };

  const deleteItem = async (todoId) => {
    try {
      await apiService.deleteItem(todoId);
      await fetchUpdatedList();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const addMember = async () => {
    if (!newMemberName.trim()) return;
    try {
      await apiService.addMember(id, newMemberName);
      setNewMemberName('');
      await fetchUpdatedList();
    } catch (err) {
      console.error('Error adding member:', err);
    }
  };

  const addItem = async () => {
    if (!newItemText.trim()) return;
    try {
      await apiService.addItem(id, newItemText);
      setNewItemText('');
      await fetchUpdatedList();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const deleteMember = async (memberId) => {
    try {
      await apiService.deleteMember(memberId);
      await fetchUpdatedList();
    } catch (err) {
      console.error('Error deleting member:', err);
    }
  };

  const generateChartData = () => {
    const completed = todos.filter((todo) => todo.completed).length;
    const notCompleted = todos.length - completed;

    return {
      labels: ['Completed', 'Not Completed'],
      datasets: [
        {
          data: [completed, notCompleted],
          backgroundColor: ['#4caf50', '#f44336'],
          borderWidth: 1,
        },
      ],
    };
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="list-details-container">
      <h2>{list.name}</h2>
      <div className="list-details-sections">
        <div className="chart-section">
          <h3>Todo Completion</h3>
          <Pie data={generateChartData()} />
        </div>
        <div className="todos-section">
          <h3>Todos</h3>
          <ul>
            {todos.map((todo) => (
                <li
                key={todo._id}
                style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}
                >           
                {todo.text}
                <button className="check-button" onClick={() => toggleComplete(todo._id)}>
                {todo.completed ? 'Completed' : 'Check'}
      </button>
      <button className="delete-button" onClick={() => deleteItem(todo._id)}>Delete</button>
    </li>
  ))}
</ul>

          <div className="add-item-form">
            <input
              type="text"
              value={newItemText}
              onChange={(e) => setNewItemText(e.target.value)}
              placeholder="Add new item"
            />
            <button onClick={addItem}>Add Item</button>
          </div>
        </div>
        <div className="members-section">
          <h3>Members</h3>
          <ul>
            {members.map((member) => (
                <li key={member._id}>
                    {member.name}
                    <button className="delete-button" onClick={() => deleteMember(member._id)}>Delete</button>
                </li>
  ))}
</ul>

          <div className="add-member-form">
            <input
              type="text"
              value={newMemberName}
              onChange={(e) => setNewMemberName(e.target.value)}
              placeholder="Add new member"
            />
            <button onClick={addMember}>Add Member</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListDetails;
