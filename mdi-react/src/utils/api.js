import { jwt } from './jwt';

const API_LOGIN_URL = '/api';
const API_BASE_URL = 'http://localhost:5001/api';

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

export async function handleResponse(response) {
  let data;
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      data = await response.text();
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.error('Response is not JSON:', data);
        throw new Error('Invalid response format');
      }
    }
  } catch (error) {
    console.error('Response parsing error:', error);
    throw new Error('Failed to parse server response');
  }

  if (!response.ok) {
    console.error('API Error:', data);
    throw new ApiError(
      response.status,
      data.message || data.error || 'An error occurred'
    );
  }

  return data;
}

export const api = {
  async login(credentials) {
    try {
      console.log('Credentials received in api.login:', credentials);
      const response = await fetch(`${API_LOGIN_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      console.log('Login response status:', response.status);
      const data = await response.json();
      console.log('Login response data:', data);

      if (!response.ok) {
        throw new ApiError(response.status, data.message || 'Login failed');
      }

      return data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  async register(data) {
    try {
      const response = await fetch(`${API_LOGIN_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data),
      });
      console.log('Server response:', response); // Add this line

      return handleResponse(response);
    } catch (error) {
      console.error('Register error:', error);
      throw error;
    }
  },

  setAuthHeader(token) {
    return {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    };
  },

  async get(endpoint) {
    try {
      const token = jwt.getToken();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        credentials: 'include',
        headers: this.setAuthHeader(token),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('GET request error:', error);
      throw error;
    }
  },

  async post(endpoint, data) {
    try {
      const token = jwt.getToken();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        credentials: 'include',
        headers: this.setAuthHeader(token),
        body: JSON.stringify(data),
      });
      return handleResponse(response);
    } catch (error) {
      console.error('POST request error:', error);
      throw error;
    }
  }
};