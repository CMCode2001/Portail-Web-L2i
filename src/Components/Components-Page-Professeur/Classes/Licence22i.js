// import {
//   CalendarOutlined,
//   DownloadOutlined,
//   SearchOutlined,
//   SendOutlined,
//   TeamOutlined,
// } from "@ant-design/icons";
// import {
//   Button,
//   Col,
//   Drawer,
//   Form,
//   Input,
//   Modal,
//   Row,
//   Space,
//   Table,
// } from "antd";
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import Highlighter from "react-highlight-words";
// import "../../../Styles/Professeur/Classes/Licence12i.css";
// import { SERVER_URL } from "../../../Utils/constantURL";
// import { useApi } from "../../../Utils/Api";
// import { useAuth } from "../../../Utils/AuthContext";

// const { TextArea } = Input;

// const data = [
//   {
//     key: "1",
//     prenom: "Cheikh Mbacke",
//     nom: "COLY",
//     email: "cm.c@zig.univ.sn",
//     cin: "202000142",
//   },
//   {
//     key: "1",
//     prenom: "Cheikh Mbacke",
//     nom: "COLY",
//     email: "cm.c@zig.univ.sn",
//     cin: "202000142",
//   },
//   {
//     key: "1",
//     prenom: "Cheikh Mbacke",
//     nom: "COLY",
//     email: "cm.c@zig.univ.sn",
//     cin: "202000142",
//   },
// ];

// const Licence22i = () => {
//   const [searchText, setSearchText] = useState("");
//   const [searchedColumn, setSearchedColumn] = useState("");

//   const [pdfContent, setFichier] = useState(null);
//   const [classroom, setClasseroom] = useState("");
//   const [etudant, setEtudiant] = useState([]);
//   const [open, setOpen] = useState(false);
//   const searchInput = useRef(null);
//   const [title, setTitre] = useState("");

//   const [titreDev, setTitreDev] = useState("");
//   const [descriptionDev, setDescriptionDev] = useState("");
//   const [salleDev, setSalleDev] = useState("");
//   const [dateDuDevoirDev, setDateDuDevoirDev] = useState("");
//   const [modalTitle, setModalTitle] = useState("");
//   const [isModalVisible, setIsModalVisible] = useState(false);
//   const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Pour le Drawer de programmation de devoir
//   const [isCourseDrawerVisible, setIsCourseDrawerVisible] = useState(false); // Pour le Drawer d'ajout de cours
//   const [isNotesDrawerVisible, setIsNotesDrawerVisible] = useState(false); // Pour le Drawer d'ajout de notes
//   const api = useApi();
//   const { authData } = useAuth();

//   const currentUser = authData?.user;

//   const showDrawerDevoir = () => {
//     setIsDrawerVisible(true);
//   };

//   const showDrawerCourse = () => {
//     setIsCourseDrawerVisible(true);
//   };

//   const showDrawerNotes = () => {
//     setIsNotesDrawerVisible(true);
//   };

//   const onClose = () => {
//     setOpen(false);
//     setIsDrawerVisible(false);
//     setIsCourseDrawerVisible(false);
//     setIsNotesDrawerVisible(false);
//   };

//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };

//   // const fetchEtudiant = () => {
//   //   fetch(`${SERVER_URL}/curentListStudent/niveau/LICENCE2`, {
//   //     method: "GET",
//   //     headers: {
//   //       Authorization: ` Bearer ${token}`,
//   //     },
//   //   })
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error("Network response was not ok");
//   //       }
//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       data.sort((a, b) => new Date(b.creatAt) - new Date(a.creatAt));
//   //       setEtudiant(data);
//   //     })
//   //     .catch((error) => console.error("Error fetching forum:", error));
//   // };

//   const fetchEtudiant = useCallback(async () => {
//     api
//       .get("/curentListStudent/niveau/LICENCE2") // Pas besoin de spécifier les headers ici
//       .then((response) => {
//         const data = response.data;
//         data.sort((a, b) => new Date(b.creatAt) - new Date(a.creatAt)); // Trier par date
//         setEtudiant(data); // Met à jour l'état avec les données triées
//       })
//       .catch((error) => {
//         console.error("Error fetching student data:", error);
//       });
//   }, [api]);

