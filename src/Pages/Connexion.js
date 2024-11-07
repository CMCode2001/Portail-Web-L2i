import { Button, Form, Input, notification } from "antd";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SvgLogin from "../Assets/svg/sign-in-animate.svg";
import FooterBlock from "../Components/Footer/FooterBlock";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Connexion.css";
import "../Styles/_RESPONSIVES/Connexion-Rsp.css";
import { useAuth } from "../Utils/AuthContext";
import { useApi } from "../Utils/Api";
import Fade from "react-reveal/Fade";


const Connexion = () => {
  const api = useApi(); // Obtient l'instance configurée
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [messageReponse, setMessageReponse] = useState("");
  const { login } = useAuth(); // Utiliser la fonction login du contexte
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const openErreurNotification = (message) => {
    notification.error({
      message: "Echec de la connexion",
      description: message,
      placement: "top",
    });
  };

  const handleLogin = async () => {
    try {
      const response = await api.post(
        "/login",
        { username, password },
        {
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        const { user, access_token } = response.data;

        if (user.active) {
          login(user, access_token); // Stocker les données dans le contexte
          notification.success({
            message: "Connexion réussie",
            description: `Bienvenue, ${user.firstName} ${user.lastName}!`,
            placement: "top",
          });
          // navigate("/"); // Redirection vers la page d'accueil
          navigate(from, { replace: true });
        } else {
          setMessageReponse("Veuillez activer votre compte via votre email.");
          openErreurNotification(messageReponse);
        }
      } else {
        setMessageReponse("Erreur lors de la connexion.");
        openErreurNotification(messageReponse);
      }
    } catch (error) {
      // openErreurNotification("Erreur lors de la requête.");
      const errorMessage =
        error.response?.data?.message || "Erreur lors de la requête.";
      openErreurNotification(errorMessage);
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

  return (
    <div className="connexion">
      <HeaderBlock />
      <div className="login-page-connexion">
        <Fade right>
        <div className="login-box">
          <div className="illustration-wrapper">
            <img src={SvgLogin} alt="Login" id="SvgRsp" />
          </div>
          <Form
            name="login-form"
            initialValues={{ remember: true }}
            onFinish={handleLogin}
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
             
             <Link to="/password/forget" id="MdpForget">
             Mot de passe oublié ?
             </Link>
           
         </Form.Item>        
          </Form>
        </div>
        </Fade>
      </div>
      
      <br/>
      <br/>
      <FooterBlock />
    </div>
  );
};

export default Connexion;
