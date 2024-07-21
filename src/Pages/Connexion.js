import { Button, Form, Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import SvgLogin from "../Assets/svg/sign-in-animate.svg";
import FooterBlock from "../Components/Footer/FooterBlock";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Connexion.css";
import "../Styles/_RESPONSIVES/Connexion-Rsp.css";
import { SERVER_URL } from "../constantURL";

const Connexion = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthenticated, setAuth] = useState(false);
  const [erreur, setErreur] = useState(false);
  const [erreurMsg, setErreurMsg] = useState("");

  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [errorModalVisible, setErrorModalVisible] = useState(false);

  useEffect(() => {
    setEstAuthentifieCallback(isAuthenticated);
  }, [isAuthenticated]);

  const setEstAuthentifieCallback = (newValue) => {
    setAuth(newValue);
  };

  const showModal = (type, message) => {
    if (type === "success") {
      setSuccessModalVisible(true);
    } else if (type === "error") {
      setErreurMsg(message);
      setErrorModalVisible(true);
    }
  };

  const login = async () => {
    try {
      const user = {
        username,
        password,
      };
      const response = await fetch(SERVER_URL + "/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user), // Envoyer les informations de l'utilisateur
      });

      if (!response.ok) {
        setErreur(true);
        const errorData = await response.json();
        //setErreurMsg("Erreur lors de la connexion");
        showModal("error", "Erreur lors de la connexion");
        throw new Error(erreurMsg);
      }
      
      if (response.ok) {
        setAuth(true);
        //const errorData = await response.json();
        //setErreurMsg("Erreur lors de la connexion");
        showModal("success", "Connexion Réussie");
        // throw new Success(erreurMsg);
      }

      const jwtToken = response.headers.get("Authorization");
      if (jwtToken) {
        const userData = await response.json();

        sessionStorage.setItem("jwt", jwtToken);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("user", JSON.stringify(userData.user));

        showModal("success","Connexion Réussie");
        setTimeout(() => {
          window.location.href = "/";
        });
      } else {
        throw new Error("Token JWT non trouvé dans la réponse");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de connexion :", error);
      showModal("error", "Erreur lors de la requête de connexion");
    }
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [emailStatus, setEmailStatus] = useState("");

  const validateEmail = (_, value) => {
    if (!value) {
      setEmailStatus("error");
      return Promise.reject(new Error("Veuillez entrer votre email!"));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailStatus("error");
      return Promise.reject(new Error("Invalide"));
    }
    setEmailStatus("success");
    return Promise.resolve();
  };

  if (isAuthenticated) {
    window.location.href = "/";
  } else {
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
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              {erreur && <h2 className="erreur-login">{erreurMsg}</h2>}
              <p className="form-title">Welcome to L2i !</p>
              <p>
                Ravie de vous revoir, <br />
                Connectez-vous à votre compte !
              </p>

              <Form.Item
                name="username"
                validateStatus={emailStatus}
                onChange={(e) => setUsername(e.target.value)}
                hasFeedback
                rules={[
                  {
                    validator: validateEmail,
                  },
                ]}
              >
                <Input placeholder="Email@zig.univ.sn" />
              </Form.Item>

              <Form.Item
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                rules={[
                  { required: true, message: "Please input your password!" },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  className="login-form-button"
                  onClick={login}
                >
                  Se Connecter →
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
        <FooterBlock />

        
      </div>
    );
  }
};

export default Connexion;
