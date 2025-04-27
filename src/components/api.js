import axios from 'axios';

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:4000',
  withCredentials: true, 
});

console.log('API base URL:', process.env.REACT_APP_API_URL);

export const authAPI = {
  logIn: (data) => API.post('/auth/login', data),
  logOut: () => API.post('/auth/logout'), 
};

export const userAPI = {
  getProfile: () => API.get('/users/profile'),
};  

export const employeeAPI = {
  getEmployees: () => API.get('/employees'),
  getEmployeeById: (id) => API.get(`/employees/${id}`),
  deleteEmployee: (id) => API.delete(`/employees/${id}`),
  updateEmployeeById: (id, data) => API.put(`/employees/${id}`, data)
};