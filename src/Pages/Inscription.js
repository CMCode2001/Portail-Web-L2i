import { Button, Form, Input, Select, Spin, notification } from "antd";
import React, { useState } from "react";
import SvgRegister from "../Assets/svg/sign-up-animate.svg";
import FooterBlock from "../Components/Footer/FooterBlock";
import HeaderBlock from "../Components/Header/HeaderBlock";
import "../Styles/Inscription.css";
import "../Styles/_RESPONSIVES/Inscription-Rsp.css";
import { SERVER_URL } from "../Utils/constantURL";

// const Inscription = () => {
//   /* Déclaration des variables */
//   const [firstName, setPrenom] = useState("");
//   const [lastName, setlastName] = useState("");
//   const [email, setMail] = useState("");
//   const [password, setPassword] = useState("");
//   const [passwordConfirm, setPasswordConfim] = useState("");
//   const [niveau, setNiveau] = useState("3");
//   const [emailStatus, setEmailStatus] = useState("");
//   const [passwordStatus, setPasswordStatus] = useState("");
//   const [messageReponse, setMessageReponse] = useState({
//     erreur: false,
//     message: "",
//   });
//   const openMessageReponse = () => {
//     if (!messageReponse.erreur && messageReponse.message)
//       notification.success({
//         message: "Inscription Réussie, Procedez a l'activation",
//         description: messageReponse.message,
//         placement: "top",
//       });
//     else
//       notification.error({
//         message: "Inscription Non Réussie",
//         description: messageReponse.message || "Erreur, Veuillez reessayer",
//         placement: "top",
//       });
//   };

//   const openErrorNotification = () => {
//     notification.error({
//       message: "Erreur : Incohérence des mots de passe",
//       description:
//         "Les mots de passe ne correspondent pas. Veuillez vérifier et réessayer.",
//       placement: "top",
//     });
//   };

//   const [loading, setLoading] = useState(false);
//   const [isDesabled, setDisable] = useState(false);

//   const sinscrire = () => {
//     if (password === passwordConfirm) {
//       setLoading(true); // Démarrer le chargement
//       const user = {
//         specialityStudent: null,
//         classeroom_id: parseInt(niveau),
//         firstName,
//         lastName,
//         password,
//         email,
//         ine: null,
//       };

//       fetch(SERVER_URL + "/register/student", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(user), // Envoyer les informations de l'utilisateur
//       })
//         .then((response) => {
//           response.json().then((data) => {
//             const isError = !response.ok;
//             const errorMessage = isError
//               ? data.message || "Erreur lors de l'inscription."
//               : data.message || "Inscription réussie avec succès.";

//             setMessageReponse({
//               erreur: isError,
//               message: errorMessage,
//             });

//             if (!isError) {
//               // Stocker l'utilisateur dans sessionStorage
//               sessionStorage.setItem("user", JSON.stringify(data.user));

//               // Si l'inscription est réussie, afficher une notification de succès
//               notification.success({
//                 message: "Inscription Réussie",
//                 description: "Redirection dans 3 secondes...",
//                 placement: "top",
//               });

//               setDisable(true);

//               // Redirige vers la page de notification d'activation après 3 secondes
//               setTimeout(() => {
//                 window.location.href = "/activation-message";
//               }, 3000); // Délai de 3 secondes
//             } else {
//               openMessageReponse();
//             }

//             setLoading(false); // Arrêter le chargement
//           });
//         })
//         .catch((error) => {
//           setMessageReponse({
//             erreur: true,
//             message: "Erreur inattendue lors de l'inscription.",
//           });
//           console.error("Erreur lors de la requête:", error);
//           openMessageReponse();
//           setLoading(false); // Arrêter le chargement
//         });
//     } else {
//       openErrorNotification(); // Notification d'erreur pour les mots de passe
//     }
//   };

//   const handleChangeNiveau = (value) => {
//     setNiveau(value);
//   };

//   const onFinish = (values) => {
//     console.log("Success:", values);
//   };

//   const onFinishFailed = (errorInfo) => {
//     console.log("Failed:", errorInfo);
//   };

//   const validateEmail = (_, value) => {
//     if (!value) {
//       setEmailStatus("error");
//       return Promise.reject(new Error("Veuillez entrer votre email!"));
//     }
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
//       setEmailStatus("error");
//       return Promise.reject(new Error("Invalide"));
//     }
//     setEmailStatus("success");
//     return Promise.resolve();
//   };

