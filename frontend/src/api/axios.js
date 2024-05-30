import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:8000', // Update with your backend URL
  withCredentials: true, // To include cookies with requests
});

export default instance;