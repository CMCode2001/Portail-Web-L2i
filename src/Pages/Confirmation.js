import { Button, Form, Input, Result, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import SvgLogin from "../Assets/svg/sign-in-animate.svg";
import FooterBlock from "../Components/Footer/FooterBlock";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Connexion.css";
import "../Styles/_RESPONSIVES/Connexion-Rsp.css";
import { SERVER_URL } from "../constantURL";

const Confirmation = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { idtoken } = useParams();

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

  const login = async (u, p) => {
    try {
      const user = {
        username: u,
        password: p,
      };

      /*  */

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

        showModal("success", "Connexion Réussie");
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

  /*  */

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
  const [status, setStatus] = useState("pending");

  const [hasFetched, setHasFetched] = useState(false); // State flag to prevent double fetch

  const loginWithToken = async () => {
    if (hasFetched) return; // Prevent fetching if already fetched
    const token = idtoken;
    console.log(token);

    if (token) {
      let aTermine = "";
      while (aTermine === "") {
        try {
          const response = await fetch(`${SERVER_URL}/confirm?token=${token}`, {
            method: "GET",
          });

          if (response.ok) {
            const rep = await response.json();
            setUsername(rep.email);
            setPassword(rep.password);

            if (username) {
              console.log(username);
              console.log(password);
            }
            console.log(rep.email);
            if (rep.email !== "") {
              login(rep.email, rep.password);
            }

            aTermine = "s";
            setStatus("success");
            setHasFetched(true); // Set the flag to true after fetching
          } else {
            setStatus("error");
          }
        } catch (error) {
          console.error("Error during email confirmation:", error);
          setStatus("error");
        }
      }
    }
  };
  useEffect(() => {
    loginWithToken();
  }, [username]);

  if (status === "pending") {
    return <Spin tip="Confirming your email..." />;
  }
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

              {status === "success" && (
                <div>
                  <p className="text-center">
                    <b>Inscription confirmée avec succès</b>{" "}
                  </p>
                  <p className="form-title">
                    Votre compte est maintenant activé!
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
                      {
                        required: true,
                        message: "Please input your password!",
                      },
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
                </div>
              )}
              {status === "error" && (
                <Result
                  status="error"
                  title="Échec de la confirmation de l'e-mail"
                  subTitle="Le lien de confirmation est invalide ou a expiré."
                  extra={[
                    <Button type="primary" key="home" href="/inscription">
                      Retour à l'inscription
                    </Button>,
                  ]}
                />
              )}
              <p>
                Ravie de vous revoir, <br />
                Connectez-vous à votre compte !
              </p>
            </Form>
          </div>
        </div>
        <FooterBlock />
      </div>
    );
  }
};

export default Confirmation;
