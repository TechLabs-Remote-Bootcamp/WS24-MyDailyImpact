import { useState, useEffect } from 'react';
import { api } from '../utils/api';
import { jwt } from '../utils/jwt';

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

export function useAuth() {
  const [authState, setAuthState] = useState(initialState);

  useEffect(() => {
    initializeAuth();
  }, []);

  const initializeAuth = async () => {
    const token = jwt.getToken();
    
    if (token && jwt.isTokenValid(token)) {
      const decoded = jwt.decodeToken(token);
      if (decoded) {
        setAuthState({
          isAuthenticated: true,
          user: {
            email: decoded.email,
            name: decoded.name,
            role: decoded.role,
          },
          loading: false,
          error: null,
        });
        return;
      }
    }
    
    jwt.removeToken();
    setAuthState({ ...initialState, loading: false });
  };

  const login = async (credentials) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { token, user } = await api.login(credentials);
      
      if (token && jwt.isTokenValid(token)) {
        jwt.setToken(token, credentials.rememberMe);
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
        return true;
      } else {
        throw new Error('Invalid token received');
      }
    } catch (error) {
      const message = error instanceof Error 
        ? error.message 
        : 'An error occurred during login';
      
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: message,
      }));
      return false;
    }
  };

  const register = async (data) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const { token, user } = await api.register(data);
      
      if (token && jwt.isTokenValid(token)) {
        jwt.setToken(token, true);
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
        return true;
      } else {
        throw new Error('Invalid token received');
      }
    } catch (error) {
      const message = error instanceof Error 
        ? error.message 
        : 'An error occurred during registration';
      
      setAuthState(prev => ({
        ...prev,
        loading: false,
        error: message,
      }));
      return false;
    }
  };

  const logout = () => {
    jwt.removeToken();
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  };

  return {
    ...authState,
    login,
    register,
    logout,
  };
}