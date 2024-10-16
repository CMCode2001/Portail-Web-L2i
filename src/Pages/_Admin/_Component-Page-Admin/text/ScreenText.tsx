import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { useApi } from "../../../../Utils/Api";

const ScreenText = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const fetchText = useCallback(async () => {
    try {
      const response = await api.get("/text");

      if (response.status === 200) {
        // Vérifiez si la réponse est réussie
        setData(response.data);
      } else {
        console.error("Failed to fetch data text");
      }
    } catch (error) {
      console.error("Error fetching data text:", error);
    }
  }, [api]);

  useEffect(() => {
    fetchText();
  }, [fetchText]);

  const handleEdit = async (id, newData) => {
    try {
      const response = await api.patch(`/text/${id}`, newData);

      if (response.status === 200) {
        // Vérifiez si la réponse est réussie
        setData(
          (prevData) =>
            prevData.map((item) =>
              item.id === id ? { ...item, ...newData } : item
            ) // Mise à jour de l'élément modifié
        );
      } else {
        console.error("Failed to edit item text");
      }
    } catch (error) {
      console.error("Error editing item:", error);
    }
  };

  const showEditModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        handleEdit(currentRecord.id, values);
        setIsModalOpen(false);
        setCurrentRecord(null);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const columns = [
    {
      title: "TextFiliere",
      dataIndex: "textFiliere",
      key: "textFiliere",
    },
    {
      title: "TextDeroulant",
      dataIndex: "textDeroulant",
      key: "textDeroulant",
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
        </span>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} rowKey="id" />
      <Modal
        title="Edit Record"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="textFiliere" label="TextFiliere">
            <Input />
          </Form.Item>
          <Form.Item name="textDeroulant" label="TextDeroulant">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ScreenText;
