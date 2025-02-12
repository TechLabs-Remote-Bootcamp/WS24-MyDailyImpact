// api.js
import { jwt } from "./jwt";

const API_BASE_URL = "/api";

export class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

// Improved response handler with better error checking
export async function handleResponse(response) {
  // First check if response is OK
  if (!response.ok) {
    throw new ApiError(
      response.status,
      `HTTP error! status: ${response.status}`
    );
  }

  // Check content type
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Response is not JSON");
  }

  try {
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Response parsing error:", error);
    throw new Error("Failed to parse server response");
  }
}

export const api = {
  // Login method
  async login(credentials) {
    try {
      console.log("Attempting login with credentials:", credentials);
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  },

  // Registration method
  async register(data) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Register error:", error);
      throw error;
    }
  },

  // Helper method to set auth headers
  setAuthHeader(token) {
    return {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": "application/json",
    };
  },

  // Improved GET method with better error handling
  async get(endpoint) {
    try {
      const token = jwt.getToken();
      console.log("Making GET request to:", `${API_BASE_URL}${endpoint}`);
      console.log("With token:", token ? "Present" : "Not present");

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "GET",
        credentials: "include",
        headers: this.setAuthHeader(token),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);

      return handleResponse(response);
    } catch (error) {
      console.error("GET request error:", error);
      throw error;
    }
  },

  // POST method
  async post(endpoint, data) {
    try {
      const token = jwt.getToken();
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: this.setAuthHeader(token),
        body: JSON.stringify(data),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("POST request error:", error);
      throw error;
    }
  },

  // New PUT method for updating profile
  async put(endpoint, data) {
    try {
      const token = jwt.getToken();
      console.log("Making PUT request to:", `${API_BASE_URL}${endpoint}`);
      console.log("With data:", data);

      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: "PUT",
        credentials: "include",
        headers: this.setAuthHeader(token),
        body: JSON.stringify(data),
      });

      console.log("Response status:", response.status);
      console.log("Response headers:", [...response.headers.entries()]);

      return handleResponse(response);
    } catch (error) {
      console.error("PUT request error:", error);
      throw error;
    }
  },

  // New method for getting current user profile
  async getCurrentUser() {
    return this.get("/auth/current-user");
  },

  // New method for updating user profile
  async updateProfile(data) {
    try {
      const token = jwt.getToken();
      console.log("Making PUT request to update profile");
      const response = await fetch(`${API_BASE_URL}/auth/update-profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
        credentials: "include",
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  },

  // New method for changing password
  async changePassword(passwordData) {
    return this.put("/auth/change-password", passwordData);
  },

  // New method for deleting account
  async deleteAccount() {
    try {
      const token = jwt.getToken();
      const response = await fetch(`${API_BASE_URL}/auth/delete-account`, {
        method: "DELETE",
        credentials: "include",
        headers: this.setAuthHeader(token),
      });

      return handleResponse(response);
    } catch (error) {
      console.error("Delete account error:", error);
      throw error;
    }
  },
};