// import React from "react";
// import { Link } from "react-router-dom";
// import "../Styles/ActivationMessage.css";

// const ActivationMessage = () => {
//   return (
//     <div className="activation-message">
//       <h1>Merci pour votre inscription !</h1>
//       <p>
//         Un email vous a été envoyé pour activer votre compte. Veuillez vérifier
//         votre boîte de réception et suivre le lien pour activer votre compte.
//       </p>
//       <p>
//         Si vous ne recevez pas l'email, veuillez vérifier votre dossier spam ou{" "}
//         <Link to="/resend-activation">réenvoyer l'email d'activation</Link>.
//       </p>
//       <Link to="/connexion">
//         <button className="back-to-login">Retour à la page de connexion</button>
//       </Link>
//     </div>
//   );
// };

// export default ActivationMessage;

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { notification } from "antd";
// import "../Styles/ActivationMessage.css";
// import { SERVER_URL } from "../Utils/constantURL";

// const ActivationMessage = () => {
//   const navigate = useNavigate();
//   const [verificationCode, setVerificationCode] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [email, setEmail] = useState("");

//   // Récupérer l'email de l'utilisateur depuis le local storage
//   useEffect(() => {
//     const user = JSON.parse(sessionStorage.getItem("user"));

//     if (user && user.email) {
//       setEmail(user.email);
//     } else {
//       notification.error({
//         message: "Erreur",
//         description: "L'email de l'utilisateur n'a pas pu être récupéré.",
//       });
//     }
//   }, []);

//   const handleCodeSubmit = () => {
//     if (!email) return;
//     setLoading(true);
//     fetch(SERVER_URL + "/confirm", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email, verificationCode }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setLoading(false);
//         if (data.success) {
//           notification.success({
//             message: "Activation réussie",
//             description: "Votre compte a été activé avec succès.",
//           });
//           navigate("/connexion");
//         } else {
//           notification.error({
//             message: "Erreur d'activation",
//             description:
//               data.message || "Le code de vérification est incorrect.",
//           });
//         }
//       })
//       .catch(() => {
//         setLoading(false);
//         notification.error({
//           message: "Erreur",
//           description: "Une erreur s'est produite lors de la vérification.",
//         });
//       });
//   };

