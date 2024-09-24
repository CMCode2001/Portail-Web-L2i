import React, { useState } from 'react';
import HeaderBlock from './Header/HeaderBlock';
import { Button, Form,  message } from 'antd';
import '../Styles/ForgetMotDePasse.css';
import { Link } from 'react-router-dom';
import { Label, MailLock } from '@mui/icons-material';
import { SERVER_URL } from '../Utils/constantURL';


export default function ForgetMotDePasse() {
  const [emailStatus, setEmailStatus] = useState("");
  const [loading, setLoading] = useState(false);
  // const [token, setToken] = useState(null);
  const [email, setEmail]= useState("");


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
  
  const recupereEmail = (email) =>{
    setEmail(email);
  }

  const onFinish = async (values) => {
    setLoading(true);
    console.log("Email envoyé pour la réinitialisation :", email);  // Log pour voir l'email
    try {
        const response = await fetch(SERVER_URL+'/password-reset/request', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email }),
        });

        const result = await response.text();
        if (response.ok) {
            message.success('Le lien de réinitialisation a été envoyé!');
        } else {
            message.error(result);
        }
    } catch (error) {
        message.error('Une erreur est survenue lors de l\'envoi du lien.');
    } finally {
        setLoading(false);
    }
};

  const onFinishFailed = () => {
    message.error('Veuillez renseigner ce champ!');
  };

  return (
    <div>
      <HeaderBlock />
      <div className='container text-center mt-4'>
        
        <Button id='mdpoublie'> <Label/> MOT DE PASSE OUBLIÉ</Button>
        <br />
        <br />
        <h1 className='text12'>Réinitialisation du mot de passe</h1>
        <p className='text13'>Indiquez l'adresse email associée à votre compte pour recevoir un lien de réinitialisation.</p>
        <Form
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
              <Form.Item
                className="text-lg-center"
                // id="AugTaille"
                name="email"
                validateStatus={emailStatus}
                hasFeedback
                rules={[{ validator: validateEmail }]}
              >
                {/* <Input placeholder="Email" name="email"   /> */}
                <input 
                  placeholder="Email associé au compte" 
                  name="email" 
                  id='MonInput' 
                  onChange={(email) => recupereEmail(email.target.value)}  
                />
              </Form.Item>

              <Form.Item style={{ margin: 'auto' }}>
                <Button type="primary" htmlType="submit" className='Btnvalidate' loading={loading}>
                  Envoyer moi le lien<MailLock/>
                </Button>
              </Form.Item>
          <br />
          <br />
          <p>Je ne dispose pas de compte ? <Link to='/inscription' id='OuvrirCompte'>Ouvrir un compte</Link></p>
        </Form>
      </div>
    </div>
  );
}