//   useEffect(() => {
//     fetchEtudiant();
//   }, [fetchEtudiant]);

//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText("");
//   };

//   // const annocerUnDevoir = () => {
//   //   const donnee = {
//   //     titre: titreDev,
//   //     description: descriptionDev,
//   //     salle: salleDev,
//   //     dateDuDevoir: dateDuDevoirDev,
//   //     classroomId: 2,
//   //     // professor_id: currentUser?.id,
//   //     createdBy: currentUser?.firstName + " " + currentUser?.lastName,
//   //   };

//   //   fetch(SERVER_URL + "/annonceDevoir", {
//   //     method: "POST",
//   //     headers: {
//   //       Authorization: ` Bearer ${token}`,
//   //       "Content-Type": "application/json",
//   //     },
//   //     body: JSON.stringify(donnee),
//   //   })
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error(response.status);
//   //       }
//   //       setModalTitle("Devoir annoncé avec succès");
//   //       setIsModalVisible(true);

//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       console.log("Course sent successfully:", data);
//   //     })
//   //     .catch((error) => console.error("Error sending course:", error));
//   // };

//   const annocerUnDevoir = () => {
//     const donnee = {
//       titre: titreDev,
//       description: descriptionDev,
//       salle: salleDev,
//       dateDuDevoir: dateDuDevoirDev,
//       classroomId: 2,
//       // professor_id: currentUser?.id,
//       createdBy: currentUser?.firstName + " " + currentUser?.lastName,
//     };

//     api
//       .post("/annonceDevoir", donnee) // Pas besoin des headers ici, ils sont déjà gérés dans api.js
//       .then((response) => {
//         setModalTitle("Devoir annoncé avec succès");
//         setIsModalVisible(true);
//         console.log("Course sent successfully:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error sending course:", error);
//       });
//   };

//   // const onSendingCourse = () => {
//   //   const donnee = {
//   //     title,
//   //     classroom_id: 2,
//   //     professor_id: currentUser?.id,
//   //     createdBy: currentUser?.firstName + " " + currentUser?.lastName,
//   //   };

//   //   const formatDonnee = new FormData();
//   //   formatDonnee.append("course", JSON.stringify(donnee));
//   //   formatDonnee.append("pdf", pdfContent);

//   //   fetch(SERVER_URL + "/course", {
//   //     method: "POST",
//   //     headers: {
//   //       Authorization: ` Bearer ${token}`,
//   //     },
//   //     body: formatDonnee,
//   //   })
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error(response.status);
//   //       }
//   //       setModalTitle("Cours envoyé avec succès");
//   //       setIsModalVisible(true);
//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       console.log("Course sent successfully:", data);
//   //     })
//   //     .catch((error) => console.error("Error sending course:", error));
//   // };

//   // Fonction pour récupérer et utiliser les informations de l'utilisateur

//   const onSendingCourse = () => {
//     const donnee = {
//       title,
//       classroom_id: 2,
//       professor_id: currentUser?.id,
//       createdBy: currentUser?.firstName + " " + currentUser?.lastName,
//     };

//     const formatDonnee = new FormData();
//     formatDonnee.append("course", JSON.stringify(donnee));
//     formatDonnee.append("pdf", pdfContent);

//     api
//       .post("/course", formatDonnee, {
//         headers: {
//           "Content-Type": "multipart/form-data", // Axios gère automatiquement les en-têtes pour FormData
//         },
//       })
//       .then((response) => {
//         setModalTitle("Cours envoyé avec succès");
//         setIsModalVisible(true);
//         console.log("Course sent successfully:", response.data);
//       })
//       .catch((error) => {
//         console.error("Error sending course:", error);
//       });
//   };

//   // const getUserInfo = () => {
//   //   // Récupérer la chaîne JSON stockée dans sessionStorage
//   //   const userJson = sessionStorage.getItem("user");

