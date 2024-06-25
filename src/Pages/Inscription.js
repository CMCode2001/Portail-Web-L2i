import {React, useState} from 'react';
import { Form, Input, Button } from 'antd';
import '../Styles/Inscription.css';
import SvgRegister from '../Assets/svg/sign-up-animate.svg';
import HeaderBlock from '../Components/Header/HeaderBlock';
import FooterBlock from '../Components/Footer/FooterBlock';

const Inscription = () => {
  const onFinish = values => {
    console.log('Success:', values);
  };

  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  /**VALIDITE EMAIL */
  const [emailStatus, setEmailStatus] = useState('');

  const validateEmail = (_, value) => {
    if (!value) {
      setEmailStatus('error');
      return Promise.reject(new Error('Veuillez entrer votre email!'));
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      setEmailStatus('error');
      return Promise.reject(new Error('Invalide'));
    }
    if (!value.endsWith('@zig.univ.sn')) {
      setEmailStatus('error');
      return Promise.reject(new Error('Veuillez entrer une adresse email professionnelle se terminant par @zig.univ.sn !'));
    }
    setEmailStatus('success');
    return Promise.resolve();
  };
  return (
    <>
    <HeaderBlock />
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img 
            src={SvgRegister} 
            alt="Register"
          />
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
            rules={[{ required: true, message: 'Veuillez entrer votre prénom !' }]}
          >
            <Input placeholder="Prénom" />
          </Form.Item>

          <Form.Item
            name="nom"
            rules={[{ required: true, message: 'Veuillez entrer votre nom !' }]}
          >
            <Input placeholder="Nom" />
          </Form.Item>
          {/* Je force le user à utiliser son mail professionnel */}
          <Form.Item
              name="email"
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
            rules={[{ required: true, message: 'Veuillez entrer votre mot de passe !' }]}
          >
            <Input.Password placeholder="Mot de passe" />
          </Form.Item>

          <Form.Item
            name="confirm"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Veuillez confirmer votre mot de passe !' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Les mots de passe ne sont pas identiques !'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirmer Mot de passe" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              S'inscrire →
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    <FooterBlock/>
    </>
  );
};

export default Inscription;
