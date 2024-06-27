import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  Form,
  Input,
  Typography,
  Card,
  Avatar,
  List,
} from "antd";
import Chat from "../../Assets/img/chat.png";
import "../../Styles/ModalBulleMessagerie.css";
import { UserOutlined } from "@ant-design/icons";
import { SERVER_URL } from "../../SERVER_URL";

const { TextArea } = Input;

const ModalBulleMessagerie = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessagesModalVisible, setIsMessagesModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [listeForum, setListeForum] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newMessage = {
        probleme: values.probleme,
        description: values.description,
        creatAt: new Date().toISOString(), // Current time in ISO format
        createdBy: "Current User", // Remplacez par l'utilisateur actuel si disponible
      };

      // Update the server with the new forum entry
      fetch(SERVER_URL + "/forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Add the new message to the forum list
          setListeForum([data, ...listeForum]);
          form.resetFields();
          setIsModalVisible(false);
        })
        .catch((error) => console.error("Error adding forum:", error));
    });
  };

  useEffect(() => {
    fetchForum();
  }, []);

  const fetchForum = () => {
    fetch(SERVER_URL + "/forum")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        data.sort((a, b) => new Date(b.creatAt) - new Date(a.creatAt));
        setListeForum(data);
      })
      .catch((error) => console.error("Error fetching forum:", error));
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalVisible(false);
  };

  const handleMessagesModalCancel = () => {
    setIsMessagesModalVisible(false);
    setSelectedForum(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = date.toLocaleDateString("fr-FR", options);
    const formattedTime = date.toLocaleTimeString("fr-FR");
    return `${formattedDate} à ${formattedTime}`;
  };

  const showMessages = (forum) => {
    setSelectedForum(forum);
    setIsMessagesModalVisible(true);
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
            rules={[
              {
                required: true,
                message: "Veuillez entrer le titre du problème",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: "Veuillez entrer la description du problème",
              },
            ]}
          >
            <TextArea rows={5} />
          </Form.Item>
        </Form>
      </Modal>

      {listeForum.map((forum, index) => (
        <Card
          key={index}
          style={{ margin: "20px 0", width: "100%", height: "200px" }} // Taille fixe pour les cartes du chat bot
        >
          <Card.Meta
            avatar={<Avatar size="large" icon={<UserOutlined />} />}
            title={forum?.createdBy}
            description={formatDate(forum?.creatAt)}
          />
          <br />
          <Typography.Paragraph strong>{forum?.probleme}</Typography.Paragraph>
          <Typography.Paragraph>{forum?.description}</Typography.Paragraph>
          <Button id="btnRepondre" onClick={() => showMessages(forum)}>
            <img src={Chat} alt="Chat" width={15} height={15} />
            Répondre
          </Button>
        </Card>
      ))}

      <Modal
        title="Messages du forum"
        visible={isMessagesModalVisible}
        onCancel={handleMessagesModalCancel}
        footer={null}
        width={800} // Largeur du modal
      >
        {selectedForum && (
          <List
            dataSource={selectedForum.messages}
            renderItem={(message) => (
              <List.Item key={message.id}>
                <List.Item.Meta
                  title={message.createdBy || "Anonyme"}
                  description={formatDate(message.creatAt)}
                />
                <Typography.Paragraph>{message.content}</Typography.Paragraph>
              </List.Item>
            )}
          />
        )}
      </Modal>
    </div>
  );
};

export default ModalBulleMessagerie;
