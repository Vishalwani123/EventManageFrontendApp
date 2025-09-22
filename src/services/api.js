import axios from 'axios';

const API_URL = 'https://eventmanagebackendapp-production.up.railway.app';


const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;