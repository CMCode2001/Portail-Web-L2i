import { UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  List,
  Modal,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import Chat from "../../Assets/img/chat.png";
import "../../Styles/ModalBulleMessagerie.css";
import { SERVER_URL } from "../../Utils/constantURL";
import ChatIconComponent from "./ChatIconComponent";

const { TextArea } = Input;
const ModalBulleMessagerie = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessagesModalVisible, setIsMessagesModalVisible] = useState(false);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [formQuestion] = Form.useForm(); // Formulaire pour poser une question
  const [formResponse] = Form.useForm(); // Formulaire pour répondre à une question
  const [listeForum, setListeForum] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [response, setResponse] = useState("");
  const [forum_id, setForumID] = useState(0);
  const [isChatIconOpen, setIsChatIconOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleChatIconToggle = () => {
    setIsChatIconOpen(!isChatIconOpen);
  };

  const cardStyle = {
    margin: "20px 0",
    width: windowWidth < 768 ? "100%" : "90%", // 100% width pour les petits écrans
    height: windowWidth < 768 ? "auto" : "auto", // Auto height pour les petits écrans
  };

  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  useEffect(() => {
    const user = getUserInfo();
    setCurrentUser(user);
    const jwt = sessionStorage.getItem("jwt");
    setToken(jwt);
    fetchForum(jwt);
  }, []);

  const showModal = () => {
    if (!currentUser) {
      navigate("/connexion");
    } else {
      setIsModalVisible(true);
    }
  };

  const handleReplyModalCancel = () => {
    setIsReplyModalVisible(false);
    formResponse.resetFields();
  };

  const getUserInfo = () => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        return user;
      } catch (error) {
        console.error(
          "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
          error
        );
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans le sessionStorage");
    }
    return null;
  };

  const handleAnswerseMessages = () => {
    formResponse.validateFields().then((values) => {
      const newMessage = {
        message: response,
        forum_id: forum_id,
        author_id: currentUser.id,
        createdBy: `${currentUser.firstName} ${currentUser.lastName}`,
      };

      fetch(SERVER_URL + "/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
          const updatedForum = {
            ...selectedForum,
            messages: [...selectedForum.messages, data],
          };
          setSelectedForum(updatedForum);
          formResponse.resetFields();
          setIsReplyModalVisible(false);
        })
        .catch((error) => console.error("Error adding message:", error));
    });
  };

  const handleOk = () => {
    formQuestion.validateFields().then((values) => {
      const newForum = {
        probleme: values.probleme,
        description: values.description,
        author_id: currentUser.id,
        createdBy: currentUser.firstName + " " + currentUser.lastName,
      };

      fetch(SERVER_URL + "/forum", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newForum),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setListeForum([data, ...listeForum]);
          formQuestion.resetFields();
          setIsModalVisible(false);
        })
        .catch((error) => {
          console.error("Error in form submission or closing modal:", error);
        });
    });
  };

  const showReplyModal = () => {
    if (!currentUser) {
      navigate("/connexion");
    } else {
      setIsReplyModalVisible(true);
    }
  };

  const showMessages = (forum) => {
    setSelectedForum(forum);
    setIsMessagesModalVisible(true);
  };

  const handleMessagesModalCancel = () => {
    setIsMessagesModalVisible(false);
    setSelectedForum(null);
  };

  const fetchForum = (jwt) => {
    fetch(`${SERVER_URL}/forum`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    })
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

  return (
    <div className="container">
      <Button id="monbtnProMax" onClick={showModal}>
        Posez une question ?
      </Button>
      <Modal
        title="Posez une question dans L2i-Forum ?"
        open={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
      >
        <Form form={formQuestion} layout="vertical">
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
          className={`${isChatIconOpen ? "blur-background" : ""}`}
          key={index}
          style={cardStyle}
        >
          <Card.Meta
            avatar={<Avatar size="large" icon={<UserOutlined />} />}
            title={forum?.createdBy}
            description={formatDate(forum?.creatAt)}
          />
          <br />
          <Typography.Paragraph strong>{forum?.probleme}</Typography.Paragraph>
          <Typography.Paragraph>{forum?.description}</Typography.Paragraph>
          <Button
            id="btnRepondre"
            onClick={() => {
              showMessages(forum);
              setForumID(forum.id);
            }}
          >
            <img src={Chat} alt="Chat" width={15} height={15} />
            Réponses
          </Button>
        </Card>
      ))}

      <Modal
        title="Messages du forum"
        open={isMessagesModalVisible}
        onCancel={handleMessagesModalCancel}
        footer={null}
        width={800}
      >
        {selectedForum && (
          <div>
            <h2>{selectedForum.probleme}</h2>
            <p>{selectedForum.description}</p>
            <hr style={{ borderTop: "2px solid blue" }} />
            <br />
            <List
              // dataSource={selectedForum.messages}
              dataSource={selectedForum.messages.sort(
                (a, b) => new Date(b.creatAt) - new Date(a.creatAt)
              )}
              renderItem={(message) => (
                <List.Item key={message.id}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Avatar size="small" icon={<UserOutlined />} />
                        <span style={{ marginLeft: 8, fontWeight: "bold" }}>
                          {message?.authorName || "Anonyme"}
                        </span>
                      </div>
                      <div style={{ marginLeft: "auto", textAlign: "right" }}>
                        <span>{formatDate(message?.creatAt)}</span>
                      </div>
                    </div>
                    <div style={{ marginTop: 8 }}>
                      <Typography.Paragraph>
                        {message.message}
                      </Typography.Paragraph>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          </div>
        )}

        <Button id="btnRepondre" onClick={showReplyModal}>
          <img src={Chat} alt="Chat" width={15} height={15} />
          Répondre
        </Button>
      </Modal>

      <Modal
        title="Répondre au forum"
        open={isReplyModalVisible}
        onCancel={handleReplyModalCancel}
        footer={null}
        width={800}
      >
        <Form form={formResponse} layout="vertical">
          <Form.Item
            label="Réponse"
            name="response"
            onChange={(e) => setResponse(e.target.value)}
            rules={[
              {
                required: true,
                message: "Veuillez entrer votre réponse",
              },
            ]}
          >
            <TextArea rows={5} />
          </Form.Item>
          <Button
            type="primary"
            id="btnRepondre"
            onClick={handleAnswerseMessages}
          >
            Envoyer
          </Button>
        </Form>
      </Modal>

      <ChatIconComponent
        isLiveChatVisible={isChatIconOpen}
        onToggle={handleChatIconToggle}
      />
    </div>
  );
};
export default ModalBulleMessagerie;
