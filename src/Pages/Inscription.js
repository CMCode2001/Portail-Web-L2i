import { Button, Form, Input, Select, notification } from "antd";
import React, { useState } from "react";
import SvgRegister from "../Assets/svg/sign-up-animate.svg";
import FooterBlock from "../Components/Footer/FooterBlock";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Inscription.css";
import "../Styles/_RESPONSIVES/Inscription-Rsp.css";
import { SERVER_URL } from "../Utils/constantURL";

const Inscription = () => {
  /* Déclaration des variables */
  const [firstName, setPrenom] = useState("");
  const [name, setNom] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [niveau, setNiveau] = useState("");
  const [emailStatus, setEmailStatus] = useState("");

  const openSuccessNotification = () => {
    notification.success({
      message: "Inscription Réussie",
      description: "Votre inscription a été réalisée avec succès!",
      placement: "top",
    });
  };

  const login = async () => {
    try {
      const user = {
        username: email,
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

        // Afficher la notification de succès avant de rediriger
        openSuccessNotification();
        setTimeout(() => {
          window.location.href = "/"; // Redirection après 3 secondes
        }, 500);
      } else {
        throw new Error("Token JWT non trouvé dans la réponse");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de connexion :", error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  };

  const sinscrire = async () => {
    try {
      const user = {
        firstName,
        name,
        email,
        password,
        classeroom_id: parseInt(niveau),
      };

      console.log("***********8Debut des Donnees aenvoyer");
      console.log(user);
      const response = await fetch(SERVER_URL + "/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user), // Envoyer les informations de l'utilisateur
      });

      if (response.ok) {
        login();
      }
    } catch (error) {
      console.error("Erreur lors de la requête de connexion :", error);
      // Afficher un message d'erreur à l'utilisateur si nécessaire
    }
  };

  const handleChangeNiveau = (value) => {
    setNiveau(value);
  };

  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

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

  return (
    <>
      <HeaderBlock />
      <div className="login-page-inscription">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img src={SvgRegister} alt="Register" id="SvgRsp" />
          </div>
          <Form
            name="register-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <p className="form-title">Welcome to L2i</p>
            <p>Créer un nouveau compte</p>
            <Form.Item
              name="prenom"
              onChange={(e) => setPrenom(e.target.value)}
              rules={[
                { required: true, message: "Veuillez entrer votre prénom !" },
              ]}
            >
              <Input placeholder="Prénom" />
            </Form.Item>

            <Form.Item
              name="nom"
              onChange={(e) => setNom(e.target.value)}
              rules={[
                { required: true, message: "Veuillez entrer votre nom !" },
              ]}
            >
              <Input placeholder="Nom" />
            </Form.Item>
            {/* Je force le user à utiliser son mail professionnel */}
            <Form.Item
              name="email"
              onChange={(e) => setMail(e.target.value)}
              validateStatus={emailStatus}
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
                  message: "Veuillez entrer votre mot de passe !",
                },
              ]}
            >
              <Input.Password placeholder="Mot de passe" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              hasFeedback
              rules={[
                {
                  required: true,
                  message: "Veuillez confirmer votre mot de passe !",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("Les mots de passe ne sont pas identiques !")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirmer Mot de passe" />
            </Form.Item>
            <Form.Item name="niveau" initialValue={niveau}>
              <Select onChange={handleChangeNiveau}>
                <Select.Option value="" disabled>
                  Sélectionnez votre niveau
                </Select.Option>
                <Select.Option value="1">Licence 1</Select.Option>
                <Select.Option value="2">Licence 2</Select.Option>
                <Select.Option value="3">Licence 3</Select.Option>
                <Select.Option value="M1" disabled>
                  Master 1
                </Select.Option>
                <Select.Option value="M2" disabled>
                  Master 2
                </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={sinscrire}
              >
                S'inscrire →
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <FooterBlock />
    </>
  );
};

export default Inscription;
