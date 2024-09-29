import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { SERVER_URL } from "../../../../Utils/constantURL";

const CrudForum = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const fetchForum = () => {
    fetch(SERVER_URL + "/forum")
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((item) => {
          return fetchAuthorName(item.author_id).then((authorName) => {
            return { ...item, authorName };
          });
        });
        Promise.all(updatedData).then((results) => setData(results));
      })
      .catch((error) => console.error("Error fetching data forum:", error));
  };

  // const fetchAuthorName = async (author_id) => {
  //   try {
  //     const studentResponse = await fetch(SERVER_URL + `/student/${author_id}`);
  //     if (studentResponse.ok) {
  //       const student = await studentResponse.json();
  //       return student.firstName + " " + student.lastName;
  //     } else {
  //       const professorResponse = await fetch(
  //         SERVER_URL + `/professor/admin/${author_id}`
  //       );
  //       if (professorResponse.ok) {
  //         const professor = await professorResponse.json();
  //         return professor.firstName + " " + professor.lastName;
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error fetching author name:", error);
  //     return "Unknown Author";
  //   }
  // };

  const fetchAuthorName = async (author_id) => {
    const token = sessionStorage.getItem("access_token");

    try {
      const studentResponse = await fetch(
        SERVER_URL + `/student/admin/${author_id}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (studentResponse.ok) {
        const student = await studentResponse.json();
        return student.firstName + " " + student.lastName;
      } else {
        const professorResponse = await fetch(
          SERVER_URL + `/professor/admin/${author_id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (professorResponse.ok) {
          const professor = await professorResponse.json();
          return professor.firstName + " " + professor.lastName;
        }
      }
    } catch (error) {
      console.error("Error fetching author name:", error);
      return "Unknown Author";
    }
  };

  useEffect(() => {
    fetchForum();
  }, []);

  const handleDelete = (id) => {
    const token = sessionStorage.getItem("access_token");

    if (window.confirm("Voulez-vous vraiment supprimer ce forum?")) {
      fetch(SERVER_URL + `/forum/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            setData((prevData) => prevData.filter((item) => item.id !== id));
          } else {
            console.error("Failed to delete item forum");
          }
        })
        .catch((error) => console.error("Error deleting item:", error));
    }
  };

  const handleEdit = (id, newData) => {
    const token = sessionStorage.getItem("access_token");

    fetch(SERVER_URL + `/forum/admin/${id}`, {
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
          console.error("Failed to edit item forum");
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
      title: "Probleme",
      dataIndex: "probleme",
      key: "probleme",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Author",
      dataIndex: "authorName", // Utilise authorName au lieu de author_id
      key: "authorName",
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
      <Modal
        title="Edit Record"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="probleme" label="Probleme">
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CrudForum;
