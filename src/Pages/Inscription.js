import { Button, Form, Input, Select, Spin, notification } from "antd";
import React, { useState } from "react";
import SvgRegister from "../Assets/svg/sign-up-animate.svg";
import FooterBlock from "../Components/Footer/FooterBlock";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Inscription.css";
import "../Styles/_RESPONSIVES/Inscription-Rsp.css";
import { SERVER_URL } from "../Utils/constantURL";
import Fade from "react-reveal/Fade";
import { useAuth } from "../Utils/AuthContext";

const Inscription = () => {
  const [niveau, setNiveau] = useState("0");
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
  const [messageReponse, setMessageReponse] = useState({
    erreur: false,
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [isDesabled, setDisable] = useState(false);
  const { setuser } = useAuth();

  const sinscrire = (values) => {
    if (values.password === values.confirm) {
      setLoading(true); // Démarrer le chargement
      const user = {
        specialityStudent: null,
        classroom_id: parseInt(values.niveau),
        firstName: values.prenom,
        lastName: values.nom,
        password: values.password,
        email: values.email,
        ine: null,
      };

      fetch(SERVER_URL + "/register/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              const errorMessage =
                data.message || "Erreur lors de l'inscription.";

              setMessageReponse({
                erreur: true,
                message:
                  response.status === 409
                    ? "L'email est déjà utilisé. Veuillez en utiliser un autre."
                    : errorMessage,
              });
              openMessageReponse();
              setLoading(false); // Arrêter le chargement
            });
          } else {
            return response.json().then((data) => {
              setMessageReponse({
                erreur: false,
                message: data.message || "Inscription réussie avec succès.",
              });
              setuser(JSON.stringify(data?.user));
              sessionStorage.setItem("email", data?.user?.email);

              notification.success({
                message: "Inscription Réussie",
                description: "Redirection dans 3 secondes...",
                placement: "top",
              });

              setDisable(true);

              setTimeout(() => {
                window.location.href = "/activation-message";
              }, 3000); // Délai de 3 secondes

              setLoading(false); // Arrêter le chargement
            });
          }
        })
        .catch((error) => {
          setMessageReponse({
            erreur: true,
            message: "Erreur inattendue lors de l'inscription.",
          });
          console.error("Erreur lors de la requête:", error);
          openMessageReponse();
          setLoading(false); // Arrêter le chargement
        });
    } else {
      openErrorNotification(); // Notification d'erreur pour les mots de passe
    }
  };

  const openMessageReponse = () => {
    if (messageReponse.message) {
      if (!messageReponse.erreur) {
        notification.success({
          message: "Inscription Réussie, Procedez à l'activation",
          description: messageReponse.message,
          placement: "top",
        });
      } else {
        notification.error({
          message: "Inscription Non Réussie",
          description: messageReponse.message,
          placement: "top",
        });
      }
    }
  };

  const openErrorNotification = () => {
    notification.error({
      message: "Erreur : Incohérence des mots de passe",
      description:
        "Les mots de passe ne correspondent pas. Veuillez vérifier et réessayer.",
      placement: "top",
    });
  };

  const validateEmail = (_, value) => {
    if (!value) {
      setEmailStatus("error");
      return Promise.reject(new Error("Veuillez entrer votre email!"));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailStatus("error");
      return Promise.reject(new Error("Email invalide"));
    }
    setEmailStatus("success");
    return Promise.resolve();
  };

  const validatePassword = (_, value) => {
    if (!value) {
      setPasswordStatus("error");
      return Promise.reject(new Error("Veuillez entrer votre mot de passe!"));
    }
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        value
      )
    ) {
      setPasswordStatus("error");
      return Promise.reject(
        new Error(
          "Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial !"
        )
      );
    }
    setPasswordStatus("success");
    return Promise.resolve();
  };

  return (
    <>
      <HeaderBlock />
      <div className="login-page-inscription">
        <Fade left>
          <div className="login-box">
            <div className="illustration-wrapper">
              <img src={SvgRegister} alt="Register" id="SvgRsp" />
            </div>

            {messageReponse.message !== "" && (
              <h2 className="erreur-login">{messageReponse.message}</h2>
            )}
            <Form
              name="register-form"
              initialValues={{ remember: true }}
              onFinish={sinscrire} // Appelle sinscrire uniquement si la validation réussit
              onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
            >
              <p className="form-title">Welcome to L2i</p>
              <p>Créer un nouveau compte</p>

              <Form.Item
                name="prenom"
                rules={[
                  { required: true, message: "Veuillez entrer votre prénom !" },
                ]}
              >
                <Input placeholder="Prénom" />
              </Form.Item>

              <Form.Item
                name="nom"
                rules={[
                  { required: true, message: "Veuillez entrer votre nom !" },
                ]}
              >
                <Input placeholder="Nom" />
              </Form.Item>

              <Form.Item
                name="email"
                validateStatus={emailStatus}
                hasFeedback
                rules={[{ validator: validateEmail }]}
              >
                <Input placeholder="Email@zig.univ.sn" />
              </Form.Item>

              <Form.Item
                name="password"
                validateStatus={passwordStatus}
                hasFeedback
                rules={[{ validator: validatePassword }]}
              >
                <Input.Password placeholder="Mot de passe sécurisé" />
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
                <Select onChange={(value) => setNiveau(value)}>
                  <Select.Option value="0">None</Select.Option>
                  <Select.Option value="1">Licence 1</Select.Option>
                  <Select.Option value="2">Licence 2</Select.Option>
                  <Select.Option value="3">Licence 3</Select.Option>
                </Select>
              </Form.Item>

              <Form.Item>
                <Spin spinning={loading}>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={isDesabled}
                  >
                    S'inscrire →
                  </Button>
                </Spin>
              </Form.Item>
            </Form>
          </div>
        </Fade>
      </div>
      <FooterBlock />
    </>
  );
};

export default Inscription;
