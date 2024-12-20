import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import ListMenu from './components/ListMenu';
import ListDetails from './components/ListDetails';
import './App.css';
import apiService from './services/apiService';

function App() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await apiService.getLists();
        setLists(response.data);
      } catch (error) {
        console.error('Error fetching lists:', error);
      }
    };
    fetchLists();
  }, []);

  const addList = async (name) => {
    try {
      const response = await apiService.createList({ name });
      setLists([...lists, response.data]);
    } catch (error) {
      console.error('Error adding list:', error);
    }
  };

  const updateList = (updatedList) => {
    setLists((prevLists) =>
      prevLists.map((list) => (list._id === updatedList._id ? updatedList : list))
    );
  };

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route
          path="/"
          element={<ListMenu lists={lists} addList={addList} setLists={setLists} />}
        />
        <Route
          path="/list/:id"
          element={<ListDetails lists={lists} updateList={updateList} />}
        />
      </Routes>
    </div>
  );
}

export default App;
