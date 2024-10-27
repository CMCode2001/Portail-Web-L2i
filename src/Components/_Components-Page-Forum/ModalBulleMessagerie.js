import {
  InboxOutlined,
  PictureOutlined,
  UploadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Form,
  Input,
  List,
  Modal,
  Typography,
  notification,
  Pagination,
  Upload,
  Image,
} from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Chat from "../../Assets/img/chat.png";
import "../../Styles/ModalBulleMessagerie.css";
import { SERVER_URL } from "../../Utils/constantURL";
import ChatIconComponent from "./ChatIconComponent";
import { useAuth } from "../../Utils/AuthContext";
import { useApi } from "../../Utils/Api";
import Fade from "react-reveal/Fade";

const { TextArea } = Input;
const ModalBulleMessagerie = () => {
  const api = useApi(); // Obtient l'instance configurée
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEditForum, setIsModalVisibleEditForum] = useState(false);
  const [isMessagesModalVisible, setIsMessagesModalVisible] = useState(false);
  const [isReplyModalVisible, setIsReplyModalVisible] = useState(false);
  const [formQuestion] = Form.useForm(); // Formulaire pour poser une question
  const [formResponse] = Form.useForm(); // Formulaire pour répondre à une question
  const [form] = Form.useForm(); // Ajoutez cette ligne pour définir le formulaire form
  const [listeForum, setListeForum] = useState([]);
  const [selectedForum, setSelectedForum] = useState(null);
  const [response, setResponse] = useState("");
  const [forum_id, setForumID] = useState(0);
  const [isChatIconOpen, setIsChatIconOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const { authData } = useAuth();
  const [file, setFile] = useState(null); // Stocker l'image sélectionnée
  const [selectedImage, setSelectedImage] = useState(null);
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);

  const currentUser = authData.user;

  const handleChatIconToggle = () => {
    setIsChatIconOpen(!isChatIconOpen);
  };

  const cardStyle = {
    margin: "20px 0",
    width: windowWidth < 768 ? "100%" : "90%", // 100% width pour les petits écrans
    height: windowWidth < 768 ? "auto" : "auto", // Auto height pour les petits écrans
  };

  const navigate = useNavigate(); // Utiliser useNavigate pour la redirection

  // État pour gérer la pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Nombre de forums par page

  // Calculer la plage d'index pour la page actuelle
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Extraire les forums à afficher sur la page actuelle
  const paginatedForums = listeForum.slice(startIndex, endIndex);

  useEffect(() => {
    fetchForum();
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

  const handleImageClick = (url) => {
    setSelectedImage(url);
    setIsModalImageVisible(true);
  };

  const handleModalClose = () => {
    setIsModalImageVisible(false);
    setSelectedImage(null);
  };

  const handleAnswerseMessages = async () => {
    try {
      // Valider les champs du formulaire
      const values = await formResponse.validateFields();
      const message = values.response?.trim(); // Récupère et nettoie la réponse

      // Vérifier si le message est vide
      if (!message) {
        notification.error({
          message: "Erreur de validation",
          description: "Le champ réponse ne peut pas être vide.",
          placement: "topRight",
          showProgress: true,
        });
        return; // Ne pas poursuivre la requête si le champ est vide
      }

      const newMessage = {
        message: message,
        forum_id: forum_id,
        author_id: currentUser.id,
        createdBy: `${currentUser.firstName} ${currentUser.lastName}`,
      };

      // Envoi de la requête POST avec l'API
      const response = await api.post("/message", newMessage);

      // Traiter la réponse
      const data = response.data;

      // Mettre à jour les messages du forum
      const updatedForum = {
        ...selectedForum,
        messages: [...selectedForum.messages, data],
      };
      setSelectedForum(updatedForum);
      formResponse.resetFields();
      setIsReplyModalVisible(false);

      // Notification de succès
      notification.success({
        message: "Réponse ajoutée",
        description: "Votre réponse a été ajoutée avec succès.",
        placement: "topRight",
        showProgress: true,
      });
    } catch (error) {
      console.error("Error adding message:", error);

      // Notification d'erreur
      notification.error({
        message: "Erreur lors de l'ajout de la réponse",
        description:
          "Une erreur est survenue lors de l'envoi de votre réponse. Veuillez réessayer.",
        placement: "topRight",
        showProgress: true,
      });
    }
  };

  const handleOk = async () => {
    try {
      // Valider les champs du formulaire
      const values = await formQuestion.validateFields();

      // Créer un objet FormData pour envoyer à la fois l'image et les données du forum
      const formData = new FormData();
      formData.append(
        "forum",
        JSON.stringify({
          probleme: values.probleme,
          description: values.description,
          author_id: currentUser.id,
          createdBy: currentUser.firstName + " " + currentUser.lastName,
        })
      );

      if (file) {
        formData.append("file", file); // Ajouter l'image si elle est présente
      }

      // Envoyer la requête POST avec l'API
      const response = await api.post("/forum", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Mise à jour de la liste des forums
      setListeForum([response.data, ...listeForum]);

      // Réinitialiser les champs du formulaire et fermer le modal
      formQuestion.resetFields();
      setIsModalVisible(false);
      setFile(null); // Effacer l'image sélectionnée après l'envoi réussi

      // Notification de succès
      notification.success({
        message: "Question soumise",
        description: "Votre question a été postée avec succès dans le forum.",
        placement: "topRight",
        showProgress: true,
      });
    } catch (error) {
      // En cas d'erreur dans la requête ou la soumission
      console.error("Error in form submission or closing modal:", error);

      // Notification d'erreur
      notification.error({
        message: "Erreur lors de la soumission",
        description:
          "Une erreur est survenue lors de la soumission de votre question. Veuillez réessayer.",
        placement: "topRight",
        showProgress: true,
      });
    }
  };

  // const handleFileChange = ({ file }) => {
  //   setFile(file); // Stocker le fichier sélectionné dans l'état
  // };

  const handleDeleteOwnMessages = (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer votre message ?")) {
      api
        .delete(`/message/${id}`)
        .then((response) => {
          if (response.status === 200) {
            setSelectedForum((prevForum) => ({
              ...prevForum,
              messages: prevForum.messages.filter(
                (message) => message.id !== id
              ),
            }));

            // Notification de succès
            notification.success({
              message: "Message supprimé",
              description: "Votre message a été supprimé avec succès.",
              placement: "topRight",
              showProgress: true,
            });
          } else {
            // Notification d'échec
            notification.error({
              message: "Échec de la suppression",
              description:
                "Une erreur est survenue lors de la suppression de votre message.",
              placement: "topRight",
              showProgress: true,
            });
          }
        })
        .catch((error) => {
          console.error("Erreur lors de la suppression :", error);

          // Notification d'erreur
          notification.error({
            message: "Erreur lors de la suppression",
            description:
              "Une erreur est survenue lors de la suppression de votre message. Veuillez réessayer.",
            placement: "topRight",
            showProgress: true,
          });
        });
    }
  };

  const handleEditForum = async (id, newData) => {
    if (!newData.probleme || !newData.description) {
      notification.error({
        message: "Erreur de validation",
        description:
          "Tous les champs doivent être remplis pour modifier le forum.",
        placement: "topRight",
        showProgress: true,
      });
      return;
    }

    // Préparer FormData pour inclure les données de modification et l’image
    const formData = new FormData();
    formData.append("forum", JSON.stringify(newData));
    if (file) formData.append("file", file);

    try {
      const response = await api.put(`/forum/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setListeForum((prevData) =>
        prevData.map((item) =>
          item.id === id
            ? { ...item, ...newData, url: response.data.url }
            : item
        )
      );

      notification.success({
        message: "Modification réussie",
        description: "Le forum a été modifié avec succès.",
        placement: "topRight",
        showProgress: true,
      });
    } catch (error) {
      console.error("Erreur lors de la modification du forum :", error);

      notification.error({
        message: "Erreur lors de la modification",
        description:
          "Une erreur est survenue lors de la modification du forum. Veuillez réessayer.",
        placement: "topRight",
        showProgress: true,
      });
    }
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

  const fetchForum = () => {
    fetch(`${SERVER_URL}/forum`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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

  // Quand le modal s'ouvre, chargez l'image existante si elle est disponible
  useEffect(() => {
    if (isModalVisibleEditForum && forum_id) {
      const forumToEdit = listeForum.find((forum) => forum.id === forum_id);
      if (forumToEdit?.url) {
        setSelectedImage([{ url: forumToEdit.url }]);
      } else {
        setSelectedImage([]);
      }
    }
  }, [isModalVisibleEditForum, forum_id, listeForum]);
  // }, [isModalVisibleEditForum]);

  return (
    <div className="container">
      {/* Bouton pour poser une question et modale */}
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
          {/* Ajout de la section pour uploader une image */}
          <Form.Item label="Téléchargez une image (optionnel)">
            <Upload
              listType="picture"
              accept="image/*"
              maxCount={1} // Limiter à une seule image
              beforeUpload={(file) => {
                setFile(file); // Mettre à jour l'image sélectionnée
                return false; // Annuler l'upload automatique
              }}
              onRemove={() => setFile(null)} // Supprimer l'image sélectionnée
            >
              <Button icon={<UploadOutlined />}>
                Cliquez pour téléverser une image
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
      {/* Affichage des forums avec pagination */}
      {/* {paginatedForums.map((forum, index) => (
        <Fade top>
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
            <Typography.Paragraph strong>
              {forum?.probleme}
            </Typography.Paragraph>
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

            {currentUser && currentUser.id === forum.author_id && (
              <Button
                id="btnModifier"
                onClick={() => {
                  setIsModalVisibleEditForum(true);
                  form.setFieldsValue({
                    probleme: forum.probleme,
                    description: forum.description,
                  });
                  setForumID(forum.id);
                }}
                style={{
                  backgroundColor: "#6b2239",
                  color: "white",
                  float: "right", // Pour aligner à droite
                  marginLeft: "auto", // Assure un alignement à droite
                }}
              >
                Modifier
              </Button>
            )}
          </Card>
        </Fade>
      ))} */}

      {paginatedForums.map((forum, index) => (
        <Fade top key={index}>
          <Card
            className={`${isChatIconOpen ? "blur-background" : ""}`}
            style={cardStyle}
          >
            <Card.Meta
              avatar={<Avatar size="large" icon={<UserOutlined />} />}
              title={forum?.createdBy}
              description={formatDate(forum?.creatAt)}
            />
            {/* Afficher l'icône image si le forum a une URL */}
            {forum?.url && forum?.url !== "null" && (
              <Button
                id="btnImage"
                icon={<PictureOutlined />}
                onClick={() => handleImageClick(forum?.url)}
                style={{
                  float: "right",
                  marginLeft: "auto",
                  marginTop: "-45px",
                  color: "rgba(0, 0, 0, 0.5)",
                  backgroundColor: "rgb(37, 150, 190)",
                }}
              />
            )}
            <br />
            <Typography.Paragraph strong>
              {forum?.probleme}
            </Typography.Paragraph>
            <Typography.Paragraph>{forum?.description}</Typography.Paragraph>

            <Button
              id="btnRepondre"
              onClick={() => {
                showMessages(forum);
                setForumID(forum?.id);
              }}
            >
              <img src={Chat} alt="Chat" width={15} height={15} />
              Réponses
            </Button>

            {/* Bouton pour modifier le forum si l'utilisateur est l'auteur */}
            {currentUser && currentUser?.id === forum?.author_id && (
              <Button
                id="btnModifier"
                onClick={() => {
                  setIsModalVisibleEditForum(true);
                  form.setFieldsValue({
                    probleme: forum?.probleme,
                    description: forum?.description,
                  });
                  setForumID(forum?.id);
                }}
                style={{
                  backgroundColor: "#6b2239",
                  color: "white",
                  float: "right", // Pour aligner à droite
                  marginLeft: "auto", // Assure un alignement à droite
                }}
              >
                Modifier
              </Button>
            )}
          </Card>
        </Fade>
      ))}

      {/* Modal pour afficher l'image */}
      <Modal
        visible={isModalImageVisible}
        footer={null}
        onCancel={handleModalClose}
        width={600}
      >
        <Image
          src={`${SERVER_URL}${selectedImage}`}
          alt="Forum Image"
          style={{ width: "100%", height: "auto" }}
        />
      </Modal>

      {/* Composant de pagination pour naviguer entre les pages */}
      {listeForum.length > itemsPerPage && (
        <Pagination
          current={currentPage}
          pageSize={itemsPerPage}
          total={listeForum.length}
          onChange={(page) => setCurrentPage(page)}
        />
      )}

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
                          {message?.createdBy || "Anonyme"}
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
                      {currentUser && currentUser.id === message.author_id && (
                        <Button
                          type="link"
                          onClick={() => handleDeleteOwnMessages(message.id)}
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          Supprimer
                        </Button>
                      )}
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

      <Modal
        title="Modifier le Forum"
        open={isModalVisibleEditForum}
        onOk={() => {
          form.validateFields().then((values) => {
            handleEditForum(forum_id, values);
            setIsModalVisibleEditForum(false);
            setFile(null); // Réinitialise l'image
          });
        }}
        onCancel={() => setIsModalVisibleEditForum(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="probleme"
            label="Problème"
            rules={[{ required: true, message: "Veuillez entrer le problème" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Veuillez entrer une description" },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          {/* Champ pour uploader une nouvelle image */}
          <Form.Item label="Modifier l'image (optionnel)">
            <Upload
              listType="picture"
              accept="image/*"
              maxCount={1} // Limiter à une seule image
              beforeUpload={(file) => {
                setFile(file); // Stocke temporairement l'image
                return false; // Annule l'upload automatique
              }}
              onRemove={() => setFile(null)} // Supprime l'image sélectionnée
            >
              <Button icon={<UploadOutlined />}>
                Cliquez pour téléverser une image
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* <Modal
        title="Modifier le Forum"
        open={isModalVisibleEditForum}
        onOk={() => {
          form.validateFields().then((values) => {
            handleEditForum(forum_id, values);
            setIsModalVisibleEditForum(false);
            setFile(null); // Réinitialise l'image
            setSelectedImage(null); // Réinitialise l'image existante
          });
        }}
        onCancel={() => setIsModalVisibleEditForum(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="probleme"
            label="Problème"
            rules={[{ required: true, message: "Veuillez entrer le problème" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[
              { required: true, message: "Veuillez entrer une description" },
            ]}
          >
            <Input.TextArea rows={5} />
          </Form.Item>

          <Form.Item label="Modifier l'image (optionnel)">
            <Upload
              listType="picture"
              accept="image/*"
              maxCount={1} // Limiter à une seule image
              beforeUpload={(file) => {
                setFile(file); // Stocke temporairement l'image
                return false; // Annule l'upload automatique
              }}
              onRemove={() => {
                setFile(null);
                setSelectedImage([]); // Supprime l'image existante
              }}
              defaultFileList={selectedImage} // Charge l'image existante
            >
              <Button icon={<UploadOutlined />}>
                Cliquez pour téléverser une image
              </Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal> */}

      {/* Icône de chat en direct */}
      <ChatIconComponent
        isLiveChatVisible={isChatIconOpen}
        onToggle={handleChatIconToggle}
      />
    </div>
  );
};
export default ModalBulleMessagerie;
