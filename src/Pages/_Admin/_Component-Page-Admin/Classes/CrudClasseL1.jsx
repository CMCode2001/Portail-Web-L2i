import { Button, Form, Input, Modal, Select, Table } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useApi } from "../../../../Utils/Api";

const CrudClasseL1 = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  // const fetchClasseL1 = async () => {
  //   try {
  //     const response = await api.get("/curentListStudent/niveau/licence1");
  //     const data = response.data;

  //     const sortedData = data.sort((a, b) => {
  //       if (a.lastName < b.lastName) return -1;
  //       if (a.lastName > b.lastName) return 1;
  //       if (a.firstName < b.firstName) return -1;
  //       if (a.firstName > b.firstName) return 1;
  //       return 0;
  //     });

  //     setData(sortedData); // Mettre à jour l'état avec les données triées
  //   } catch (error) {
  //     console.error(
  //       "Error fetching data student level 1:",
  //       error.response?.data || error.message
  //     );
  //   }
  // };

  // useEffect(() => {
  //   fetchClasseL1();
  // }, []);

  const fetchClasseL1 = useCallback(async () => {
    try {
      const response = await api.get("/curentListStudent/niveau/licence1");
      const data = response.data;

      const sortedData = data.sort((a, b) => {
        if (a.lastName < b.lastName) return -1;
        if (a.lastName > b.lastName) return 1;
        if (a.firstName < b.firstName) return -1;
        if (a.firstName > b.firstName) return 1;
        return 0;
      });

      setData(sortedData); // Mettre à jour l'état avec les données triées
    } catch (error) {
      console.error(
        "Error fetching data student level 1:",
        error.response?.data || error.message
      );
    }
  }, [api]);

  useEffect(() => {
    fetchClasseL1();
  }, [fetchClasseL1]);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      try {
        const response = await api.delete(`/curentListStudent/${id}`);
        if (response.status === 200) {
          setData((prevData) => prevData.filter((item) => item.id !== id));
        } else {
          console.error("Failed to delete item student");
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
      const response = await api.patch(`/curentListStudent/${id}`, newData);
      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, ...newData } : item
          )
        );
      } else {
        console.error("Failed to edit item student");
      }
    } catch (error) {
      console.error(
        "Error editing item:",
        error.response?.data || error.message
      );
    }
  };

  const handleAdd = async (newData) => {
    try {
      const response = await api.post("/curentListStudent", newData);
      if (response.status === 201) {
        setIsAddModalOpen(false);
        addForm.resetFields();
        setData((prevData) => [response.data, ...prevData]); // Ajouter le nouvel élément au début
      } else {
        console.error("Failed to add item student");
      }
    } catch (error) {
      console.error(
        "Error adding item:",
        error.response?.data || error.message
      );
    }
  };

  const showEditModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const showAddModal = () => {
    addForm.setFieldsValue({
      classroom: "LICENCE1",
      // classroom_id: 1,
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

  const classroomOptions = [
    { label: "Licence 1", value: "LICENCE1" },
    { label: "Licence 2", value: "LICENCE2" },
    { label: "Licence 3", value: "LICENCE3" },
    // { label: "Master 1", value: "MASTER1" },
    // { label: "Master 2", value: "MASTER2" },
    // { label: "None", value: "NONE" },
  ];

  const specialityStudentOptions = [
    { label: "Génie Logiciel", value: "GL" },
    { label: "Réseau et Services", value: "RS" },
    { label: "None", value: "None" },
  ];

  const columns = [
    {
      title: "INE",
      dataIndex: "ine",
      key: "ine",
    },
    {
      title: "Nom",
      dataIndex: "lastName",
      key: "lastName",
    },
    {
      title: "Prenom",
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
      <Table
        columns={columns}
        dataSource={data}
        rowKey="id"
        pagination={false}
      />
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
          <Form.Item name="classroom" label="Classroom">
            <Select options={classroomOptions} />
          </Form.Item>
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
          <Form.Item required name="specialityStudent" label="Speciality">
            <Select defaultValue={"None"} options={specialityStudentOptions} />
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
          <Form.Item hidden required name="classroom" label="Classroom">
            <Input value={"LICENCE1"} />
          </Form.Item>
          <Form.Item required name="ine" label="INE">
            <Input />
          </Form.Item>
          <Form.Item required name="specialityStudent" label="Speciality">
            <Select defaultValue={"None"} options={specialityStudentOptions} />
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
        </Form>
      </Modal>
    </>
  );
};

export default CrudClasseL1;
