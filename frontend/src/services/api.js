import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    }
})

export const getTasks = async (filters = {}) => {
    try{
        const params = {};
        if (filters.status) params.status = filters.status;
        if (filters.priority) params.priority = filters.priority;
        if (filters.sortBy) params.sortBy = filters.sortBy;

        const response = await api.get('/tasks', {params});
        return response.data.data;
    }
    catch (err) {
        throw new Error(err.response?.data?.message || error.message || "Failed to fetch tasks");
    }
} 

export const createTask = async (taskData) =>{
    try{
        const response = await api.post('/tasks', taskData);
        return response.data.data;
    }
    catch (err){
        throw new Error(err.response?.data?.message|| error.message || 'Failed to create task');
    }
}
