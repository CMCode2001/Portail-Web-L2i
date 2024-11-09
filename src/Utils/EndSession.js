import React, { useState } from 'react';
import { Modal, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import Protection from '../Assets/img/protection.png';
import '../Styles/EndSession.css'; // Importez le fichier CSS

const EndSession = () => {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleLogin = () => {
    setIsModalVisible(false);
    navigate('/connexion');
  };

  return (
    <Modal
    style={{background:"white !important"}}
      title={
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src={Protection}
            alt="Protection"
            style={{
              top: '1rem',
              width: 25,
            }}
          />
          &nbsp;
          <span style={{ fontSize: '21px', fontWeight: '600' }}>
            Votre session a expiré ?
          </span>
        </div>
      }
      visible={isModalVisible}
      footer={
        <Button
          onClick={handleLogin}
          style={{
            backgroundColor: '#6B2239',
            color: 'white',
            fontWeight: '600',
            fontSize: '20px',
            textTransform: 'capitalize',
            border: 'none',
            borderRadius: '33px',
            textAlign: 'center',
            transition: 'background-color 0.3s, color 0.3s',
          }}
        >
          Se Connecter
        </Button>
      }
      centered
      closable={false}
      modalRender={(modal) => (
        <div className="chatBubbleWrapper">
          <div className="chatBubble">
            {modal}
          </div>
        </div>
      )}
    >
      <p style={{ margin: 0, padding: 0 }}>
        Connectez-vous à nouveau pour continuer à utiliser l'application.
      </p>
    </Modal>
  );
};

export default EndSession;