//   const validatePassword = (_, value) => {
//     if (!value) {
//       setPasswordStatus("error");
//       return Promise.reject(new Error("Veuillez entrer votre mot de passe!"));
//     }
//     // Vérification de la complexité du mot de passe
//     if (
//       !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
//         value
//       )
//     ) {
//       setPasswordStatus("error");
//       return Promise.reject(
//         new Error(
//           "Le mot de passe doit comporter au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial !"
//         )
//       );
//     }
//     setPasswordStatus("success");
//     return Promise.resolve();
//   };

//   return (
//     <>
//       <HeaderBlock />
//       <div className="login-page-inscription">
//         <div className="login-box">
//           <div className="illustration-wrapper">
//             <img src={SvgRegister} alt="Register" id="SvgRsp" />
//           </div>

//           {messageReponse.message !== "" && (
//             <h2 className="erreur-login">{messageReponse.message}</h2>
//           )}
//           <Form
//             name="register-form"
//             initialValues={{ remember: true }}
//             onFinish={onFinish}
//             onFinishFailed={onFinishFailed}
//           >
//             <p className="form-title">Welcome to L2i</p>
//             <p>Créer un nouveau compte</p>
//             <Form.Item
//               name="prenom"
//               onChange={(e) => setPrenom(e.target.value)}
//               rules={[
//                 { required: true, message: "Veuillez entrer votre prénom !" },
//               ]}
//             >
//               <Input placeholder="Prénom" />
//             </Form.Item>

//             <Form.Item
//               name="nom"
//               onChange={(e) => setlastName(e.target.value)}
//               rules={[
//                 { required: true, message: "Veuillez entrer votre nom !" },
//               ]}
//             >
//               <Input placeholder="Nom" />
//             </Form.Item>
//             {/* Je force le user à utiliser son mail professionnel */}
//             <Form.Item
//               name="email"
//               onChange={(e) => setMail(e.target.value)}
//               validateStatus={emailStatus}
//               hasFeedback
//               rules={[
//                 {
//                   validator: validateEmail,
//                 },
//               ]}
//             >
//               <Input placeholder="Email@zig.univ.sn" />
//             </Form.Item>

//             <Form.Item
//               name="password"
//               onChange={(e) => setPassword(e.target.value)}
//               validateStatus={passwordStatus}
//               hasFeedback
//               rules={[
//                 {
//                   required: true,
//                   validator: validatePassword,
//                 },
//               ]}
//             >
//               <Input.Password placeholder="Mot de passe sécurisé" />
//             </Form.Item>

//             <Form.Item
//               name="confirm"
//               dependencies={["password"]}
//               onChange={(e) => setPasswordConfim(e.target.value)}
//               hasFeedback
//               rules={[
//                 {
//                   required: true,
//                   message: "Veuillez confirmer votre mot de passe !",
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (!value || getFieldValue("password") === value) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error("Les mots de passe ne sont pas identiques !")
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password placeholder="Confirmer Mot de passe" />
//             </Form.Item>
//             <Form.Item name="niveau" initialValue={niveau}>
//               <Select onChange={handleChangeNiveau}>
//                 <Select.Option value="" disabled>
//                   Sélectionnez votre niveau
//                 </Select.Option>
//                 <Select.Option value="1">Licence 1</Select.Option>
//                 <Select.Option value="2">Licence 2</Select.Option>
//                 <Select.Option value="3">Licence 3</Select.Option>
//                 <Select.Option value="M1" disabled>
//                   Master 1
//                 </Select.Option>
//                 <Select.Option value="M2" disabled>
//                   Master 2
//                 </Select.Option>
//               </Select>
//             </Form.Item>

//             <Form.Item>
//               <Spin spinning={loading}>
//                 {loading ? (
//                   <div>
//                     <h1>
//                       <p>Traitement de l'inscription...</p>
//                     </h1>
//                   </div>
//                 ) : (
//                   <Button
//                     type="primary"
//                     htmlType="submit"
//                     className="login-form-button"
//                     disabled={isDesabled}
//                     onClick={sinscrire}
//                   >
//                     S'inscrire →
//                   </Button>
//                 )}
//               </Spin>
//             </Form.Item>
//           </Form>
//         </div>
//       </div>
//       <FooterBlock />
//     </>
//   );
// };

