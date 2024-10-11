import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import OtpInput from "react-otp-input";
import { notification } from "antd";
import "../Styles/ActivationMessage.css";
import { SERVER_URL } from "../Utils/constantURL";
import { ArrowBack, PasswordOutlined, PinOutlined, RefreshOutlined } from "@mui/icons-material";

const ActivationMessage = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isActivated, setIsActivated] = useState(false);

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user && user.email) {
      setEmail(user.email);
    } else {
      notification.error({
        message: "Erreur",
        description: "L'email de l'utilisateur n'a pas pu être récupéré.",
      });
    }
  }, []);

  const handleCodeSubmit = () => {
    if (!email) return;
    setLoading(true);
    fetch(SERVER_URL + "/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, verificationCode }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text();
      })
      .then((message) => {
        setLoading(false);
        setIsActivated(true);
        notification.success({
          message: "Activation réussie",
          description: message,
        });
        navigate("/connexion");
      })
      .catch((error) => {
        setLoading(false);
        notification.error({
          message: "Erreur d'activation",
          description:
            error.message || "Une erreur s'est produite lors de l'activation.",
        });
      });
  };

  const handleResendEmail = () => {
    if (!email) return;
    fetch(SERVER_URL + "/reSendConfirmation", {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: email,
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text();
      })
      .then((message) => {
        notification.success({
          message: "Email envoyé",
          description: message,
        });
      })
      .catch((error) => {
        notification.error({
          message: "Erreur",
          description:
            error.message || "Une erreur s'est produite lors de l'envoi de l'email.",
        });
      });
  };

  return (
    <div className="activation-message">
      <h1>Merci pour votre inscription !</h1>
      <p>
        Un code de vérification a été envoyé à <strong>{email}</strong>.
        <br />
        Veuillez entrer ce code ci-dessous.
      </p>

      <OtpInput
        id="OTP"
        value={verificationCode}
        onChange={setVerificationCode}
        numInputs={6}
        separator={10}
        isInputNum={true}
        shouldAutoFocus={true}
        inputStyle={{
          border: "1px solid transparent",
          borderRadius: "8px",
          width: "54px",
          height: "54px",
          fontSize: "20px",
          color: "#bdbdbd",
          fontWeight: "600",
          caretColor: "blue",
        }}
        focusStyle={{
          border: "1px solid #bdbdbd",
          outline: "none",
        }}
        renderInput={(props) => <input {...props} />}
      />
      <br/>
      <button
        className='buttonValider'
        onClick={handleCodeSubmit}
        disabled={loading || !verificationCode}
      >
        {loading ? "Vérification en cours..." : "Valider le code"} &nbsp;
        {/* <PasswordOutlined/> */}
        <PinOutlined/>
      </button>
        <br/>
      <p>
          Vous n'avez pas reçu le code  ?{" "}
          <br/>
          <Link className="Refresh" onClick={handleResendEmail} disabled={loading}>
          <RefreshOutlined/>
            Renvoyer l'email de confirmation
          </Link>
      </p>

      <Link className="back-to-login" to="/inscription">
        <ArrowBack/>
        Retour à la Page d'inscription
      </Link>

      {isActivated && (
        <p className="success-message">
          Votre compte a été activé avec succès ! Vous allez être redirigé vers la page de connexion.
        </p>
      )}
    </div>
  );
};

export default ActivationMessage;
