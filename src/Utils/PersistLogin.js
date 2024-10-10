import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
// import axios from "axios";
import { SERVER_URL } from "./constantURL";
import { useAuth } from "./AuthContext";
// import api from "./Api";

const PersistLogin = () => {
  const { authData, login, logout } = useAuth(); // Utilisation du contexte pour authData et login/logout
  const [isLoading, setIsLoading] = useState(true); // Utilisé pour afficher un écran de chargement pendant la vérification

  // const refreshToken = async () => {
  //   try {
  //     // const response = await axios.post(
  //     const response = await api.post(
  //       `${SERVER_URL}/refresh-token`,
  //       {}, // Aucune donnée n'est nécessaire dans le body pour cette requête
  //       { withCredentials: true } // Pour envoyer les cookies avec la requête
  //     );

  //     const newAccessToken = response.data?.access_token;
  //     const user = response.data?.user;
  //     // Mettre à jour les informations d'authentification dans le contexte
  //     // login(authData.user, newAccessToken);
  //     console.log("### newAccessToken" + newAccessToken);
  //     console.log("### User" + user);

  //     login(user, newAccessToken);
  //   } catch (error) {
  //     console.error("Erreur lors du rafraîchissement du token : ", error);
  //     logout(); // Déconnexion si le rafraîchissement échoue
  //   }
  // };

  const refreshToken = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/refresh-token`, {
        method: "POST",
        credentials: "include", // Pour envoyer les cookies avec la requête
        headers: {
          "Content-Type": "application/json", // Spécifie que le contenu est en JSON
        },
      });

      if (!response.ok) {
        throw new Error("Erreur lors du rafraîchissement du token");
      }

      const data = await response.json();
      const newAccessToken = data?.access_token;
      const user = data?.user;

      // console.log("### newAccessToken: " + newAccessToken);
      // console.log("### User: " + user);

      // Mettre à jour les informations d'authentification dans le contexte
      login(user, newAccessToken);
    } catch (error) {
      console.error("Erreur lors du rafraîchissement du token : ", error);
      logout(); // Déconnexion si le rafraîchissement échoue
    }
  };

  useEffect(() => {
    const verifyRefreshToken = async () => {
      if (!authData?.accessToken) {
        try {
          await refreshToken();
        } catch (error) {
          console.error(error);
        }
      }
      setIsLoading(false); // L'opération est terminée (avec succès ou non)
    };

    verifyRefreshToken();
    // }, [authData?.accessToken, login, logout]);
  }, [authData?.accessToken]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
