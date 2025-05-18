  import axios from 'axios';
  import { useAuthStore } from "../store/authStore";
export const apiBaseurl =  
import.meta.env.VITE_API_BASE_URL ||
'https://hu-iapams-api.vercel.app/api/v1'; 

export const api = axios.create({
    baseURL: `${apiBaseurl}`,
  });

  export const publicApi = axios.create({
    baseURL: `${apiBaseurl}`,
  });




export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://hu-iapams-api.vercel.app/api/v1',
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
    
  },
});

// Add request interceptor for auth token
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});





export const loginUser = async (credentials) => {
  try {
    const response = await apiBaseurl.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle specific error cases
      if (error.response) {
        switch (error.response.status) {
          case 401:
            throw new Error('Invalid credentials');
          case 403:
            throw new Error('Account is inactive');
          case 429:
            throw new Error('Too many attempts. Please try again later');
          default:
            throw new Error('Login failed. Please try again');
        }
      } else if (error.request) {
        throw new Error('Network error. Please check your connection');
      }
    }
    throw new Error('An unexpected error occurred');
  }
};

export const forgotPassword = async (email) => {
  await apiClient.post('/auth/forgot-password', { email });
};

export const refreshToken = async () => {
  const response = await apiClient.post('/auth/refresh-token');
  return response.data;
};