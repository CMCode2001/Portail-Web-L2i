import {React, useState} from 'react';
import { Form, Input, Button } from 'antd';
import '../Styles/Connexion.css';
import SvgLogin from '../Assets/svg/sign-in-animate.svg'
import HeaderBlock from '../Components/Header/HeaderBlock';
import FooterBlock from '../Components/Footer/FooterBlock';

const Connexion = () => {
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
    <HeaderBlock/>
    <div className="login-page">
      <div className="login-box">
        <div className="illustration-wrapper">
          <img 
            src={SvgLogin} 
            alt="Login"
            width={600}
            height={600}
          />
        </div>
        <Form
          name="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <p className="form-title">Welcome to L2i</p>
          <p> Ravie de revoir, connectez-vous à votre compte !</p>

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
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Se Connecter →
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
    <FooterBlock/>
    </>
  );
};

export default Connexion;
