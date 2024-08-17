import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { SERVER_URL } from "../../../../constantURL";

const CrudMessageForum = () => {
  const [messages, setMessages] = useState([]);
  const [forums, setForums] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  // Fetch all forums and create a map of forum_id to probleme
  const fetchForums = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/forum`);
      const forumData = await response.json();
      const forumMap = {};
      forumData.forEach((forum) => {
        forumMap[forum.id] = forum.probleme;
      });
      setForums(forumMap);
    } catch (error) {
      console.error("Error fetching forums:", error);
    }
  };

  // Fetch all messages and enrich them with the forum name
  const fetchMessages = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/message`);
      const messageData = await response.json();

      // Enrich each message with its corresponding forum name
      const enrichedMessages = messageData.map((message) => ({
        ...message,
        forumName: forums[message.forum_id] || "Forum inconnu",
      }));

      // Sort messages by forum name
      enrichedMessages.sort((a, b) => a.forumName.localeCompare(b.forumName));

      setMessages(enrichedMessages.reverse());
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Initial fetch of forums and then fetch messages once forums are loaded
  useEffect(() => {
    fetchForums();
  }, []);

  useEffect(() => {
    if (Object.keys(forums).length > 0) {
      fetchMessages();
    }
  }, [forums]);

  // Handle deletion of a message
  const handleDelete = (id) => {
    const token = sessionStorage.getItem("jwt");

    if (window.confirm("Voulez-vous vraiment supprimer ce message?")) {
      fetch(`${SERVER_URL}/message/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setMessages((prevMessages) =>
              prevMessages.filter((message) => message.id !== id)
            );
          } else {
            console.error("Failed to delete message");
          }
        })
        .catch((error) => console.error("Error deleting message:", error));
    }
  };

  // Handle editing of a message
  const handleEdit = (id, newData) => {
    const token = sessionStorage.getItem("jwt");

    fetch(`${SERVER_URL}/message/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (response.ok) {
          setMessages((prevMessages) =>
            prevMessages.map((message) =>
              message.id === id ? { ...message, ...newData } : message
            )
          );
        } else {
          console.error("Failed to edit message");
        }
      })
      .catch((error) => console.error("Error editing message:", error));
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
