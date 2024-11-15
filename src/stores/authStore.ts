import { create } from 'zustand';
import { jwtDecode } from 'jwt-decode';
import api from '../lib/axios';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'member' | 'guest';
  avatar?: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
}

const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: async (email: string, password: string) => {
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      const user = jwtDecode<User>(data.token);
      set({ user, isAuthenticated: true });
    } catch (error) {
      throw new Error('Login failed');
    }
  },
  logout: () => {
    localStorage.removeItem('token');
    set({ user: null, isAuthenticated: false });
  },
  register: async (data: RegisterData) => {
    try {
      await api.post('/auth/register', data);
    } catch (error) {
      throw new Error('Registration failed');
    }
  },
}));

export default useAuthStore;