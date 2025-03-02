import { useState, useEffect, useCallback } from "react";
import { api } from "../utils/api";
import { jwt } from "../utils/jwt";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

export function useAuth() {
  const [authState, setAuthState] = useState(initialState);

  const initializeAuth = useCallback(() => {
    const token = jwt.getToken();

    if (token && jwt.isTokenValid(token)) {
      const decoded = jwt.decodeToken(token);
      if (decoded) {
        const user = {
          id: decoded.id,
          email: decoded.email,
          firstName: decoded.firstName,
          lastName: decoded.lastName,
          birthday: decoded.birthday,
          gender: decoded.gender,
          role: decoded.role || "user",
        };
        setAuthState({
          isAuthenticated: true,
          user,
          loading: false,
          error: null,
        });
      } else {
        jwt.removeToken();
        setAuthState({ ...initialState, loading: false });
      }
    } else {
      setAuthState({ ...initialState, loading: false });
    }
  }, []);

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  const login = async (credentials) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      console.log("Credentials before api.login:", credentials);
      const response = await api.login(credentials);

      console.log("Received login response:", response);

      if (response.token && jwt.isTokenValid(response.token)) {
        jwt.setToken(response.token, credentials.rememberMe);
        const authUser = {
          id: response.user.id,
          email: response.user.email,
          firstName: response.user.firstName,
          lastName: response.user.lastName,
          salutation: response.user.salutation,
          birthday: response.user.birthday,
          gender: response.user.gender,
          role: response.user.role || "user",
        };
        const newAuthState = {
          isAuthenticated: true,
          user: authUser,
          loading: false,
          error: null,
        };
        setAuthState(newAuthState);
        return true;
      } else {
        throw new Error("Invalid token received");
      }
    } catch (error) {
      console.error("Login error:", error);
      const message = error.message || "An error occurred during login";

      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: message,
      }));
      return false;
    }
  };

  const register = async (data) => {
    setAuthState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const { token, user } = await api.register(data);

      if (token && jwt.isTokenValid(token)) {
        jwt.setToken(token, true);
        const authUser = {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          salutation: user.salutation,
          birthday: user.birthday,
          gender: user.gender,
          role: user.role || "user",
        };
        const newAuthState = {
          isAuthenticated: true,
          user: authUser,
          loading: false,
          error: null,
        };
        setAuthState(newAuthState);
        return true;
      } else {
        throw new Error("Invalid token received");
      }
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "An error occurred during registration";

      setAuthState((prev) => ({
        ...prev,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: message,
      }));
      return false;
    }
  };

  const logout = useCallback(() => {
    jwt.removeToken();
    setAuthState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    ...authState,
    login,
    register,
    logout,
    initializeAuth,
  };
}

// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext(null);

// export const AuthProvider = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [user, setUser] = useState(null);

//   const login = async (credentials) => {
//     try {
//       const response = await api.post("/login", credentials);
//       setIsAuthenticated(true);
//       setUser(response.data.user);
//       return response;
//     } catch (error) {
//       throw error;
//     }
//   };

//   const logout = () => {
//     setIsAuthenticated(false);
//     setUser(null);
//   };

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error("useAuth must be used within an AuthProvider");
//   }
//   return context;
// };
