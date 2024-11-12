import React, { useEffect, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { SERVER_URL } from "./constantURL";
import { useAuth } from "./AuthContext";

const PersistLogin = () => {
  const { authData, login, logout } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const refreshToken = useCallback(async () => {
    try {
      const response = await fetch(`${SERVER_URL}/refresh-token`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors du rafraîchissement du token");
      }

      const data = await response.json();
      const newAccessToken = data?.access_token;
      const user = data?.user;

      if (user && newAccessToken) login(user, newAccessToken);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token : ", error);
      logout();
    }
  }, [login, logout]);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      if (!authData?.accessToken) {
        await refreshToken();
      }
      setIsLoading(false);
    };

    if (!authData?.isLoggedOut) {
      verifyRefreshToken();
    } else {
      setIsLoading(false);
    }
  }, [authData?.accessToken, authData?.isLoggedOut, refreshToken]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
