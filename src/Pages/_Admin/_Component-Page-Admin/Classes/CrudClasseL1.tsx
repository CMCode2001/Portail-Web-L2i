import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { SERVER_URL } from "../../../../constantURL";

const CrudClasseL1 = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const fetchClasseL1 = () => {
    fetch(SERVER_URL + "/student/niveau/1")
      .then((response) => response.json())
      .then((data) => setData(data.reverse())) // Inverser l'ordre des données
      .catch((error) =>
        console.error("Error fetching data student level 1:", error)
      );
  };

  useEffect(() => {
    fetchClasseL1();
  }, []);

  const handleDelete = (id) => {
    const token = sessionStorage.getItem("jwt");

    if (window.confirm("Voulez-vous vraiment supprimer ce etudiant?")) {
      fetch(SERVER_URL + `/student/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setData((prevData) => prevData.filter((item) => item.id !== id));
          } else {
            console.error("Failed to delete item student");
          }
        })
        .catch((error) => console.error("Error deleting item:", error));
    }
  };

  const handleEdit = (id, newData) => {
    const token = sessionStorage.getItem("jwt");

    fetch(SERVER_URL + `/student/${id}`, {
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
          console.error("Failed to edit item student");
        }
      })
      .catch((error) => console.error("Error editing item:", error));
  };

  const handleAdd = (newData) => {
    const token = sessionStorage.getItem("jwt");

    fetch(SERVER_URL + "/student", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newData),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsAddModalOpen(false);
        addForm.resetFields();
        // fetchClasseL1();
        setData((prevData) => [data, ...prevData]); // Ajouter le nouvel élément au début
      })
      .catch((error) => console.error("Error adding item:", error));
  };

  const showEditModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const showAddModal = () => {
    addForm.setFieldsValue({
      password: generateDefaultPassword(),
      classeroom_id: 1,
    });
    setIsAddModalOpen(true);
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

  const handleAddOk = () => {
    addForm
      .validateFields()
      .then((values) => {
        handleAdd(values);
        setIsAddModalOpen(false); // Fermez le modal d'ajout ici
        addForm.resetFields(); // Réinitialisez les champs du formulaire
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setCurrentRecord(null);
  };

  const handleAddCancel = () => {
    setIsAddModalOpen(false);
    addForm.resetFields(); // Réinitialisez les champs du formulaire en cas d'annulation
  };

  const generateDefaultPassword = () => {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < 6; i++) {
      password += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return password;
  };

  const columns = [
    {
      title: "INE",
      dataIndex: "ine",
      key: "ine",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Speciality",
      dataIndex: "specialityStudent",
      key: "specialityStudent",
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
      <Table columns={columns} dataSource={data} rowKey="id" />
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Button type="primary" onClick={showAddModal}>
          Add student
        </Button>
      </div>
      <Modal
        title="Edit Record"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="ine" label="INE">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="LastName">
            <Input />
          </Form.Item>
          <Form.Item name="firstName" label="FirstName">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="specialityStudent" label="Speciality">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add student"
        open={isAddModalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form form={addForm} layout="vertical">
          <Form.Item required name="ine" label="INE">
            <Input />
          </Form.Item>
          <Form.Item required name="specialityStudent" label="Speciality">
            <Input />
          </Form.Item>
          <Form.Item hidden name="classeroom_id" label="Classeroom ID">
            <Input />
          </Form.Item>
          <Form.Item required name="firstName" label="FirstName">
            <Input />
          </Form.Item>
          <Form.Item required name="lastName" label="LastName">
            <Input />
          </Form.Item>
          <Form.Item required name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item required name="password" label="Password">
            <Input defaultValue={generateDefaultPassword()} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CrudClasseL1;
