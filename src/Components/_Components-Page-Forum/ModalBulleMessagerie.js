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
import { SERVER_URL } from "../../constantURL";
import ChatIconComponent from "./ChatIconComponent";

const { TextArea } = Input;

const ModalBulleMessagerie = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isMessagesModalVisible, setIsMessagesModalVisible] = useState(false);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false); // Ajout de l'état pour la modal de réponse
  const [form] = Form.useForm();
  const [listeForum, setListeForum] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(null);
  const [reponse, setReponse] = useState("");
  const [forum_id, setForumID] = useState(0);

  const userJson = sessionStorage.getItem("user");

  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  // const showModal = () => {
  //   setIsModalVisible(true);

  // };

  useEffect(() => {
    const user = getUserInfo();
    setCurrentUser(user);
    console.log("user user user user :" + user);
    const jwt = sessionStorage.getItem("jwt");
    setToken(jwt);
    fetchForum(jwt);
  }, [navigate]);

  const showModal = () => {
    if (!currentUser) {
      navigate("/connexion"); // Rediriger si l'utilisateur n'est pas connecté
    } else {
      setIsModalVisible(true);
    }
  };

  const handleReplyModalCancel = () => {
    // Fonction pour fermer la modal de réponse
    setIsReplyModalVisible(false);
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

  // useEffect(() => {
  //   const user = getUserInfo();
  //   // if (!user) {
  //   //   navigate("/connexion"); // Rediriger si l'utilisateur n'est pas connecté
  //   // }
  //   setCurrentUser(user);
  //   console.log("user user user user :" + user);
  //   const jwt = sessionStorage.getItem("jwt");
  //   setToken(jwt);
  //   fetchForum(jwt);
  // }, [navigate]);

  const handleAnswerseMessages = () => {
    // form.validateFields().then((values) => {
    const newMessage = {
      content: reponse,
      forum_id,
      author_id: currentUser.id,
      // creatAt: new Date().toISOString(), // Current time in ISO format
      createdBy: currentUser.firstName + " " + currentUser.lastName, // Remplacez par l'utilisateur actuel si disponible
    };
    // const token = sessionStorage.getItem("jwt");
    console.log(token);
    // Update the server with the new forum entry
    fetch(SERVER_URL + "/message", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`, // Ajout du token dans les headers
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
        // Update messages for the selected forum
        const updatedForum = {
          ...selectedForum,
          messages: [...selectedForum.messages, data],
        };
        setSelectedForum(updatedForum);
        form.resetFields();
        setIsReplyModalVisible(false);
        // Update messages for the selected forum
        // const updatedForum = {
        // ...selectedForum,
        // messages: [...selectedForum.messages, data],
        // };
        // setSelectedForum(updatedForum);
        // form.resetFields();
        // setIsReplyModalVisible(false);
        // setListeForum([data, ...listeForum]);
        // form.resetFields();
        // handleReplyModalCancel(false);
        // isMessagesModalVisible(false);
        // fetchForum();
        // // selectedForum(null);
        // isMessagesModalVisible(false);
        // handleMessagesModalCancel(true);
      })
      .catch((error) => console.error("Error adding forum:", error));
    // });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newForum = {
        probleme: values.probleme,
        description: values.description,
        author_id: currentUser.id,
        // creatAt: new Date().toISOString(),
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
          console.log("##########################");
          console.log(response);
          console.log(response.data);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          setListeForum([data, ...listeForum]);
          form.resetFields();
          setIsModalVisible(false);
        })
        .catch((error) => console.error("Error adding forum:", error));
    });
  };

  const showReplyModal = () => {
    setIsReplyModalVisible(true);
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
        width={800}
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
          style={{ margin: "20px 0", width: "50rem", height: "200px" }}
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
            Répondre
          </Button>
        </Card>
      ))}

      <Modal
        title="Messages du forum"
        visible={isMessagesModalVisible}
        onCancel={handleMessagesModalCancel}
        footer={null}
        width={800}
      >
        {selectedForum && (
          <div>
            <h2>{selectedForum.probleme}</h2>
            <p> {selectedForum.description}</p>
            <List
              dataSource={selectedForum.messages}
              renderItem={(message) => (
                <List.Item key={message.id}>
                  <List.Item.Meta
                    title={
                      (
                        <div>
                          {" "}
                          <UserOutlined />
                          &nbsp;
                          {message.authorName}
                        </div>
                      ) || "Anonyme"
                    }
                    description={formatDate(message.creatAt)}
                  />
                  <Typography.Paragraph>{message.message}</Typography.Paragraph>
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
        visible={isReplyModalVisible}
        onCancel={handleReplyModalCancel}
        footer={null}
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Réponse"
            name="response"
            onChange={(e) => setReponse(e.target.value)}
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
      <ChatIconComponent />
    </div>
  );
};

export default ModalBulleMessagerie;
