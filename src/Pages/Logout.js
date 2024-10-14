import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../Utils/Api";
import { useAuth } from "../Utils/AuthContext";

const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const response = await api.post("/logout");

        if (response.status === 200) {
          console.log("Déconnexion réussie.");
          logout(); // Appeler la fonction de déconnexion du contexte
          navigate("/"); // Rediriger vers la page d'accueil
        } else {
          console.error("Erreur lors de la déconnexion.");
          logout(); // En cas d'échec, on fait quand même le logout
          navigate("/");
        }
      } catch (error) {
        console.error("Erreur lors de la requête de déconnexion:", error);
        logout(); // En cas d'erreur, on fait quand même le logout
        navigate("/");
      }
    };

    handleLogout(); // Appeler la fonction dès que le composant est monté
  }, [logout, navigate]);

  return null; // Ce composant ne rend rien, il gère juste la déconnexion
};

export default Logout;
