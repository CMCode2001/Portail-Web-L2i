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

      // // Pour gerer les doublons
      // if (error.response.status === 409) return;

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

  // // Intercepteur de réponse pour vérifier si l'access_token a expiré
  // api.interceptors.response.use(
  //   (response) => response, // Si la réponse est réussie, on la retourne directement
  //   async (error) => {
  //     const originalRequest = error.config;

  //     // Gestion des doublons : si le statut est 409 (Conflit), on ignore l'erreur
  //     if (error.response && error.response.status === 409) {
  //       console.warn("Duplicate token request detected. Ignoring...");
  //       return Promise.resolve(); // Empêche le passage au bloc catch, retourne une promesse réussie
  //     }

  //     // Si le token a expiré (401) et que ce n'est pas une tentative déjà faite, on tente de rafraîchir
  //     if (
  //       error.response &&
  //       error.response.status === 401 &&
  //       !originalRequest._retry
  //     ) {
  //       originalRequest._retry = true;

  //       try {
  //         const refreshResponse = await axios.post(
  //           `${SERVER_URL}/refresh-token`,
  //           {},
  //           { withCredentials: true }
  //         );

  //         const newAccessToken = refreshResponse.data.access_token;
  //         authData.accessToken = newAccessToken; // Mettre à jour le token dans le contexte

  //         // Réessayer la requête originale avec le nouveau token
  //         originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
  //         return axios(originalRequest); // Relancer la requête originale
  //       } catch (err) {
  //         // En cas d'échec du rafraîchissement du token, déconnecter l'utilisateur
  //         alert("Votre session a expiré. Veuillez vous reconnecter.");
  //         logout();
  //         setTimeout(() => {
  //           window.location.href = "/connexion"; // Redirige vers la page de connexion après 1 seconde
  //         }, 1000);
  //         return Promise.reject(err); // Propager l'erreur après la déconnexion
  //       }
  //     }

  //     // Pour toutes les autres erreurs, propager l'erreur
  //     return Promise.reject(error);
  //   }
  // );
};

export const useApi = () => {
  const { authData, logout } = useAuth();

  // Appliquer les intercepteurs avec les données du contexte
  setupApiInterceptors(authData, logout);

  return api;
};

export default api;
