import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Input, Select } from "antd";
import { useApi } from "../../../../Utils/Api";

const CrudProfesseur = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  const fetchProfessors = useCallback(async () => {
    try {
      const response = await api.get("/professor");

      // Traiter les données si la requête est réussie
      setData(response.data.reverse()); // Inverser l'ordre des données
    } catch (error) {
      console.error(
        "Error fetching data professor:",
        error.response?.data || error.message
      );
    }
  }, [api]);

  useEffect(() => {
    fetchProfessors();
  }, [fetchProfessors]);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce professeur?")) {
      try {
        const response = await api.delete(`/professor/${id}`);

        if (response.status === 200) {
          setData((prevData) => prevData.filter((item) => item.id !== id));
        } else {
          console.error("Failed to delete item professor");
        }
      } catch (error) {
        console.error(
          "Error deleting item:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleEdit = async (id, newData) => {
    try {
      const response = await api.patch(`/professor/${id}`, newData);

      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) => (item.id === id ? newData : item))
        );
      } else {
        console.error("Failed to edit item professor");
      }
    } catch (error) {
      console.error(
        "Error editing item:",
        error.response?.data || error.message
      );
    }
  };

  // const handleAdd = (newData) => {

  //   fetch(SERVER_URL + "/register/professor", {
  //     method: "POST",
  //     body: JSON.stringify(newData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setIsAddModalOpen(false);
  //       addForm.resetFields();
  //       // fetchProfessors();
  //       setData((prevData) => [data, ...prevData]); // Ajouter le nouvel élément au début
  //     })
  //     .catch((error) => console.error("Error adding item:", error));
  // };

  const handleAdd = async (newData) => {
    try {
      const response = await api.post("/register/professor", newData);

      if (response.status === 200) {
        const data = response.data;
        setIsAddModalOpen(false);
        addForm.resetFields();
        setData((prevData) => [data, ...prevData]); // Ajouter le nouvel élément au début
      } else {
        console.error("Failed to add item professor");
      }
    } catch (error) {
      console.error(
        "Error adding item:",
        error.response?.data || error.message
      );
    }
  };

  // const showEditModal = (record) => {
  //   setCurrentRecord(record);
  //   form.setFieldsValue(record);
  //   setIsModalOpen(true);
  // };

  const showAddModal = () => {
    addForm.setFieldsValue({
      password: generateDefaultPassword(),
      department: "INFORMATIQUE",
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

  const classroomOptions = [
    { label: "Licence 1", value: 1 },
    { label: "Licence 2", value: 2 },
    { label: "Licence 3", value: 3 },
    // { label: "Master 1", value: 4 },
    // { label: "Master 2", value: 5 },
    // { label: "None", value: 0 },
  ];

  const columns = [
    {
      title: "FirstName",
      dataIndex: "firstName",
      key: "firstName",
    },
    {
      title: "LastName",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Department",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Speciality",
      dataIndex: "specialityProfessor",
      key: "specialityProfessor",
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <span>
          {/* Commenter le bouton Edit */}
          {/* <Button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={() => showEditModal(record)}
          >
            Edit
          </Button> */}
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
          Add Professor
        </Button>
      </div>
      <Modal
        title="Edit Record"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="firstName" label="FirstName">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="LastName">
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email">
            <Input />
          </Form.Item>
          <Form.Item name="department" label="Department">
            <Input />
          </Form.Item>
          <Form.Item name="specialityProfessor" label="Speciality">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add Professor"
        open={isAddModalOpen}
        onOk={handleAddOk}
        onCancel={handleAddCancel}
      >
        <Form form={addForm} layout="vertical">
          <Form.Item name="department" label="Department">
            <Input defaultValue={"INFORMATIQUE"} />
          </Form.Item>
          <Form.Item hidden name="specialityProfessor" label="Speciality">
            <Input />
          </Form.Item>
          <Form.Item required name="classroom_id" label="Classroom">
            <Select options={classroomOptions} />
          </Form.Item>
          <Form.Item hidden name="courses" label="Courses">
            <Input />
          </Form.Item>
          <Form.Item name="firstName" label="FirstName">
            <Input />
          </Form.Item>
          <Form.Item name="lastName" label="LastName">
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

export default CrudProfesseur;
