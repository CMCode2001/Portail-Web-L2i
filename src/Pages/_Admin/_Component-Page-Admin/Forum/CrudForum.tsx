// import React, { useState, useEffect, useCallback } from "react";
// import { Table, Button, Modal, Form, Input } from "antd";
// import { SERVER_URL } from "../../../../Utils/constantURL";
// import { useApi } from "../../../../Utils/Api";

// const CrudForum = () => {
//   const api = useApi();
//   const [data, setData] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentRecord, setCurrentRecord] = useState(null);
//   const [form] = Form.useForm();

//   const fetchForum = () => {
//     fetch(SERVER_URL + "/forum")
//       .then((response) => response.json())
//       .then((data) => {
//         const updatedData = data.map((item) => {
//           return fetchAuthorName(item.author_id).then((authorName) => {
//             return { ...item, authorName };
//           });
//         });
//         Promise.all(updatedData).then((results) => setData(results));
//       })
//       .catch((error) => console.error("Error fetching data forum:", error));
//   };

//   const fetchAuthorName = useCallback(
//     async (author_id) => {
//       try {
//         // Tentative de récupération du nom de l'étudiant
//         const studentResponse = await api.get(`/student/admin/${author_id}`);

//         if (studentResponse.status === 200) {
//           const student = studentResponse.data; // Récupération des données directement
//           return `${student.firstName} ${student.lastName}`;
//         } else {
//           // Tentative de récupération du nom du professeur
//           const professorResponse = await api.get(
//             `/professor/admin/${author_id}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`, // Ajout de l'en-tête d'authentification
//               },
//             }
//           );

//           if (professorResponse.status === 200) {
//             const professor = professorResponse.data; // Récupération des données directement
//             return `${professor.firstName} ${professor.lastName}`;
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching author name:", error);
//         return "Unknown Author"; // Valeur par défaut en cas d'erreur
//       }
//     },
//     [api]
//   );

//   useEffect(() => {
//     fetchForum();
//   }, [fetchForum]);

//   const handleDelete = async (id) => {
//     if (window.confirm("Voulez-vous vraiment supprimer ce forum?")) {
//       try {
//         const response = await api.delete(`/forum/${id}`);

//         if (response.status === 200) {
//           // Mettre à jour l'état en filtrant l'élément supprimé
//           setData((prevData) => prevData.filter((item) => item.id !== id));
//         } else {
//           console.error("Échec de la suppression de l'élément du forum");
//         }
//       } catch (error) {
//         console.error("Erreur lors de la suppression de l'élément:", error);
//       }
//     }
//   };

//   const handleEdit = async (id, newData) => {
//     try {
//       const response = await api.patch(`/forum/admin/${id}`, newData);

//       if (response.status === 200) {
//         setData((prevData) =>
//           prevData.map((item) =>
//             item.id === id ? { ...item, ...newData } : item
//           )
//         );
//       } else {
//         console.error("Échec de la modification de l'élément du forum");
//       }
//     } catch (error) {
//       console.error("Erreur lors de la modification de l'élément:", error);
//     }
//   };

//   const showEditModal = (record) => {
//     setCurrentRecord(record);
//     form.setFieldsValue(record);
//     setIsModalOpen(true);
//   };

//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         handleEdit(currentRecord.id, values);
//         setIsModalOpen(false);
//         setCurrentRecord(null);
//       })
//       .catch((info) => {
//         console.log("Validate Failed:", info);
//       });
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setCurrentRecord(null);
//   };

//   const columns = [
//     {
//       title: "Probleme",
//       dataIndex: "probleme",
//       key: "probleme",
//     },
//     {
//       title: "Description",
//       dataIndex: "description",
//       key: "description",
//     },
//     {
//       title: "Author",
//       dataIndex: "authorName", // Utilise authorName au lieu de author_id
//       key: "authorName",
//     },
//     {
//       title: "Action",
//       key: "action",
//       render: (_, record) => (
//         <span>
//           <Button
//             style={{ backgroundColor: "blue", color: "white" }}
//             onClick={() => showEditModal(record)}
//           >
//             Edit
//           </Button>
//           <Button
//             style={{ backgroundColor: "red", color: "white" }}
//             onClick={() => handleDelete(record.id)}
//           >
//             Delete
//           </Button>
//         </span>
//       ),
//     },
//   ];

//   return (
//     <>
//       <Table columns={columns} dataSource={data} rowKey="id" />
//       <Modal
//         title="Edit Record"
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form form={form} layout="vertical">
//           <Form.Item name="probleme" label="Probleme">
//             <Input />
//           </Form.Item>
//           <Form.Item name="description" label="Description">
//             <Input />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// };

// export default CrudForum;

import React, { useState, useEffect, useCallback } from "react";
import { Table, Button, Modal, Form, Input } from "antd";
import { SERVER_URL } from "../../../../Utils/constantURL";
import { useApi } from "../../../../Utils/Api";

const CrudForum = () => {
  const api = useApi();
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [form] = Form.useForm();

  const fetchAuthorName = useCallback(
    async (author_id) => {
      try {
        const studentResponse = await api.get(`/student/admin/${author_id}`);

        if (studentResponse.status === 200) {
          const student = studentResponse.data;
          return `${student.firstName} ${student.lastName}`;
        } else {
          const professorResponse = await api.get(
            `/professor/admin/${author_id}`
          );

          if (professorResponse.status === 200) {
            const professor = professorResponse.data;
            return `${professor.firstName} ${professor.lastName}`;
          }
        }
      } catch (error) {
        console.error("Error fetching author name:", error);
        return "Unknown Author";
      }
    },
    [api]
  );

  const fetchForum = useCallback(() => {
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
  }, [fetchAuthorName]);

  useEffect(() => {
    fetchForum();
  }, [fetchForum]);

  const handleDelete = async (id) => {
    if (window.confirm("Voulez-vous vraiment supprimer ce forum?")) {
      try {
        const response = await api.delete(`/forum/${id}`);

        if (response.status === 200) {
          setData((prevData) => prevData.filter((item) => item.id !== id));
        } else {
          console.error("Échec de la suppression de l'élément du forum");
        }
      } catch (error) {
        console.error("Erreur lors de la suppression de l'élément:", error);
      }
    }
  };

  const handleEdit = async (id, newData) => {
    try {
      const response = await api.patch(`/forum/admin/${id}`, newData);

      if (response.status === 200) {
        setData((prevData) =>
          prevData.map((item) =>
            item.id === id ? { ...item, ...newData } : item
          )
        );
      } else {
        console.error("Échec de la modification de l'élément du forum");
      }
    } catch (error) {
      console.error("Erreur lors de la modification de l'élément:", error);
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
      dataIndex: "authorName",
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
