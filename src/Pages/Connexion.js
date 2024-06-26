import { Button, Form, Input } from "antd";
import { React, useEffect, useState } from "react";
import SvgLogin from "../Assets/svg/sign-in-animate.svg";
import FooterBlock from "../Components/Footer/FooterBlock";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Connexion.css";
import { SERVER_URL } from "../constantURL";
// import React, { useEffect, useState } from "react";
// import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Connexion.css";
const Connexion = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [isAuthenticated, setAuth] = useState(false);
  const [open, setOpen] = useState(false);
  // Lorsque isAuthenticated change, appelez la fonction de rappel
  useEffect(() => {
    setEstAuthentifieCallback(isAuthenticated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  // Fonction de rappel pour mettre à jour estAuthentifie dans le composant parent
  const setEstAuthentifieCallback = (newValue) => {
    setAuth(newValue);
    // Mettez à jour estAuthentifie dans le composant parent
    // setEstAuthentifie(newValue);
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
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la connexion");
      }

      const jwtToken = response.headers.get("Authorization");
      if (jwtToken) {
        // Récupérer le corps de la réponse pour obtenir l'objet user
        const userData = await response.json();

        // Stocker le token JWT et les détails de l'utilisateur
        sessionStorage.setItem("jwt", jwtToken);
        sessionStorage.setItem("isLoggedIn", true);
        sessionStorage.setItem("user", JSON.stringify(userData.user)); // Stocker l'objet utilisateur sous forme de chaîne JSON

        // Mettre à jour l'état d'authentification
        setAuth(true);
      } else {
        throw new Error("Token JWT non trouvé dans la réponse");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de connexion :", error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  };

  /* ********************* */

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  /**VALIDITE EMAIL */
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
    // if (!value.endsWith('@zig.univ.sn')) {
    //   setEmailStatus('error');
    //   return Promise.reject(new Error('Veuillez entrer une adresse email professionnelle se terminant par @zig.univ.sn !'));
    // }
    setEmailStatus("success");
    return Promise.resolve();
  };
  if (isAuthenticated) {
    window.location.href = "/"; // Vous pouvez utiliser React Router pour la navigation
  } else
    return (
      <>
        <HeaderBlock />
        <div className="login-page">
          <div className="login-box">
            <div className="illustration-wrapper">
              <img src={SvgLogin} alt="Login" width={800} height={800} />
            </div>
            <Form
              name="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <p className="form-title">Welcome to L2i</p>
              <p>
                {" "}
                Ravie de vous revoir, <br />
                Connectez-vous à votre compte !
              </p>

              {/* Je force le user à utiliser son mail professionnel */}
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
                  // htmlType="submit"
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
      </>
    );
};

export default Connexion;