//   //   if (userJson) {
//   //     try {
//   //       // Convertir la chaîne JSON en un objet JavaScript
//   //       const user = JSON.parse(userJson);
//   //       // Vous pouvez également retourner ou utiliser ces valeurs dans votre application
//   //       return user;
//   //     } catch (error) {
//   //       console.error(
//   //         "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
//   //         error
//   //       );
//   //       // Vous pouvez gérer cette erreur, par exemple, en affichant un message d'erreur à l'utilisateur
//   //     }
//   //   } else {
//   //     console.warn("Aucun utilisateur trouvé dans le sessionStorage");
//   //     // Gérer le cas où il n'y a pas d'utilisateur dans le sessionStorage
//   //   }
//   // };

//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({
//       setSelectedKeys,
//       selectedKeys,
//       confirm,
//       clearFilters,
//       close,
//     }) => (
//       <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) =>
//             setSelectedKeys(e.target.value ? [e.target.value] : [])
//           }
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{ marginBottom: 8, display: "block" }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{ width: 90 }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({ closeDropdown: false });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex]
//         ? record[dataIndex]
//             .toString()
//             .toLowerCase()
//             .includes(value.toLowerCase())
//         : false,
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ""}
//         />
//       ) : (
//         text
//       ),
//   });

//   const columns = [
//     {
//       title: "INE",
//       dataIndex: "ine",
//       key: "ine",
//       width: "20%",
//       sorter: (a, b) => a.ine - b.ine,
//       sortDirections: ["ascend", "descend"],
//       ...getColumnSearchProps("ine"),
//     },
//     {
//       title: "Prénom",
//       dataIndex: "firstName",
//       key: "firstName",
//       sortDirections: ["ascend", "descend"],
//       sorter: (a, b) => a.firstName.localeCompare(b.firstName),
//       ...getColumnSearchProps("firstName"),
//     },
//     {
//       title: "Nom",
//       dataIndex: "lastName",
//       key: "lastName",
//       width: "20%",
//       sortDirections: ["ascend", "descend"],
//       sorter: (a, b) => a.lastName.localeCompare(b.lastName),
//       ...getColumnSearchProps("lastName"),
//     },
//     {
//       title: "Email",
//       dataIndex: "email",
//       key: "email",
//       width: "30%",
//       sortDirections: ["ascend", "descend"],
//       sorter: (a, b) => a.email.localeCompare(b.email),
//       ...getColumnSearchProps("email"),
//     },
//   ];
//   const showDrawer = () => {
//     setOpen(true);
//   };

//   const handleFileChange = (info) => {
//     let fileList = [...info.fileList];

//     // Limitez la liste des fichiers à 1 pour n'uploader qu'un seul fichier
//     fileList = fileList.slice(-1);

//     // Mettre à jour le state
//     setFichier(fileList);
//   };

//   const beforeUpload = (file) => {
//     // Limitez le type de fichier à PDF
//     const isPDF = file.type === "application/pdf";
//     if (!isPDF) {
//       console.log(`${file.name} n'est pas un fichier PDF valide.`);
//     }
//     return isPDF;
//   };

//   return (
//     <div id="samaDivContainer">
//       <Modal
//         // title="Cours envoyé avec succès"
//         title={modalTitle}
//         visible={isModalVisible}
//         onCancel={() => setIsModalVisible(false)}
//         width={800}
//         footer={[
//           <Button
//             key="ok"
//             onClick={() => setIsModalVisible(false)}
//             style={{ backgroundColor: "#008000", color: "white" }}
//           >
//             OK
//           </Button>,
//         ]}
//       ></Modal>

//       <div className="headerSection">
//         <h2 className="leftAlign">
//           <TeamOutlined />
//           Classe Licence 2-2i
//         </h2>
//         <Space className="rightAlign">
//           <Button
//             id="btnPro2"
//             type="primary"
//             icon={<CalendarOutlined />}
//             style={{ width: "13rem" }}
//             size="large"
//             onClick={showDrawerDevoir}
//           >
//             Programmer Devoir
//           </Button>
//           <br />
//           <br />
//           <br />

