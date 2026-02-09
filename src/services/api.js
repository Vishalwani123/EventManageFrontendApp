import axios from 'axios';

// const API_URL = 'https://eventmanagebackendapp-production.up.railway.app';
// const API_URL = 'http://127.0.0.1:54444';
//  const API_URL = 'http://localhost:8080';
const API_URL = 'https://event-management-system-tgp9.onrender.com';
// const API_URL = process.env.REACT_APP_BACKEND_URL;
// const API_URL = 'http://127.0.0.1:59001';


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;