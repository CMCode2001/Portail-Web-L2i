import React, { useState } from "react";
import HeaderBlock from "./Header/HeaderBlock";
import { Button, Form, message } from "antd";
import "../Styles/ForgetMotDePasse.css";
import { Link, useNavigate } from "react-router-dom";
import { Label, MailLock } from "@mui/icons-material";
import { SERVER_URL } from "../Utils/constantURL";

export default function ForgetMotDePasse() {
  const [emailStatus, setEmailStatus] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const navigate = useNavigate(); // Initialise useNavigate pour la redirection

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

  const onFinish = async () => {
    setLoading(true);

    try {
      const response = await fetch(
        `${SERVER_URL}/password-reset/request?email=${email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = await response.text();
      if (response.ok) {
        message.success("Le code de réinitialisation a été envoyé par email.");
        navigate("/password/reset"); // Redirige vers /password/reset après succès
      } else {
        message.error(result);
      }
    } catch (error) {
      message.error("Une erreur est survenue lors de l'envoi du code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <HeaderBlock />
      <div className="container text-center mt-4">
        <Button id="mdpoublie">
          <Label /> MOT DE PASSE OUBLIÉ
        </Button>
        <br />
        <br />
        <h1 className="text12">Réinitialisation du mot de passe</h1>
        <p className="text13">
          Indiquez l'adresse email associée à votre compte pour recevoir un code
          de réinitialisation.
        </p>
        <Form onFinish={onFinish}>
          <Form.Item
            name="email"
            validateStatus={emailStatus}
            hasFeedback
            rules={[{ validator: validateEmail }]}
          >
            <input
              placeholder="Email associé au compte"
              id="MonInput"
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Item>

          <Form.Item style={{ margin: "auto" }}>
            <Button
              type="primary"
              htmlType="submit"
              className="Btnvalidate"
              loading={loading}
            >
              Envoyer le code
              <MailLock />
            </Button>
          </Form.Item>
          <br />
          <p>
            Je ne dispose pas de compte ?{" "}
            <Link to="/inscription" id="OuvrirCompte">
              Ouvrir un compte
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}
