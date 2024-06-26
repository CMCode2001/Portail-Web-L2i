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
import Chat from "../../Assets/img/chat.png";

// import { SERVER_URL } from "../../SERVER_URL";
import { SERVER_URL } from "../../constantURL";
import "../../Styles/ModalBulleMessagerie.css";

const { TextArea } = Input;

const ModalBulleMessagerie = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [reponse, setReponse] = useState("");
  const [forum_id, setForumID] = useState(0);
  const [isMessagesModalVisible, setIsMessagesModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [listeForum, setListeForum] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const token = sessionStorage.getItem("jwt");
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleReplyModalCancel = () => {
    // Fonction pour fermer la modal de réponse
    setIsReplyModalVisible(false);
  };

  // Fonction pour récupérer et utiliser les informations de l'utilisateur
  const getUserInfo = () => {
    // Récupérer la chaîne JSON stockée dans sessionStorage
    const userJson = sessionStorage.getItem("user");

    if (userJson) {
      try {
        // Convertir la chaîne JSON en un objet JavaScript
        const user = JSON.parse(userJson);
        // Vous pouvez également retourner ou utiliser ces valeurs dans votre application
        return user;
      } catch (error) {
        console.error(
          "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
          error
        );
        // Vous pouvez gérer cette erreur, par exemple, en affichant un message d'erreur à l'utilisateur
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans le sessionStorage");
      // Gérer le cas où il n'y a pas d'utilisateur dans le sessionStorage
    }
  };

  console.log("Test les infos de l'utilisateur");

  // Exemple d'utilisation

  const handleAnswerseMessages = () => {
    form.validateFields().then((values) => {
      const newMessage = {
        content: reponse,
        forum_id,
        author_id: currentUser.id,
        creatAt: new Date().toISOString(), // Current time in ISO format
        createdBy: currentUser.firstName + " " + currentUser.name, // Remplacez par l'utilisateur actuel si disponible
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
          //   ...selectedForum,
          //   messages: [...selectedForum.messages, data],
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
    });
  };

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newMessage = {
        probleme: values.probleme,
        description: values.description,
        creatAt: new Date().toISOString(), // Current time in ISO format
        createdBy: currentUser.firstName + " " + currentUser.name, // Remplacez par l'utilisateur actuel si disponible
      };
      // const token = sessionStorage.getItem("jwt");
      console.log(token);
      // Update the server with the new forum entry
      fetch(SERVER_URL + "/forum", {
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
          setListeForum([data, ...listeForum]);
          form.resetFields();
          setIsModalVisible(false);
        })
        .catch((error) => console.error("Error adding forum:", error));
    });
  };

  useEffect(() => {
    fetchForum();
    setCurrentUser(getUserInfo);
  }, []);
  // const showModal = () => {
  //   setIsModalVisible(true);
  // };
  // const [isMessagesModalVisible, setIsMessagesModalVisible] = useState(false);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false); // Ajout de l'état pour la modal de réponse
  const showReplyModal = () => {
    // Fonction pour afficher la modal de réponse
    setIsReplyModalVisible(true);
  };
  // const handleReplyOk() => {

  // }
  const fetchForum = () => {
    // fetch(SERVER_URL + "/forum")
    fetch(`${SERVER_URL}/forum`, {
      method: "GET",
      headers: {
        Authorization: `${token}`, // Ajout du token dans les headers
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
    console.log("#########################");
    console.log(forum_id);
    console.log("#########################");
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
        open={isMessagesModalVisible}
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
                  title={message.authorName || "Anonyme"}
                  description={formatDate(message.creatAt)}
                />
                <Typography.Paragraph>{message.message}</Typography.Paragraph>
              </List.Item>
            )}
          />
        )}
        <Button id="btnRepondre" onClick={showReplyModal}>
          <img src={Chat} alt="Chat" width={15} height={15} />
          Répondre
        </Button>
      </Modal>

      {/* Modal pour répondre */}
      <Modal
        title="Répondre au forum"
        visible={isReplyModalVisible}
        onCancel={handleReplyModalCancel}
        footer={null}
        width={800} // Largeur du modal
      >
        {/* Contenu de la modal de réponse */}
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
          <Button type="primary" onClick={handleAnswerseMessages}>
            {" "}
            {/* Ajout du bouton de soumission de réponse */}
            Répondre
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default ModalBulleMessagerie;
