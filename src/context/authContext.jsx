
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { api } from '../utils/api';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const storedUser = localStorage.getItem('user');
    const storedTokens = localStorage.getItem('tokens');
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      tokens: storedTokens ? JSON.parse(storedTokens) : null,
    };
  });

  // const login = async (username, password) => {
  //   const res = await api.post('/auth/login', {
  //     username,
  //     password,
  //   }).catch((error) => {
  //     if (error.response) {
  //       throw new Error(error.response.data.message || 'Login failed');
  //     } else {
  //       throw new Error('Network error. Please try again later.');
  //     }
      
  //   });

  //   const data = res.data;
  //   if (!data) {
  //     throw new Error('No response from server');
  //   }

  //   if (data.success) {
  //     const { user, tokens } = data.data;

  //     localStorage.setItem('user', JSON.stringify(user));
  //     localStorage.setItem('tokens', JSON.stringify(tokens));

  //     setAuth({ user, tokens });
  //   } else {
  //     throw new Error(data.message || 'Login failed');
  //   }
  // };


  // In AuthContext.js
const login = async (username, password) => {
  const res = await api.post('/auth/login', {
    username,
    password,
  }).catch((error) => {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    } else {
      throw new Error('Network error. Please try again later.');
    }
  });

  const data = res.data;
  if (!data) {
    throw new Error('No response from server');
  }

  if (data.success) {
    const { user, tokens } = data.data;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('tokens', JSON.stringify(tokens));
    setAuth({ user, tokens });
    return user;
  } else {
    throw new Error(data.message || 'Login failed');
  }
};
  const logout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('tokens');
    setAuth({ user: null, tokens: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