//           <Button
//             id="btnPro2"
//             type="primary"
//             icon={<DownloadOutlined />}
//             size="large"
//             onClick={showDrawerCourse}
//           >
//             Ajouter Cours
//           </Button>
//         </Space>
//       </div>
//       <div className="tableSection">
//         <h4 style={{ textAlign: "center" }}>Liste des etudiants</h4>
//         <Table columns={columns} dataSource={etudant} />
//       </div>

//       {/* Debut de l'annoce de devoir */}
//       {/* Programmer Devoir */}
//       <Drawer
//         title="Programmer un nouveau devoir"
//         width={720}
//         onClose={onClose}
//         open={isDrawerVisible}
//         bodyStyle={{ paddingBottom: 80 }}
//         extra={
//           <Space>
//             <Button
//               onClick={onClose}
//               style={{ backgroundColor: "#600622", color: "white" }}
//             >
//               Fermer
//             </Button>
//             <Button
//               style={{ backgroundColor: "#13798C", color: "white" }}
//               onClick={() => {
//                 onClose();
//                 annocerUnDevoir();
//                 // onSendingAssignment(); // Uncomment if needed
//               }}
//               type="primary"
//             >
//               Envoyer <SendOutlined />
//             </Button>
//           </Space>
//         }
//       >
//         <Form layout="vertical" hideRequiredMark>
//           <Row gutter={16}>
//             <Col span={17}>
//               <Form.Item
//                 style={{ fontWeight: "600" }}
//                 name="assignmentTitle"
//                 label="Titre du Devoir"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Veuillez entrer le titre du devoir",
//                   },
//                 ]}
//               >
//                 <Input
//                   placeholder="Veuillez entrer le titre du devoir"
//                   onChange={(e) => setTitreDev(e.target.value)}
//                 />
//               </Form.Item>
//             </Col>

//             <Col span={17}>
//               <Form.Item
//                 style={{ fontWeight: "600" }}
//                 label="Description"
//                 name="description"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Veuillez entrer la description du devoir",
//                   },
//                 ]}
//               >
//                 <TextArea
//                   onChange={(e) => setDescriptionDev(e.target.value)}
//                   rows={3}
//                   placeholder="Veuillez entrer la description du devoir"
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={17}>
//               <Form.Item
//                 style={{ fontWeight: "600" }}
//                 name="Salle"
//                 label="Salle du Devoir"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Veuillez entrer le lieu de salle du devoir",
//                   },
//                 ]}
//               >
//                 <Input
//                   placeholder="Veuillez entrer le lieu de salle du devoir"
//                   onChange={(e) => setSalleDev(e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//             <Col span={17}>
//               <Form.Item
//                 style={{ fontWeight: "600" }}
//                 name="dueDate"
//                 label="Date du Devoir"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Veuillez sélectionner une date d'échéance",
//                   },
//                 ]}
//               >
//                 <Input
//                   type="date"
//                   onChange={(e) => setDateDuDevoirDev(e.target.value)}
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Drawer>
//       {/* ======================== FIN PROGRAMMER DEVOIR ========================= */}

