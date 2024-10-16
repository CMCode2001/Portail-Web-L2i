import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, Button, notification } from "antd";
import "../Styles/ResetMotDePasse.css";
import { SERVER_URL } from "../Utils/constantURL";

const ResetMotDePasse = () => {
  const navigate = useNavigate();
  const [passwordStatus, setPasswordStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResetPassword = async (values) => {
    const { resetCode, newPassword, confirmPassword } = values;

    if (newPassword !== confirmPassword) {
      notification.error({
        message: "Erreur de confirmation",
        description: "Les mots de passe ne correspondent pas.",
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        `${SERVER_URL}/password-reset/reset?resetCode=${resetCode}&newPassword=${newPassword}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            resetCode,
            newPassword,
          }),
        }
      );

      const result = await response.text();

      if (response.status !== 200) {
        throw new Error(result || "Erreur de réinitialisation.");
      }

      notification.success({
        message: "Succès",
        description: "Votre mot de passe a été réinitialisé avec succès.",
      });
      navigate("/connexion");
    } catch (error) {
      notification.error({
        message: "Erreur",
        description:
          error.message ||
          "Une erreur s'est produite lors de la réinitialisation.",
      });
    } finally {
      setLoading(false);
    }
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
    <div className="reset-password">
      <h1>Réinitialiser le mot de passe</h1>
      <p>
        Veuillez entrer le code de réinitialisation reçu par email, puis choisir
        un nouveau mot de passe.
      </p>

      <Form
        layout="vertical"
        onFinish={handleResetPassword}
        className="reset-password-form"
        style={{ maxWidth: "400px", margin: "0 auto" }}
      >
        <Form.Item
          label="Code de réinitialisation"
          name="resetCode"
          rules={[
            {
              required: true,
              message: "Veuillez entrer le code de réinitialisation !",
            },
          ]}
        >
          <Input placeholder="Code de réinitialisation" size="large" />
        </Form.Item>

        <Form.Item
          label="Nouveau mot de passe"
          name="newPassword"
          validateStatus={passwordStatus}
          rules={[
            {
              // required: true,
              // message: "Veuillez entrer votre nouveau mot de passe !",
              validator: validatePassword,
            },
          ]}
        >
          <Input.Password placeholder="Nouveau mot de passe" size="large" />
        </Form.Item>

        <Form.Item
          label="Confirmer le mot de passe"
          name="confirmPassword"
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: "Veuillez confirmer votre mot de passe !",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Les mots de passe ne correspondent pas !")
                );
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirmer le mot de passe"
            size="large"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="Btnvalidate"
            loading={loading}
            size="large"
            style={{ width: "100%" }}
          >
            {loading
              ? "Réinitialisation en cours..."
              : "Réinitialiser le mot de passe"}
          </Button>
        </Form.Item>
      </Form>

      <p style={{ textAlign: "center" }}>
        Je ne dispose pas de compte ?{" "}
        <Link to="/inscription" id="OuvrirCompte">
          Ouvrir un compte
        </Link>
      </p>
    </div>
  );
};

export default ResetMotDePasse;
