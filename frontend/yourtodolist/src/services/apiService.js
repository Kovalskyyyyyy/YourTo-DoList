import axios from 'axios';

const API_URL = 'http://localhost:3003/api';

const apiService = {
  getLists: () => axios.get(`${API_URL}/lists`),
  getListById: (id) => axios.get(`${API_URL}/lists/${id}`),
  createList: (data) => axios.post(`${API_URL}/lists`, data),
  deleteList: (id) => axios.delete(`${API_URL}/lists/${id}`),
  addItem: (listId, text) => axios.post(`${API_URL}/items`, { text, listId }),
  updateItem: (id, data) => axios.put(`${API_URL}/items/${id}`, data),
  deleteItem: (id) => axios.delete(`${API_URL}/items/${id}`),
  addMember: (listId, name) => axios.post(`${API_URL}/members`, { name, listId }),
  deleteMember: (id) => axios.delete(`${API_URL}/members/${id}`),
};

export default apiService;