//       {/* Fin de l'annoce de devoir */}
//       {/* ==========================   AJOUTER COURS ============================= */}
//       <Drawer
//         title="Ajouter un nouveau cours"
//         width={720}
//         onClose={onClose}
//         open={isCourseDrawerVisible}
//         bodyStyle={{ paddingBottom: 80 }}
//         extra={
//           <Space>
//             <Button
//               onClick={onClose}
//               style={{ backgroundColor: "#600622", color: "white" }}
//             >
//               Fermer
//             </Button>
//             <Button
//               style={{ backgroundColor: "#13798C", color: "white" }}
//               onClick={() => {
//                 onClose();
//                 onSendingCourse();
//               }}
//               type="primary"
//             >
//               Envoyer <SendOutlined />
//             </Button>
//           </Space>
//         }
//       >
//         <Form layout="vertical" hideRequiredMark>
//           <Row gutter={16}>
//             <Col span={12}>
//               <Form.Item
//                 name="courseTitle"
//                 onChange={(e) => setTitre(e.target.value)}
//                 label="Titre du Cours (Intitulé)"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please enter the course title",
//                   },
//                 ]}
//               >
//                 <Input placeholder="Please enter the course title" />
//               </Form.Item>
//             </Col>
//           </Row>
//           <Row gutter={16}>
//             <Col span={24}>
//               <Form.Item
//                 name="pdf"
//                 label="PDF"
//                 rules={[
//                   {
//                     required: true,
//                     message: "Please upload the PDF file",
//                   },
//                 ]}
//               >
//                 <input
//                   className="custom-file-input"
//                   id="imageCouverture"
//                   onChange={(e) => setFichier(e.target.files[0])}
//                   type="file"
//                 />
//               </Form.Item>
//             </Col>
//           </Row>
//         </Form>
//       </Drawer>
//       {/* ==========================  FIN AJOUTER COURS ============================= */}
//     </div>
//   );
// };

// export default Licence22i;

