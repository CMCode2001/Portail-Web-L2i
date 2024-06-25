import React, { useState } from 'react';
import { Modal, Button, Form, Input, Typography, Card, Avatar } from 'antd';
import Chat from '../../Assets/img/chat.png'
import '../../Styles/ModalBulleMessagerie.css';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ModalBulleMessagerie = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [messages, setMessages] = useState([]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then(values => {
      const newMessage = {
        problem: values.probleme,
        description: values.description,
        time: new Date().toLocaleString('fr-FR', { timeZone: 'UTC' }), // Current time
      };
      setMessages([...messages, newMessage]);
      form.resetFields();
      setIsModalVisible(false);
    });
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button id="monbtnProMax" onClick={showModal}>
        Posez une question ?
      </Button>
      <Modal
        title="Posez une question dans L2i-Forum ?"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={800} // Largeur du modal
        
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Problème"
            name="probleme"
            rules={[{ required: true, message: 'Veuillez entrer le titre du problème' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[{ required: true, message: 'Veuillez entrer la description du problème' }]}
          >
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>

      {messages.map((message, index) => (
        <Card
          key={index}
          style={{ margin: '20px 0', width: '100%', height: '200px' }} // Taille fixe pour les cartes du chat bot
        >
          <Card.Meta
            avatar={<Avatar size="large" icon={<UserOutlined />} />}
            title="CMC"
            description={message.time}
          />
          <br/>
          <Typography.Paragraph strong>{message.problem}</Typography.Paragraph>
          <Typography.Paragraph>{message.description}</Typography.Paragraph>
          <Button  id='btnRepondre' > 
            <img src={Chat} alt='Chat' width={15} height={15}/>
            Répondre
            </Button>
        </Card>
      ))}
    </div>
  );
};

export default ModalBulleMessagerie;
