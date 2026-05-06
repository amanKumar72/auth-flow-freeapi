const API_BASE_URL = 'https://api.freeapi.app/api/v1';

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: User;
  token?: string;
}

export interface RegisterData {
  email: string;
  password: string;
  username: string;
  role: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
}

export class AuthService {
  static async register(userData: RegisterData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      return data;
    } catch (error) {
      console.error('Registration error:', error);
      throw error;
    }
  }

  static async login(credentials: LoginData): Promise<AuthResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });
      
      const data = await response.json();
      console.log('Login response:', data); // Debug log
       
      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      // Store tokens in localStorage for future requests
      // Check different possible token field names
      const token = data.accessToken || data.token || data.data?.token || data.data?.accessToken;
      const refreshToken = data.refreshToken || data.data?.refreshToken;
      
      if (token) {
        localStorage.setItem('accessToken', token);
        console.log('Token stored:', token); // Debug log
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
        console.log('Refresh token stored:', refreshToken); // Debug log
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  static async logout(): Promise<{ success: boolean; message: string }> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/users/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      // Clear tokens from localStorage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  static async getCurrentUser(): Promise<{ success: boolean; data?: User; message: string }> {
    try {
      const token = localStorage.getItem('accessToken');
      console.log('Retrieved token:', token); // Debug log
      
      if (!token) {
        console.log('No token found in localStorage');
        return { success: false, message: 'No authentication token found' };
      }

      const response = await fetch(`${API_BASE_URL}/users/current-user`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log('Current user response:', data); // Debug log
      return data;
    } catch (error) {
      console.error('Get current user error:', error);
      throw error;
    }
  }

  static async changePassword(passwordData: ChangePasswordData): Promise<{ success: boolean; message: string }> {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`${API_BASE_URL}/users/change-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(passwordData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

  static isAuthenticated(): boolean {
    // Check if access token exists in localStorage
    return !!localStorage.getItem('accessToken');
  }
}
