// import axios from "axios";
// import { SERVER_URL } from "./constantURL";

// // Créer une instance d'axios avec des intercepteurs pour gérer l'expiration du token
// const api = axios.create({
//   baseURL: SERVER_URL,
//   headers: { "Content-Type": "application/json" },
// });

// // Intercepteur de requête pour ajouter l'access_token
// api.interceptors.request.use(
//   (config) => {
//     const accessToken = sessionStorage.getItem("access_token");
//     if (accessToken) {
//       config.headers["Authorization"] = `Bearer ${accessToken}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error)
// );

// // Intercepteur de réponse pour vérifier si l'access_token a expiré
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       // Tenter de rafraîchir le token avec le refresh_token dans le cookie HttpOnly
//       try {
//         const refreshResponse = await axios.post(
//           `${SERVER_URL}/refresh-token`,
//           {},
//           { withCredentials: true } // Obligatoire pour envoyer le cookie HttpOnly
//         );

//         const newAccessToken = refreshResponse.data.access_token;
//         sessionStorage.setItem("access_token", newAccessToken);

//         // Réessayer la requête originale avec le nouveau token
//         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
//         return axios(originalRequest);
//       } catch (err) {
//         // Si la requête échoue, rediriger l'utilisateur vers la page de login
//         sessionStorage.clear();
//         window.location.href = "/connexion";
//       }
//     }
//     return Promise.reject(error);
//   }
// );

// export default api;

import axios from "axios";
import { SERVER_URL } from "./constantURL";
import { useAuth } from "./AuthContext";

const api = axios.create({
  baseURL: SERVER_URL,
  headers: { "Content-Type": "application/json" },
});

const setupApiInterceptors = (authData, logout) => {
  // Intercepteur de requête pour ajouter l'access_token
  api.interceptors.request.use(
    (config) => {
      if (authData?.accessToken) {
        config.headers["Authorization"] = `Bearer ${authData.accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Intercepteur de réponse pour vérifier si l'access_token a expiré
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const refreshResponse = await axios.post(
            `${SERVER_URL}/refresh-token`,
            {},
            { withCredentials: true }
          );

          const newAccessToken = refreshResponse.data.access_token;
          authData.accessToken = newAccessToken; // Mettre à jour le token dans le contexte
          // const user = refreshResponse.data.user;
          // authData.user = user; // Mettre à jour le user dans le contexte

          // Réessayer la requête originale avec le nouveau token
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axios(originalRequest);
        } catch (err) {
          // En cas d'échec, afficher une alerte et déconnexion
          alert("Votre session a expiré. Veuillez vous reconnecter.");
          logout();
          setTimeout(() => {
            window.location.href = "/connexion";
          }, 1000); // Redirige après 1 seconde
        }
      }
      return Promise.reject(error);
    }
  );
};

export const useApi = () => {
  const { authData, logout } = useAuth();

  // Appliquer les intercepteurs avec les données du contexte
  setupApiInterceptors(authData, logout);

  return api;
};

export default api;
