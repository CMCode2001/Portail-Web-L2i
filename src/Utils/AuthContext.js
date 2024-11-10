import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState({
    user: null,
    accessToken: null,
    isLoggedIn: false,
    isLoggedOut: false, // Ajoute ce flag
  });

  const login = (user, token) => {
    setAuthData({
      user,
      accessToken: token,
      isLoggedIn: true,
      isLoggedOut: false,
    });
  };

  const logout = () => {
    setAuthData({
      user: null,
      accessToken: null,
      isLoggedIn: false,
      isLoggedOut: true,
    }); // Met isLoggedOut à true
  };

  const setuser = (user) => {
    setAuthData({
      user: user,
    });
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout, setuser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
