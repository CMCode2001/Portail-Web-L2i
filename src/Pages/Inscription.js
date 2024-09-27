import { Button, Form, Input, Select, Spin, notification } from "antd";
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
  const [lastName, setlastName] = useState("");
  const [email, setMail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfim] = useState("");
  const [niveau, setNiveau] = useState("3");
  const [emailStatus, setEmailStatus] = useState("");
  const [messageReponse, setMessageReponse] = useState({
    erreur: false,
    message: "",
  });
  const openMessageReponse = () => {
    if (!messageReponse.erreur && messageReponse.message)
      notification.success({
        message: "Inscription Réussie, Procedez a l'activation",
        description: messageReponse.message,
        placement: "top",
      });
    else
      notification.error({
        message: "Inscription Non Réussie",
        description: messageReponse.message || "Erreur, Veuillez reessayer",
        placement: "top",
      });
  };

  const openErrorNotification = () => {
    notification.error({
      message: "Erreur : Incohérence des mots de passe",
      description:
        "Les mots de passe ne correspondent pas. Veuillez vérifier et réessayer.",
      placement: "top",
    });
  };

  const [loading, setLoading] = useState(false);
  const [isDesabled, setDisable] = useState(false);

  // const sinscrire = () => {
  //   if (password === passwordConfirm) {
  //     setLoading(true);
  //     const user = {
  //       specialityStudent: null,
  //       classeroom_id: parseInt(niveau),
  //       firstName,
  //       lastName,
  //       password,
  //       email,
  //       ine: null,
  //     };
  //     fetch(SERVER_URL + "/register/student", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(user), // Envoyer les informations de l'utilisateur
  //     })
  //       .then((response) => {
  //         response.text().then((message) => {
  //           const isError = !response.ok;
  //           const errorMessage = isError
  //             ? message || "Erreur lors de l'inscription."
  //             : message || "Inscription réussie avec succès.";

  //           setMessageReponse({
  //             erreur: isError,
  //             message: errorMessage,
  //           });
  //           if (!isError) {
  //             setDisable(true);
  //           }

  //           openMessageReponse();
  //           setLoading(false);

  //           // if (!isError) {
  //           //   // En cas de succès, rediriger vers la page de connexion après 2 minutes
  //           //   setTimeout(() => {
  //           //     window.location.href = "/connexion";
  //           //     // }, 5000);
  //           //   }, 60000);
  //           // }
  //           if (!isError) {
  //             setDisable(true);
  //             openMessageReponse();
  //             setLoading(false);

  //             // Redirige vers la page de notification d'activation
  //             setTimeout(() => {
  //               window.location.href = "/activation-message";
  //             }, 3000); // 3 secondes avant la redirection
  //           }
  //         });
  //       })
  //       .catch((error) => {
  //         setMessageReponse({
  //           erreur: true,
  //           message: error.text || "Erreur inattendue lors de l'inscription.",
  //         });
  //         console.error("Erreur lors de la requête:", error);
  //         openMessageReponse();
  //         setLoading(false);
  //       });
  //   } else {
  //     openErrorNotification();
  //   }
  // };

  const sinscrire = () => {
    if (password === passwordConfirm) {
      setLoading(true); // Démarrer le chargement
      const user = {
        specialityStudent: null,
        classeroom_id: parseInt(niveau),
        firstName,
        lastName,
        password,
        email,
        ine: null,
      };

      fetch(SERVER_URL + "/register/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user), // Envoyer les informations de l'utilisateur
      })
        .then((response) => {
          response.json().then((data) => {
            const isError = !response.ok;
            const errorMessage = isError
              ? data.message || "Erreur lors de l'inscription."
              : data.message || "Inscription réussie avec succès.";

            setMessageReponse({
              erreur: isError,
              message: errorMessage,
            });

            if (!isError) {
              // Stocker l'utilisateur dans sessionStorage
              sessionStorage.setItem("user", JSON.stringify(data.user));

              // Si l'inscription est réussie, afficher une notification de succès
              notification.success({
                message: "Inscription Réussie",
                description: "Redirection dans 3 secondes...",
                placement: "top",
              });

              setDisable(true);

              // Redirige vers la page de notification d'activation après 3 secondes
              setTimeout(() => {
                window.location.href = "/activation-message";
              }, 3000); // Délai de 3 secondes
            } else {
              openMessageReponse();
            }

            setLoading(false); // Arrêter le chargement
          });
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

          {messageReponse.message !== "" && (
            <h2 className="erreur-login">{messageReponse.message}</h2>
          )}
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
              onChange={(e) => setlastName(e.target.value)}
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

            {/* <Form.Item
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
            </Form.Item> */}

            <Form.Item
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              rules={[
                {
                  required: true,
                  message: "Veuillez entrer votre mot de passe !",
                },
                {
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message:
                    "Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial !",
                },
              ]}
            >
              <Input.Password placeholder="Mot de passe sécurisé" />
            </Form.Item>

            <Form.Item
              name="confirm"
              dependencies={["password"]}
              onChange={(e) => setPasswordConfim(e.target.value)}
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
              <Spin spinning={loading}>
                {loading ? (
                  <div>
                    <h1>
                      <p>Traitement de l'inscription...</p>
                    </h1>
                  </div>
                ) : (
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                    disabled={isDesabled}
                    onClick={sinscrire}
                  >
                    S'inscrire →
                  </Button>
                )}
              </Spin>
            </Form.Item>
          </Form>
        </div>
      </div>
      <FooterBlock />
    </>
  );
};

export default Inscription;
