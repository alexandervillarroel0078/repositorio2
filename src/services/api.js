// src/services/api.js
import axios from 'axios';

const api = axios.create({
 // baseURL:  'http://127.0.0.1:5000',
 //para varias maquinas en la misma red
  //baseURL: 'http://192.168.0.12:5000',
//produccion
baseURL: process.env.REACT_APP_API_URL,


});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
