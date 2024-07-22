import React, { useState } from 'react';
import HeaderBlock from './Header/HeaderBlock';
import { Button, Form, Input, message } from 'antd';
import '../Styles/ForgetMotDePasse.css';
import { Link } from 'react-router-dom';
import { Label } from '@mui/icons-material';

export default function ForgetMotDePasse() {
  const [emailStatus, setEmailStatus] = useState("");

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

  const onFinish = (values) => {
    message.success('Le lien de réinitialisation a été envoyé!');
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
          <br />
          <Form.Item
            className="text-lg-center"
            name="email"
            validateStatus={emailStatus}
            hasFeedback
            rules={[{ validator: validateEmail }]}
            style={{ marginBottom: 20 }}
          >
            <Input placeholder="Email" name="email" style={{ width: '30%' }} id='AugTaille' />
          </Form.Item>

          <Form.Item style={{ width: '30%', margin: 'auto' }}>
            <Button type="primary" htmlType="submit" id='AugTaille' className='Btnvalidate'>
              Envoyer le lien de réinitialisation
            </Button>
          </Form.Item>
          <br />
          <p>Je ne dispose pas de compte ? <Link to='/inscription' id='OuvrirCompte'>Ouvrir un compte</Link></p>
        </Form>
      </div>
    </div>
  );
}