//   const handleResendEmail = () => {
//     if (!email) return;
//     fetch(SERVER_URL + "/reSendConfirmation", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ email }),
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data.success) {
//           notification.success({
//             message: "Email envoyé",
//             description: "Un nouvel email de confirmation a été envoyé.",
//           });
//         } else {
//           notification.error({
//             message: "Erreur",
//             description: data.message || "Impossible de renvoyer l'email.",
//           });
//         }
//       })
//       .catch(() => {
//         notification.error({
//           message: "Erreur",
//           description: "Une erreur s'est produite lors de l'envoi de l'email.",
//         });
//       });
//   };

//   return (
//     <div className="activation-message">
//       <h1>Merci pour votre inscription !</h1>
//       <p>
//         Un code de vérification a été envoyé à <strong>{email}</strong>.
//         Veuillez entrer ce code ci-dessous.
//       </p>
//       <input
//         type="text"
//         className="input-field"
//         placeholder="Entrez le code de vérification"
//         value={verificationCode}
//         onChange={(e) => setVerificationCode(e.target.value)}
//       />
//       <button
//         className="submit-code"
//         onClick={handleCodeSubmit}
//         disabled={loading || !verificationCode}
//       >
//         {loading ? "Vérification en cours..." : "Valider le code"}
//       </button>
//       <p>
//         Si vous n'avez pas reçu l'email, vous pouvez{" "}
//         <button onClick={handleResendEmail} disabled={loading}>
//           renvoyer l'email de confirmation
//         </button>
//         .
//       </p>
//       <button className="back-to-login" onClick={() => navigate("/connexion")}>
//         Retour à la page de connexion
//       </button>
//     </div>
//   );
// };

// export default ActivationMessage;

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import "../Styles/ActivationMessage.css";
import { SERVER_URL } from "../Utils/constantURL";

const ActivationMessage = () => {
  const navigate = useNavigate();
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [isActivated, setIsActivated] = useState(false); // État pour suivre si le compte est activé

  // Récupérer l'email de l'utilisateur depuis la session
  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));

    if (user && user.email) {
      setEmail(user.email);
    } else {
      notification.error({
        message: "Erreur",
        description: "L'email de l'utilisateur n'a pas pu être récupéré.",
      });
    }
  }, []);

  const handleCodeSubmit = () => {
    if (!email) return;
    setLoading(true);
    fetch(SERVER_URL + "/confirm", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, verificationCode }),
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text(); // Adjust to expect a plain text response
      })
      .then((message) => {
        setLoading(false);
        setIsActivated(true); // Définir l'état comme activé
        notification.success({
          message: "Activation réussie",
          description: message, // Show success message returned from the server
        });
        navigate("/connexion");
      })
      .catch((error) => {
        setLoading(false);
        notification.error({
          message: "Erreur d'activation",
          description:
            error.message || "Une erreur s'est produite lors de l'activation.",
        });
      });
  };

  const handleResendEmail = () => {
    if (!email) return;
    fetch(SERVER_URL + "/reSendConfirmation", {
      method: "POST",
      headers: { "Content-Type": "text/plain" }, // Set content type to text/plain
      body: email, // Send the email directly as plain text
    })
      .then((response) => {
        if (!response.ok) {
          return response.text().then((text) => {
            throw new Error(text);
          });
        }
        return response.text(); // Expecting a plain text response
      })
      .then((message) => {
        notification.success({
          message: "Email envoyé",
          description: message, // Show success message returned from the server
        });
      })
      .catch((error) => {
        notification.error({
          message: "Erreur",
          description:
            error.message ||
            "Une erreur s'est produite lors de l'envoi de l'email.",
        });
      });
  };

  // const handleCodeSubmit = () => {
  //   if (!email) return;
  //   setLoading(true);
  //   fetch(SERVER_URL + "/confirm", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email, verificationCode }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setLoading(false);
  //       if (data.success) {
  //         setIsActivated(true); // Définir l'état comme activé
  //         notification.success({
  //           message: "Activation réussie",
  //           description: "Votre compte a été activé avec succès.",
  //         });
  //         // Rediriger vers la page de connexion après un délai
  //         setTimeout(() => {
  //           navigate("/connexion");
  //         }, 2000); // Délai de 2 secondes avant la redirection
  //       } else {
  //         notification.error({
  //           message: "Erreur d'activation",
  //           description:
  //             data.message || "Le code de vérification est incorrect.",
  //         });
  //       }
  //     })
  //     .catch(() => {
  //       setLoading(false);
  //       notification.error({
  //         message: "Erreur",
  //         description: "Une erreur s'est produite lors de la vérification.",
  //       });
  //     });
  // };

  // const handleResendEmail = () => {
  //   if (!email) return;
  //   fetch(SERVER_URL + "/reSendConfirmation", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ email }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         notification.success({
  //           message: "Email envoyé",
  //           description: "Un nouvel email de confirmation a été envoyé.",
  //         });
  //       } else {
  //         notification.error({
  //           message: "Erreur",
  //           description: data.message || "Impossible de renvoyer l'email.",
  //         });
  //       }
  //     })
  //     .catch(() => {
  //       notification.error({
  //         message: "Erreur",
  //         description: "Une erreur s'est produite lors de l'envoi de l'email.",
  //       });
  //     });
  // };

  return (
    <div className="activation-message">
      <h1>Merci pour votre inscription !</h1>
      <p>
        Un code de vérification a été envoyé à <strong>{email}</strong>.
        Veuillez entrer ce code ci-dessous.
      </p>
      <input
        type="text"
        className="input-field"
        placeholder="Entrez le code de vérification"
        value={verificationCode}
        onChange={(e) => setVerificationCode(e.target.value)}
      />
      <button
        className="submit-code"
        onClick={handleCodeSubmit}
        disabled={loading || !verificationCode}
      >
        {loading ? "Vérification en cours..." : "Valider le code"}
      </button>
      <p>
        Si vous n'avez pas reçu l'email, vous pouvez{" "}
        <button onClick={handleResendEmail} disabled={loading}>
          renvoyer l'email de confirmation
        </button>
        .
      </p>
      <button className="back-to-login" onClick={() => navigate("/connexion")}>
        Retour à la page de connexion
      </button>
      {isActivated && (
        <p className="success-message">
          Votre compte a été activé avec succès ! Vous allez être redirigé vers
          la page de connexion.
        </p>
      )}
    </div>
  );
};

export default ActivationMessage;
