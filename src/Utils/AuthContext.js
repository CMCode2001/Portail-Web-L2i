import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    user: null,
    accessToken: null,
    isLoggedIn: false,
  });

  const login = (userData, token) => {
    setAuthData({
      user: userData,
      accessToken: token,
      isLoggedIn: true,
    });
  };

  const logout = () => {
    setAuthData({
      user: null,
      accessToken: null,
      isLoggedIn: false,
    });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
