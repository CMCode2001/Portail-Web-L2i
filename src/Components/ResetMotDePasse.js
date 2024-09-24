import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Input, message, Spin } from 'antd';
import PasswordIcon from '@mui/icons-material/Password';
import '../Styles/ResetMotDePasse.css';
import { SERVER_URL } from '../Utils/constantURL';  
import Topbar from './Header/Navbar/Topbar';
import Middlebar from './Header/Navbar/Middlebar';

export default function ResetMotDePasse() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false); // État pour l'indicateur de chargement
  const location = useLocation(); 
  const navigate = useNavigate();

  // Fonction pour extraire le token de l'URL
  useEffect(() => {
    const pathSegments = location.pathname.split('/');
    const tokenFromUrl = pathSegments[pathSegments.length - 1];
    console.log("Token récupéré :", tokenFromUrl);
    setToken(tokenFromUrl);
  }, [location]);

  const onFinish = async () => {
    if (!token) {
      message.error("Token de réinitialisation introuvable !");
      return;
    }

    setLoading(true); // Activer l'indicateur de chargement

    try {
      const response = await 
      fetch(`${SERVER_URL}/password-reset/reset?token=${token}&newPassword=${password}`, 
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });

      const result = await response.text();
      if (response.ok) {
        message.success("Mot de passe réinitialisé avec succès !");
        
        setTimeout(() => {
          navigate('/connexion');
        }, 2000);
      } else {
        message.error(result);
      }
    } catch (error) {
      message.error("Une erreur est survenue lors de la réinitialisation du mot de passe.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <>
      <Topbar />
      <Middlebar />
      <div className="container text-center mt-4">
        <Button id="mdpoublie">
          CHANGEMENT MOT DE PASSE
        </Button>
        <div id="loginPageReset">
          <div id="loginBoxReset">
            <Form onFinish={onFinish}>
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
                <Input.Password placeholder="Nouveau Mot de passe" id="MonInput2" />
              </Form.Item>

              <Form.Item
                name="confirm"
                dependencies={["password"]}
                onChange={(e) => setPasswordConfirm(e.target.value)}
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
                      return Promise.reject(new Error("Les mots de passe ne sont pas identiques !"));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="Confirmer Mot de passe" id="MonInput2" />
              </Form.Item>
              <br />

              <Form.Item style={{ margin: 'auto' }}>
              <Spin spinning={loading}>
                {loading ? (
                  <div>
                    <h1>
                      <p>Réinitialisation en cours...</p>
                    </h1>
                  </div>
                ) : (
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  className="BtnvalidateReset" 
                
                >
                  Réinitialiser Mot de Passe
                  <PasswordIcon />
                </Button>
                )}
                </Spin>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
}
