import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Handle response errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: () => {
    window.location.href = `${API_URL}/auth/login`;
  },
  
  getCurrentUser: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },
  
  logout: async () => {
    const response = await api.post('/auth/logout');
    localStorage.removeItem('token');
    return response.data;
  },
};

// Tasks API
export const tasksAPI = {
  getTasks: async (params = {}) => {
    const response = await api.get('/tasks', { params });
    return response.data;
  },
  
  getTask: async (taskId) => {
    const response = await api.get(`/tasks/${taskId}`);
    return response.data;
  },
  
  createTask: async (taskData) => {
    const response = await api.post('/tasks', taskData);
    return response.data;
  },
  
  updateTask: async (taskId, taskData) => {
    const response = await api.put(`/tasks/${taskId}`, taskData);
    return response.data;
  },
  
  deleteTask: async (taskId) => {
    const response = await api.delete(`/tasks/${taskId}`);
    return response.data;
  },
  
  syncEmails: async () => {
    const response = await api.post('/tasks/sync');
    return response.data;
  },
  
  getPollingStatus: async () => {
    const response = await api.get('/tasks/polling/status');
    return response.data;
  },
};

// Users API
export const usersAPI = {
  getUsers: async (params = {}) => {
    const response = await api.get('/users', { params });
    return response.data;
  },
  
  getUser: async (userId) => {
    const response = await api.get(`/users/${userId}`);
    return response.data;
  },
  
  updateUserRole: async (userId, role) => {
    const response = await api.put(`/users/${userId}/role`, { role });
    return response.data;
  },
};

// Meetings API
export const meetingsAPI = {
  getMeetings: async (params = {}) => {
    const response = await api.get('/meetings', { params });
    return response.data;
  },
  
  getMeeting: async (meetingId) => {
    const response = await api.get(`/meetings/${meetingId}`);
    return response.data;
  },
  
  getTranscript: async (meetingId) => {
    const response = await api.get(`/meetings/${meetingId}/transcript`);
    return response.data;
  },
  
  getSummary: async (meetingId) => {
    const response = await api.get(`/meetings/${meetingId}/summary`);
    return response.data;
  },
  
  syncMeetings: async () => {
    const response = await api.post('/meetings/sync');
    return response.data;
  },
  
  processMeeting: async (meetingId) => {
    const response = await api.post(`/meetings/${meetingId}/process`);
    return response.data;
  },
  
  getPollingStatus: async () => {
    const response = await api.get('/meetings/polling/status');
    return response.data;
  },
  
  getStats: async () => {
    const response = await api.get('/meetings/stats');
    return response.data;
  },
  
  getTasksFromMeeting: async (meetingId) => {
    const response = await api.get(`/tasks/from-meeting/${meetingId}`);
    return response.data;
  },
};

export default api;
