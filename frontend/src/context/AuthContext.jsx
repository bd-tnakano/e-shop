
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const fetchUser = async (token) => {
    // You need a way to get the user ID. Assuming it's stored in the token.
    // This is a placeholder and needs to be implemented based on your JWT payload.
    const getUserIdFromToken = (token) => {
      try {
        return JSON.parse(atob(token.split('.')[1])).id;
      } catch (e) {
        return null;
      }
    };

    const userId = getUserIdFromToken(token);
    if (!userId) return;

    const response = await fetch(`/api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (data.success) {
      setUser(data.data);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsLoggedIn(true);
      fetchUser(storedToken);
    }
  }, []);

  const register = async (userData) => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      const data = await response.json();
      if (data.success) {
        // Optionally login the user right after registration
        return { success: true };
      } else {
        // Handle registration error
        console.error(data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Network error or server unreachable' };
    }
  };

  const login = async (username, password) => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('token', data.token);
        // SENSITIVE DATA EXPOSURE (Vulnerability)
        console.log('Token:', data.token);

        setIsLoggedIn(true);
        fetchUser(data.token);
        return { success: true };
      } else {
        // Handle login error
        console.error(data.error);
        return { success: false, error: data.error };
      }
    } catch (error) {
      console.error(error);
      return { success: false, error: 'Network error or server unreachable' };
    }
  };

  const logout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null);
  };

  const updateUser = async (updatedUserData) => {
    if (!user) return;
    const response = await fetch(`/api/users/${user._id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      }
    );
    const data = await response.json();
    if (data.success) {
      setUser(data.data);
    } else {
      console.error(data.error);
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, register, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
