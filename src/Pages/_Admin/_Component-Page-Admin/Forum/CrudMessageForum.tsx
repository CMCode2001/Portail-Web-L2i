import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { useApi } from "../../../../Utils/Api";

const CrudMessageForum = () => {
  const api = useApi();
  const [messages, setMessages] = useState([]);
  const [forums, setForums] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  // const fetchForums = async () => {
  //   try {
  //     const response = await fetch(`${SERVER_URL}/forum`, {
  //       method: "GET",
  //     });
  //     const forumData = await response.json();
  //     const forumMap = {};
  //     forumData.forEach((forum) => {
  //       forumMap[forum.id] = forum.probleme;
  //     });
  //     setForums(forumMap);
  //   } catch (error) {
  //     console.error("Error fetching forums:", error);
  //   }
  // };

  const fetchForums = useCallback(async () => {
    try {
      const response = await api.get("/forum");

      if (response.status === 200) {
        const forumData = response.data;
        const forumMap = {};
        forumData.forEach((forum) => {
          forumMap[forum.id] = forum.probleme;
        });
        setForums(forumMap);
      } else {
        console.error("Failed to fetch forums, status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  }, [api]);

  // // Récupérer tous les messages et les enrichir avec le nom du forum
  // const fetchMessages = async () => {
  //   try {
  //     const response = await fetch(`${SERVER_URL}/message`, {
  //       method: "GET",
  //     });

  //     const messageData = await response.json();

  //     // Enrichir chaque message avec son nom de forum correspondant
  //     const enrichedMessages = messageData.map((message) => ({
  //       ...message,
  //       forumName: forums[message.forum_id] || "Forum inconnu",
  //     }));

  //     // Trier les messages par nom de forum
  //     enrichedMessages.sort((a, b) => a.forumName.localeCompare(b.forumName));

  //     // Inverser l'ordre des messages pour afficher les plus récents en premier
  //     setMessages(enrichedMessages.reverse());
  //   } catch (error) {
  //     console.error("Erreur lors de la récupération des messages :", error);
  //   }
  // };

  const fetchMessages = async () => {
    try {
      const response = await api.get("/message");

      if (response.status === 200) {
        const messageData = response.data;

        // Enrichir chaque message avec son nom de forum correspondant
        const enrichedMessages = messageData.map((message) => ({
          ...message,
          forumName: forums[message.forum_id] || "Forum inconnu",
        }));

        // Trier les messages par nom de forum
        enrichedMessages.sort((a, b) => a.forumName.localeCompare(b.forumName));

        // Inverser l'ordre des messages pour afficher les plus récents en premier
        setMessages(enrichedMessages.reverse());
      } else {
        console.error(
          "Erreur lors de la récupération des messages, statut :",
          response.status
        );
      }
    } catch (error) {
      console.error("Erreur lors de la récupération des messages :", error);
    }
  };

  // Initial fetch of forums and then fetch messages once forums are loaded
  useEffect(() => {
    fetchForums();
  }, [fetchForums]);

  useEffect(() => {
    if (Object.keys(forums).length > 0) {
      fetchMessages();
    }
  }, [forums]);

  // Handle deletion of a message
  // const handleDelete = (id) => {
  //   if (window.confirm("Voulez-vous vraiment supprimer ce message?")) {
  //     fetch(`${SERVER_URL}/message/admin/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           setMessages((prevMessages) =>
  //             prevMessages.filter((message) => message.id !== id)
  //           );
  //         } else {
  //           console.error("Failed to delete message");
  //         }
  //       })
  //       .catch((error) => console.error("Error deleting message:", error));
  //   }
  // };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce message?")) {
      try {
        const response = await api.delete(`/message/admin/${id}`);

        if (response.status === 200) {
          setMessages((prevMessages) =>
            prevMessages.filter((message) => message.id !== id)
          );
        } else {
          console.error("Failed to delete message, status:", response.status);
        }
      } catch (error) {
        console.error("Error deleting message:", error);
      }
    }
  };

  // Handle editing of a message
  // const handleEdit = (id, newData) => {
  //   fetch(`${SERVER_URL}/message/admin/${id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify(newData),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         setMessages((prevMessages) =>
  //           prevMessages.map((message) =>
  //             message.id === id ? { ...message, ...newData } : message
  //           )
  //         );
  //       } else {
  //         console.error("Failed to edit message");
  //       }
  //     })
  //     .catch((error) => console.error("Error editing message:", error));
  // };

  const handleEdit = async (id, newData) => {
    try {
      const response = await api.patch(`/message/admin/${id}`, newData);

      if (response.status === 200) {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            message.id === id ? { ...message, ...newData } : message
          )
        );
      } else {
        console.error("Failed to edit message, status:", response.status);
      }
    } catch (error) {
      console.error("Error editing message:", error);
    }
  };

  // Open the modal for editing
  const showEditModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  // Handle modal "OK" button click
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleEdit(currentRecord.id, values);
        setIsModalOpen(false);
        setCurrentRecord(null);
      })
      .catch((info) => {
        console.log("Validation Failed:", info);
      });
  };

  // Handle modal "Cancel" button click
  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  // Define the table columns
  const columns = [
    {
      title: "Forum",
      dataIndex: "forumName",
      key: "forumName",
    },
    {
      title: "Author Name",
      dataIndex: "authorName",
      key: "authorName",
    },
    {
      title: "Message",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          <Button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button>
          <Button
            style={{ backgroundColor: "red", color: "white" }}
            onClick={() => handleDelete(record.id)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={messages} rowKey="id" />
      <Modal
        title="Edit Record"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="message" label="Message">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CrudMessageForum;
