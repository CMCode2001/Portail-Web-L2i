import { Button, Form, Input, notification } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // useNavigate pour la redirection
import SvgLogin from "../Assets/svg/sign-in-animate.svg";
import FooterBlock from "../Components/Footer/FooterBlock";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Connexion.css";
import "../Styles/_RESPONSIVES/Connexion-Rsp.css";
import { SERVER_URL } from "../Utils/constantURL";

const Connexion = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageReponse, setMessageReponse] = useState("");
  const [isAuthenticated, setAuth] = useState(false);
  // const [token, setToken] = useState()
  // const [erreurMsg, setErreurMsg] = useState("");
  const navigate = useNavigate(); // Hook pour rediriger après login réussi
  // const jwt = sessionStorage.getItem("access_token");
  // setToken(jwt);
  // Redirection après login si l'utilisateur est authentifié
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirection vers la page d'accueil
    }
  }, [isAuthenticated, navigate]);

  // Notification d'erreur
  const openErreurNotification = (message) => {
    notification.error({
      message: "Echec de la connexion",
      description: message,
      placement: "top",
    });
  };

  // Fonction principale pour le login
  const login = async () => {
    try {
      const user = { username, password };

      const response = await fetch(SERVER_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
        // Authorization:`Bearer ${token}`
      });

      // Si la requête échoue
      if (!response.ok) {
        const errorData = await response.text();
        console.log(response)
        setMessageReponse(errorData || "Erreur lors de la connexion");
        openErreurNotification(messageReponse);
        return;
      }

      // Si la requête réussit
      const data = await response.json(); // Récupération des données utilisateur, access_token et refresh_token

      // Vérification si l'utilisateur est actif
      if (data.user.active) {
        // Stockage des tokens et des informations utilisateur
        sessionStorage.setItem("access_token", data.access_token);
        sessionStorage.setItem("refresh_token", data.refresh_token);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("user", JSON.stringify(data.user));

        // Afficher la notification de succès et rediriger
        notification.success({
          message: "Connexion réussie",
          description: `Bienvenue, ${data.user.firstName} ${data.user.lastName}!`,
          placement: "top",
        });

        setAuth(true); // Marquer comme authentifié
      } else {
        setMessageReponse(
          `Cher ${data.user.firstName} ${data.user.lastName}, veuillez vérifier votre email pour activer votre compte.`
        );
        openErreurNotification(messageReponse);
      }
    } catch (error) {
      console.error("Erreur lors de la requête de connexion:", error);
      openErreurNotification("Erreur lors de la requête de connexion.");
    }
  };

  // Validation de l'email
  const validateEmail = (_, value) => {
    if (!value) {
      return Promise.reject(new Error("Veuillez entrer votre email!"));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return Promise.reject(new Error("Email invalide"));
    }
    return Promise.resolve();
  };

  // Si l'utilisateur est déjà authentifié, redirection automatique
  if (isAuthenticated) {
    return null; // Empêcher le rendu du formulaire si déjà connecté
  }

  return (
    <div className="connexion">
      <HeaderBlock />
      <div className="login-page-connexion">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img src={SvgLogin} alt="Login" id="SvgRsp" />
          </div>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={login} // Utiliser la fonction login directement sur submit
          >
            {messageReponse && (
              <h2 className="erreur-login">{messageReponse}</h2>
            )}
            <p className="form-title">Welcome to L2i !</p>
            <p>
              Ravie de vous revoir, <br /> Connectez-vous à votre compte !
            </p>

            <Form.Item
              name="username"
              validateStatus={messageReponse ? "error" : ""}
              onChange={(e) => setUsername(e.target.value)}
              rules={[{ validator: validateEmail }]}
            >
              <Input
                placeholder="Email@zig.univ.sn"
                style={{ width: "100%", fontSize: "16px", padding: "22px" }}
              />
            </Form.Item>

            <Form.Item
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre mot de passe!",
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="login-form-button"
                htmlType="submit"
              >
                Se Connecter →
              </Button>
            </Form.Item>

            <Form.Item>
              <Link to="/password/reset" id="MdpForget">
                Mot de passe oublié ?
              </Link>
            </Form.Item>
          </Form>
        </div>
      </div>
      <FooterBlock />
    </div>
  );
};

export default Connexion;
