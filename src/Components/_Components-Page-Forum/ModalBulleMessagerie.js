import React, { useState } from 'react';
import { Modal, Button, Form, Input, Typography, Card, Avatar } from 'antd';
import Chat from '../../Assets/img/chat.png';
import '../../Styles/ModalBulleMessagerie.css';
import { UserOutlined } from '@ant-design/icons';

const { TextArea } = Input;

const ModalBulleMessagerie = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [replyForm] = Form.useForm();
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState(null);

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

  const showReplyModal = (message) => {
    setCurrentMessage(message);
    setIsReplyModalVisible(true);
  };

  const handleReplyOk = () => {
    replyForm.validateFields().then(values => {
      console.log('Reply:', values.reply);
      replyForm.resetFields();
      setIsReplyModalVisible(false);
    });
  };

  const handleReplyCancel = () => {
    replyForm.resetFields();
    setIsReplyModalVisible(false);
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
        width={800}
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
          style={{ margin: '20px 0', width: '100%', height: '200px' }}
        >
          <Card.Meta
            avatar={<Avatar size="large" icon={<UserOutlined />} />}
            title="CMC"
            description={message.time}
          />
          <br/>
          <Typography.Paragraph strong>{message.problem}</Typography.Paragraph>
          <Typography.Paragraph>{message.description}</Typography.Paragraph>
          <Button id='btnRepondre' onClick={() => showReplyModal(message)}>
            <img src={Chat} alt='Chat' width={15} height={15} />
            Répondre
          </Button>
        </Card>
      ))}

      <Modal
        title="Répondre à la question"
        visible={isReplyModalVisible}
        onOk={handleReplyOk}
        onCancel={handleReplyCancel}
        width={800}
      >
        {currentMessage && (
          <div>
            <Typography.Paragraph strong>Problème:</Typography.Paragraph>
            <Typography.Paragraph>{currentMessage.problem}</Typography.Paragraph>
            <Typography.Paragraph strong>Description:</Typography.Paragraph>
            <Typography.Paragraph>{currentMessage.description}</Typography.Paragraph>
            <Form form={replyForm} layout="vertical">
              <Form.Item
                label="Votre réponse"
                name="reply"
                rules={[{ required: true, message: 'Veuillez entrer votre réponse' }]}
              >
                <TextArea rows={5} />
              </Form.Item>
            </Form>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default ModalBulleMessagerie;