// export default Inscription;

const Inscription = () => {
  const [niveau, setNiveau] = useState("0");
  const [emailStatus, setEmailStatus] = useState("");
  const [passwordStatus, setPasswordStatus] = useState("");
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

  const [loading, setLoading] = useState(false);
  const [isDesabled, setDisable] = useState(false);

  // const sinscrire = (values) => {
  //   if (values.password === values.confirm) {
  //     setLoading(true); // Démarrer le chargement
  //     const user = {
  //       specialityStudent: null,
  //       classeroom_id: parseInt(values.niveau),
  //       firstName: values.prenom,
  //       lastName: values.nom,
  //       password: values.password,
  //       email: values.email,
  //       ine: null,
  //     };

  //     fetch(SERVER_URL + "/register/student", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(user), // Envoyer les informations de l'utilisateur
  //     })
  //       .then((response) => {
  //         response.json().then((data) => {
  //           const isError = !response.ok;
  //           const errorMessage = isError
  //             ? data.message || "Erreur lors de l'inscription."
  //             : data.message || "Inscription réussie avec succès.";

  //           setMessageReponse({
  //             erreur: isError,
  //             message: errorMessage,
  //           });

  //           if (!isError) {
  //             // Stocker l'utilisateur dans sessionStorage
  //             sessionStorage.setItem("user", JSON.stringify(data.user));

  //             // Si l'inscription est réussie, afficher une notification de succès
  //             notification.success({
  //               message: "Inscription Réussie",
  //               description: "Redirection dans 3 secondes...",
  //               placement: "top",
  //             });

  //             setDisable(true);

  //             // Redirige vers la page de notification d'activation après 3 secondes
  //             setTimeout(() => {
  //               window.location.href = "/activation-message";
  //             }, 3000); // Délai de 3 secondes
  //           } else {
  //             openMessageReponse();
  //           }

  //           setLoading(false); // Arrêter le chargement
  //         });
  //       })
  //       .catch((error) => {
  //         setMessageReponse({
  //           erreur: true,
  //           message: "Erreur inattendue lors de l'inscription.",
  //         });
  //         console.error("Erreur lors de la requête:", error);
  //         openMessageReponse();
  //         setLoading(false); // Arrêter le chargement
  //       });
  //   } else {
  //     openErrorNotification(); // Notification d'erreur pour les mots de passe
  //   }
  // };

  const sinscrire = (values) => {
    if (values.password === values.confirm) {
      setLoading(true); // Démarrer le chargement
      const user = {
        specialityStudent: null,
        classeroom_id: parseInt(values.niveau),
        firstName: values.prenom,
        lastName: values.nom,
        password: values.password,
        email: values.email,
        ine: null,
      };

      fetch(SERVER_URL + "/register/student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user), // Envoyer les informations de l'utilisateur
      })
        .then((response) => {
          if (!response.ok) {
            // Gérer les erreurs spécifiques
            return response.json().then((data) => {
              const errorMessage =
                data.message || "Erreur lors de l'inscription.";

              // Si l'email est déjà utilisé, afficher un message spécifique
              if (response.status === 409) {
                setMessageReponse({
                  erreur: true,
                  message:
                    "L'email est déjà utilisé. Veuillez en utiliser un autre.",
                });
              } else {
                setMessageReponse({
                  erreur: true,
                  message: errorMessage,
                });
              }
              openMessageReponse();
              setLoading(false); // Arrêter le chargement
            });
          }

          return response.json().then((data) => {
            // Traiter la réponse en cas de succès
            setMessageReponse({
              erreur: false,
              message: data.message || "Inscription réussie avec succès.",
            });

            // Stocker l'utilisateur dans sessionStorage
            sessionStorage.setItem("user", JSON.stringify(data.user));

            // Si l'inscription est réussie, afficher une notification de succès
            notification.success({
              message: "Inscription Réussie",
              description: "Redirection dans 3 secondes...",
              placement: "top",
            });

            setDisable(true);

            // Rediriger vers la page de notification d'activation après 3 secondes
            setTimeout(() => {
              window.location.href = "/activation-message";
            }, 3000); // Délai de 3 secondes

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
        <div className="login-box">
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
      </div>
      <FooterBlock />
    </>
  );
};

export default Inscription;
