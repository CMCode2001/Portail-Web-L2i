import React from "react";
import { Link } from "react-router-dom";
import "../Styles/ActivationMessage.css";

const ActivationMessage = () => {
  return (
    <div className="activation-message">
      <h1>Merci pour votre inscription !</h1>
      <p>
        Un email vous a été envoyé pour activer votre compte. Veuillez vérifier
        votre boîte de réception et suivre le lien pour activer votre compte.
      </p>
      <p>
        Si vous ne recevez pas l'email, veuillez vérifier votre dossier spam ou{" "}
        <Link to="/resend-activation">réenvoyer l'email d'activation</Link>.
      </p>
      <Link to="/connexion">
        <button className="back-to-login">Retour à la page de connexion</button>
      </Link>
    </div>
  );
};

export default ActivationMessage;
