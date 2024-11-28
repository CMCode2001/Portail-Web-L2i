import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { Select } from "antd";
import { useApi } from "../../../../Utils/Api";

const CrudClasseL3 = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();
  const [addForm] = Form.useForm();

  // const fetchClasseL1 = () => {
  //   fetch(SERVER_URL + "/curentListStudent/niveau/licence3", {
  //     method: "GET",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const sortedData = data.sort((a, b) => {
  //         if (a.lastName < b.lastName) return -1;
  //         if (a.lastName > b.lastName) return 1;
  //         if (a.firstName < b.firstName) return -1;
  //         if (a.firstName > b.firstName) return 1;
  //         return 0;
  //       });
  //       // setData(sortedData.reverse()); // Inverser l'ordre des données
  //       setData(sortedData);
  //     })
  //     .catch((error) =>
  //       console.error("Error fetching data student level 1:", error)
  //     );
  // };

  const fetchClasseL1 = useCallback(async () => {
    try {
      const response = await api.get("/curentListStudent/niveau/licence3");

      if (response.status === 200) {
        const data = response.data;
        const sortedData = data.sort((a, b) => {
          if (a.lastName < b.lastName) return -1;
          if (a.lastName > b.lastName) return 1;
          if (a.firstName < b.firstName) return -1;
          if (a.firstName > b.firstName) return 1;
          return 0;
        });
        // setData(sortedData.reverse()); // Inverser l'ordre des données si nécessaire
        setData(sortedData);
      } else {
        console.error(
          "Échec du chargement des données des étudiants niveau L1"
        );
      }
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données des étudiants niveau L1 :",
        error
      );
    }
  }, [api]);

  useEffect(() => {
    fetchClasseL1();
  }, [fetchClasseL1]);

  // const handleDelete = (id) => {
  //   if (window.confirm("Voulez-vous vraiment supprimer ce etudiant?")) {
  //     fetch(SERVER_URL + `/curentListStudent/${id}`, {
  //       method: "DELETE",
  //     })
  //       .then((response) => {
  //         if (response.ok) {
  //           setData((prevData) => prevData.filter((item) => item.id !== id));
  //         } else {
  //           console.error("Failed to delete item student");
  //         }
  //       })
  //       .catch((error) => console.error("Error deleting item:", error));
  //   }
  // };

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet étudiant ?")) {
      try {
        const response = await api.delete(`/curentListStudent/${id}`);

        if (response.status === 200) {
          setData((prevData) => prevData.filter((item) => item.id !== id));
        } else {
          console.error("Échec de la suppression de l'étudiant");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de l'étudiant :", error);
      }
    }
  };

  // const handleEdit = (id, newData) => {
  //   fetch(SERVER_URL + `/curentListStudent/${id}`, {
  //     method: "PATCH",
  //     body: JSON.stringify(newData),
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         setData((prevData) =>
  //           prevData.map((item) => (item.id === id ? newData : item))
  //         );
  //       } else {
  //         console.error("Failed to edit item student");
  //       }
  //     })
  //     .catch((error) => console.error("Error editing item:", error));
  // };

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
        console.error("Échec de la modification de l'étudiant");
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'étudiant :", error);
    }
  };

  // const handleAdd = (newData) => {
  //   fetch(SERVER_URL + "/curentListStudent", {
  //     method: "POST",
  //     body: JSON.stringify(newData),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setIsAddModalOpen(false);
  //       addForm.resetFields();
  //       // fetchClasseL1();
  //       setData((prevData) => [data, ...prevData]); // Ajouter le nouvel élément au début
  //     })
  //     .catch((error) => console.error("Error adding item:", error));
  // };

  const handleAdd = async (newData) => {
    try {
      const response = await api.post("/curentListStudent", newData);

      if (response.status === 201) {
        // 201 pour la création réussie
        const data = response.data;
        setIsAddModalOpen(false);
        addForm.resetFields();
        // fetchClasseL1(); // Si nécessaire pour rafraîchir la liste
        setData((prevData) => [data, ...prevData]); // Ajouter le nouvel élément au début
      } else {
        console.error("Échec de l'ajout de l'étudiant");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'étudiant :", error);
    }
  };

  const showEditModal = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const showAddModal = () => {
    addForm.setFieldsValue({
      classroom: "LICENCE3",
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
    { label: "Ancien", value: "ANCIEN" },
    // { label: "Master 1", value: "MASTER1" },
    // { label: "Master 2", value: "MASTER2" },
    // { label: "None", value: "NONE" },
  ];

  const specialityStudentOptions = [
    { label: "Génie Logiciel", value: "GL" },
    { label: "Réseau", value: "RS" },
    { label: "None", value: "None" },
  ];

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
            <Input value={"LICENCE3"} />
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

export default CrudClasseL3;
