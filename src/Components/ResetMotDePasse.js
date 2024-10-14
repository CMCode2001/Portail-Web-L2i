import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import "../Styles/ResetMotDePasse.css";
import { SERVER_URL } from "../Utils/constantURL";

const ResetMotDePasse = () => {
  const navigate = useNavigate();
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async () => {
    if (!resetCode || !newPassword || !confirmPassword) {
      notification.error({
        message: "Erreur",
        description: "Tous les champs sont obligatoires.",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      notification.error({
        message: "Erreur de confirmation",
        description: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${SERVER_URL}/password-reset/reset?resetCode=${resetCode}&newPassword=${newPassword}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetCode,
            newPassword,
          }),
        }
      );

      const result = await response.text();

      if (response.status !== 200) {
        throw new Error(result || "Erreur de réinitialisation.");
      }

      notification.success({
        message: "Succès",
        description: "Votre mot de passe a été réinitialisé avec succès.",
      });
      navigate("/connexion");
    } catch (error) {
      notification.error({
        message: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la réinitialisation.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="reset-password">
      <h1>Réinitialiser le mot de passe</h1>
      <p>
        Veuillez entrer le code de réinitialisation reçu par email, puis choisir
        un nouveau mot de passe.
      </p>

      <input
        type="text"
        placeholder="Code de réinitialisation"
        value={resetCode}
        onChange={(e) => setResetCode(e.target.value)}
        className="inputField"
      />
      <input
        type="password"
        placeholder="Nouveau mot de passe"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        className="inputField"
      />
      <input
        type="password"
        placeholder="Confirmer le mot de passe"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="inputField"
      />

      <button
        className="buttonValider"
        onClick={handleResetPassword}
        disabled={loading || !resetCode || !newPassword || !confirmPassword}
      >
        {loading
          ? "Réinitialisation en cours..."
          : "Réinitialiser le mot de passe"}
      </button>
      <br />
      <br />
      <p>
        Je ne dispose pas de compte ?{" "}
        <Link to="/inscription" id="OuvrirCompte">
          Ouvrir un compte
        </Link>
      </p>
    </div>
  );
};

export default ResetMotDePasse;
