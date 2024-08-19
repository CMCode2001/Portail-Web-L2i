import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { SERVER_URL } from "../../../../Utils/constantURL";

const ScreenText = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const fetchText = () => {
    fetch(SERVER_URL + "/text")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      })
      .catch((error) => console.error("Error fetching data text:", error));
  };

  useEffect(() => {
    fetchText();
  }, []);

  const handleEdit = (id, newData) => {
    const token = sessionStorage.getItem("jwt");

    fetch(SERVER_URL + `/text/1`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => {
        if (response.ok) {
          setData((prevData) =>
            prevData.map((item) => (item.id === id ? newData : item))
          );
        } else {
          console.error("Failed to edit item text");
        }
      })
      .catch((error) => console.error("Error editing item:", error));
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
