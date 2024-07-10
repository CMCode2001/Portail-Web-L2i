import { Button, Form, Input, Select } from "antd";
import { React, useState } from "react";
import SvgRegister from "../Assets/svg/sign-up-animate.svg";
import FooterBlock from "../Components/Footer/FooterBlock";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Inscription.css";
import "../Styles/_RESPONSIVES/Inscription-Responsive.css"
import { SERVER_URL } from "../constantURL";

const Inscription = () => {
  /* Declaration des variables */
  const [firstName, setPrenom] = useState("");
  const [name, setNom] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [niveau, setNiveau] = useState("");
  // Fonction pour récupérer et utiliser les informations de l'utilisateur
  // const getUserInfo = () => {
  //   // Récupérer la chaîne JSON stockée dans sessionStorage
  //   const userJson = sessionStorage.getItem("user");

  //   if (userJson) {
  //     try {
  //       // Convertir la chaîne JSON en un objet JavaScript
  //       const user = JSON.parse(userJson);
  //       // Vous pouvez également retourner ou utiliser ces valeurs dans votre application
  //       return user;
  //     } catch (error) {
  //       console.error(
  //         "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
  //         error
  //       );
  //       // Vous pouvez gérer cette erreur, par exemple, en affichant un message d'erreur à l'utilisateur
  //     }
  //   } else {
  //     console.warn("Aucun utilisateur trouvé dans le sessionStorage");
  //     // Gérer le cas où il n'y a pas d'utilisateur dans le sessionStorage
  //   }
  // };
  // const currentUser = getUserInfo();
  // if (currentUser) {
  //   // Faire quelque chose avec les informations de l'utilisateur
  //   console.log("L'utilisateur actuel est:", currentUser);
  // }
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

        // Mettre à jour l'état d'authentification
        window.location.href = "/"; // Vous pouvez utiliser React Router pour la navigation
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
        // createdBy: `${getUserInfo.firstName} ${getUserInfo.name}`,
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
    // if (!value.endsWith("@zig.univ.sn")) {
    //   setEmailStatus("error");
    //   return Promise.reject(
    //     new Error(
    //       "Veuillez entrer une adresse email professionnelle se terminant par @zig.univ.sn !"
    //     )
    //   );
    // }
    setEmailStatus("success");
    return Promise.resolve();
  };
  return (
    <>
      <HeaderBlock />
      <div className="login-page-inscription">
        <div className="login-box">
          <div className="illustration-wrapper">
            <img src={SvgRegister} alt="Register" id="SvgRsp"/>
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