import {
  CalendarOutlined,
  DownloadOutlined,
  SearchOutlined,
  SendOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import {
  Button,
  Col,
  Drawer,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Table,
  TimePicker,
} from "antd";
import React, { useCallback, useEffect, useRef, useState } from "react";
import Highlighter from "react-highlight-words";
import "../../../Styles/Professeur/Classes/Licence12i.css";
import { useApi } from "../../../Utils/Api";
import { useAuth } from "../../../Utils/AuthContext";

const { TextArea } = Input;

const Licence22i = () => {
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [title, setTitre] = useState("");
  const [etudant, setEtudiant] = useState([]);
  const [open, setOpen] = useState(false);
  const searchInput = useRef(null);
  const [titreDev, setTitreDev] = useState("");
  const [descriptionDev, setDescriptionDev] = useState("");
  const [salleDev, setSalleDev] = useState("");
  const [dateDuDevoir, setDateDuDevoir] = useState("");
  const [heureDuDevoir, setHeureDuDevoir] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDrawerVisible, setIsDrawerVisible] = useState(false); // Pour le Drawer de programmation de devoir
  const [isCourseDrawerVisible, setIsCourseDrawerVisible] = useState(false); // Pour le Drawer d'ajout de cours
  const [isNotesDrawerVisible, setIsNotesDrawerVisible] = useState(false); // Pour le Drawer d'ajout de notes
  const { authData } = useAuth();
  const api = useApi();
  const [files, setFiles] = useState([]);

  const onFileChange = (e) => {
    setFiles(e.target.files);
  };

  const currentUser = authData?.user;

  const showDrawerDevoir = () => {
    setIsDrawerVisible(true);
  };

  const showDrawerCourse = () => {
    setIsCourseDrawerVisible(true);
  };

  const onClose = () => {
    setOpen(false);
    setIsDrawerVisible(false);
    setIsCourseDrawerVisible(false);
    setIsNotesDrawerVisible(false);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const fetchEtudiant = useCallback(async () => {
    api
      .get("/curentListStudent/niveau/LICENCE2")
      .then((response) => {
        const data = response.data;
        data.sort((a, b) => {
          // Comparer les lastName
          if (a.lastName.toLowerCase() < b.lastName.toLowerCase()) return -1;
          if (a.lastName.toLowerCase() > b.lastName.toLowerCase()) return 1;
          // Si les lastName sont identiques, comparer les firstName
          if (a.firstName.toLowerCase() < b.firstName.toLowerCase()) return -1;
          if (a.firstName.toLowerCase() > b.firstName.toLowerCase()) return 1;
          return 0;
        });
        setEtudiant(data); // Mettre à jour l'état avec les données triées
      })
      .catch((error) => console.error("Error fetching student data:", error));
  }, [api]);

  useEffect(() => {
    fetchEtudiant();
  }, [fetchEtudiant]);

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const annocerUnDevoir = () => {
    const donnee = {
      titre: titreDev,
      professorName: currentUser?.firstName + " " + currentUser?.lastName,
      description: descriptionDev,
      salle: salleDev,
      heureDuDevoir: heureDuDevoir,
      dateDuDevoir: dateDuDevoir,
      classroomId: 2,
      createdBy: currentUser?.firstName + " " + currentUser?.lastName,
    };

    api
      .post("/annonceDevoir", donnee)
      .then((response) => {
        setModalTitle("Devoir annoncé avec succès");
        setIsModalVisible(true);
        console.log("Course sent successfully:", response.data); // Axios renvoie directement response.data
      })
      .catch((error) => {
        console.error("Error sending course:", error);
      });
  };

  const onSendingCourse = async () => {
    const donnee = {
      title,
      classroom_id: 2, // Exemple d'ID de classe (ajustez selon vos besoins)
      professor_id: currentUser?.id,
      createdBy: `${currentUser?.firstName} ${currentUser?.lastName}`,
    };

    const formData = new FormData();
    formData.append("course", JSON.stringify(donnee));
    for (let i = 0; i < files.length; i++) {
      formData.append("documents", files[i]);
    }

    try {
      const response = await api.post("/course/documents", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setModalTitle("Cours envoyé avec succès");
      setIsModalVisible(true);
      console.log("Course sent successfully:", response.data);
    } catch (error) {
      console.error("Error sending course:", error);
      setModalTitle("Erreur lors de l'envoi du cours");
      setIsModalVisible(true);
    }
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1677ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : false,
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text || ""
      ),
  });

  const columns = [
    // {
    //   title: "N°",
    //   key: "index",
    //   width: "10%",
    //   render: (_, __, index) => (
    //     <div
    //       style={{
    //         // backgroundColor: "#f0f0f0", // Couleur de fond gris clair
    //         textAlign: "center",
    //         fontWeight: "bold",
    //       }}
    //     >
    //       {index + 1}
    //     </div>
    //   ),
    // },
    {
      title: "INE",
      dataIndex: "ine",
      key: "ine",
      width: "20%",
      sorter: (a, b) => a.ine - b.ine,
      sortDirections: ["ascend", "descend"],
      ...getColumnSearchProps("ine"),
    },
    {
      title: "Prénom",
      dataIndex: "firstName",
      key: "firstName",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      ...getColumnSearchProps("firstName"),
    },
    {
      title: "Nom",
      dataIndex: "lastName",
      key: "lastName",
      width: "20%",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
      ...getColumnSearchProps("lastName"),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: "30%",
      sortDirections: ["ascend", "descend"],
      sorter: (a, b) => a.email.localeCompare(b.email),
      ...getColumnSearchProps("email"),
    },
  ];

  return (
    <div id="samaDivContainer">
      <Modal
        // title="Cours envoyé avec succès"
        title={modalTitle}
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        footer={[
          <Button
            key="ok"
            onClick={() => setIsModalVisible(false)}
            style={{ backgroundColor: "#008000", color: "white" }}
          >
            OK
          </Button>,
        ]}
      ></Modal>
      <div className="headerSection">
        <h2 className="leftAlign">
          <TeamOutlined />
          Classe Licence 2-2i
        </h2>
        <Space className="rightAlign">
          <Button
            id="btnPro2"
            type="primary"
            icon={<CalendarOutlined />}
            style={{ width: "13rem" }}
            size="large"
            onClick={showDrawerDevoir}
          >
            Programmer Devoir
          </Button>
          <br />
          <br />
          <br />

          <Button
            id="btnPro2"
            type="primary"
            icon={<DownloadOutlined />}
            size="large"
            onClick={showDrawerCourse}
          >
            Ajouter Cours
          </Button>
        </Space>
      </div>
      <div className="tableSection">
        <h4 style={{ textAlign: "center" }}>Liste des etudiants</h4>
        <Table columns={columns} dataSource={etudant} />
      </div>
      {/* Debut d'annoce de devoir */}
      {/* Programmer Devoir */}
      <Drawer
        title="Programmer un nouveau devoir"
        width={720}
        onClose={onClose}
        open={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              onClick={onClose}
              style={{ backgroundColor: "#600622", color: "white" }}
            >
              Fermer
            </Button>
            <Button
              style={{ backgroundColor: "#13798C", color: "white" }}
              onClick={() => {
                onClose();
                annocerUnDevoir();
                // onSendingAssignment(); // Uncomment if needed
              }}
              type="primary"
            >
              Envoyer <SendOutlined />
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={17}>
              <Form.Item
                style={{ fontWeight: "600" }}
                name="assignmentTitle"
                label="Titre du Devoir"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer le titre du devoir",
                  },
                ]}
              >
                <Input
                  placeholder="Veuillez entrer le titre du devoir"
                  onChange={(e) => setTitreDev(e.target.value)}
                />
              </Form.Item>
            </Col>

            <Col span={17}>
              <Form.Item
                style={{ fontWeight: "600" }}
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer la description du devoir",
                  },
                ]}
              >
                <TextArea
                  onChange={(e) => setDescriptionDev(e.target.value)}
                  rows={3}
                  placeholder="Veuillez entrer la description du devoir"
                />
              </Form.Item>
            </Col>
            <Col span={17}>
              <Form.Item
                style={{ fontWeight: "600" }}
                name="Salle"
                label="Salle du Devoir"
                rules={[
                  {
                    required: true,
                    message: "Veuillez entrer le lieu de salle du devoir",
                  },
                ]}
              >
                <Input
                  placeholder="Veuillez entrer le lieu de salle du devoir"
                  onChange={(e) => setSalleDev(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={17}>
              <Form.Item
                style={{ fontWeight: "600" }}
                name="dueDate"
                label="Date du Devoir"
                rules={[
                  {
                    required: true,
                    message: "Veuillez sélectionner une date d'échéance",
                  },
                ]}
              >
                <Input
                  type="date"
                  onChange={(e) => setDateDuDevoir(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                style={{ fontWeight: "600" }}
                name="heureDevoir"
                label="Heure du Devoir"
                rules={[
                  {
                    required: true,
                    message: "Veuillez sélectionner une heure d'échéance",
                  },
                ]}
              >
                <TimePicker
                  style={{ width: "100%" }}
                  format="HH:mm" // Format de l'heure, par exemple "14:30"
                  onChange={(time, timeString) => setHeureDuDevoir(timeString)}
                  // defaultOpenValue={moment("00:00", "HH:mm")} // Valeur initiale
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      {/* ======================== FIN PROGRAMMER DEVOIR ========================= */}
      {/* Fin d'annoce de devoir */}
      {/* ==========================   AJOUTER COURS ============================= */}
      <Drawer
        title="Ajouter un nouveau cours"
        width={720}
        onClose={onClose}
        open={isCourseDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        extra={
          <Space>
            <Button
              onClick={onClose}
              style={{ backgroundColor: "#600622", color: "white" }}
            >
              Fermer
            </Button>
            <Button
              style={{ backgroundColor: "#13798C", color: "white" }}
              onClick={() => {
                onClose();
                onSendingCourse();
              }}
              type="primary"
            >
              Envoyer <SendOutlined />
            </Button>
          </Space>
        }
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="courseTitle"
                onChange={(e) => setTitre(e.target.value)}
                label="Titre du Cours (Intitulé)"
                rules={[
                  {
                    required: true,
                    message: "Please enter the course title",
                  },
                ]}
              >
                <Input placeholder="Please enter the course title" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="documents"
                label="Documents (PDF, Word, etc.)"
                rules={[
                  {
                    required: true,
                    message: "Please upload at least one document",
                  },
                ]}
              >
                <input
                  type="file"
                  // accept=".pdf, .doc, .docx, .ppt, .pptx, .txt"
                  accept=".pdf, .doc, .docx, .ppt, .txt"
                  multiple
                  onChange={onFileChange}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Drawer>
      {/* ==========================  FIN AJOUTER COURS ============================= */}{" "}
    </div>
  );
};

export default Licence22i;
