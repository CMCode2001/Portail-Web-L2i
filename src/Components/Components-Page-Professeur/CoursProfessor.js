// import React, { useCallback, useEffect, useState } from "react";
// import { useApi } from "../../Utils/Api";
// import { useAuth } from "../../Utils/AuthContext";
// import {
//   Button,
//   Card,
//   Col,
//   Divider,
//   Input,
//   message,
//   Modal,
//   Pagination,
//   Row,
//   Select,
//   Typography,
//   Upload,
// } from "antd";
// import {
//   DownloadOutlined,
//   EditOutlined,
//   InfoCircleOutlined,
//   UploadOutlined,
// } from "@ant-design/icons";
// import { SERVER_URL } from "../../Utils/constantURL";
// import { Option } from "antd/es/mentions";

// const { Search } = Input;

// function CoursProfessor() {
//   const api = useApi();
//   const { authData } = useAuth();
//   const currentUser = authData.user;

//   const [cours, setCours] = useState([]);
//   const [filteredCours, setFilteredCours] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(3);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isModalDeleteDocument, setIsModalDeleteDocument] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedDocument, setSelectedDocument] = useState(null);
//   const [newClassroom, setNewClassroom] = useState("");
//   const [newFile, setNewFile] = useState(null);

//   const handlePageChange = (page) => setCurrentPage(page);

//   // Fetch cours
//   const fetchCourse = useCallback(async () => {
//     try {
//       const response = await api.get(`/document/professor/${currentUser?.id}`);
//       setCours(response.data.reverse());
//     } catch (error) {
//       console.error("Error fetching documents professor:", error);
//     }
//   }, [api, currentUser?.id]);

//   useEffect(() => {
//     fetchCourse();
//   }, [fetchCourse]);

//   useEffect(() => {
//     const filtered = cours.filter(
//       (course) =>
//         course.classroomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         course.description.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredCours(filtered);
//   }, [searchTerm, cours]);

//   // Recherche de document
//   const handleSearch = (value) => {
//     setSearchTerm(value);
//     setCurrentPage(1); // Réinitialise la pagination lors de la recherche
//   };

//   const deleteDocument = async (documentId) => {
//     // if (window.confirm("Voulez-vous vraiment supprimer ce document ?")) {
//       try {
//         await api.delete(`/document/${documentId}`);
//         message.success("Document supprimé avec succès.");
//         setIsModalOpen(false);
//         fetchCourse(); // Rafraîchit la liste des cours
//       } catch (error) {
//         message.error("Erreur lors de la suppression du document.");
//         console.error("Erreur :", error);
//       }
//     // }
//   };

//   // Modal gestion
//   const showModal = (course) => {
//     setSelectedDocument(course);
//     setNewClassroom(course.classroomName);
//     setIsModalOpen(true);
//   };

//    // Madal de suppression decuments
//    const showModalDeleteDocument = (idDocument) => {
//      setIsModalDeleteDocument(true);
//     deleteDocument(idDocument);
//   };

//   const handleCancel = () => {
//     setIsModalOpen(false);
//     setSelectedDocument(null);
//     setNewClassroom("");
//     setNewFile(null);
//   };

//   // Mise à jour du document
//   const handleUpdate = async () => {
//     if (!selectedDocument || !newClassroom) {
//       message.error("Veuillez sélectionner une classe et un fichier.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append(
//       "document",
//       JSON.stringify({ classroomName: newClassroom })
//     );
//     if (newFile) formData.append("file", newFile);

//     try {
//       await api.put(`/document/${selectedDocument.id}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       message.success("Document mis à jour avec succès.");
//       setIsModalOpen(false);
//       fetchCourse(); // Actualiser les cours
//     } catch (error) {
//       message.error("Erreur lors de la mise à jour du document.");
//       console.error("Erreur :", error);
//     }
//   };

//   const startIndex = (currentPage - 1) * pageSize;
//   const currentCours = filteredCours.slice(startIndex, startIndex + pageSize);

//   return (
//     <div style={{ padding: 24, minHeight: "100vh" }} className="search_course">
//       <Search
//         enterButton="Recherche"
//         size="large"
//         allowClear
//         placeholder="Rechercher un cours"
//         onSearch={handleSearch}
//         onChange={(e) => handleSearch(e.target.value)}
//         style={{ width: "500px", marginBottom: "20px" }}
//       />
//       {filteredCours.length === 0 ? (
//         <div style={{ textAlign: "center", marginTop: 16 }}>
//           <Typography.Title level={4} type="secondary">
//             Vous n'avez encore pas de documents.
//           </Typography.Title>
//           <InfoCircleOutlined style={{ fontSize: "32px", color: "#aaa" }} />
//         </div>
//       ) : (
//         <>
//           <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
//             {currentCours.map((course) => (
//               <Col xs={24} sm={12} md={8} key={course.id}>
//                 <Card
//                   hoverable
//                   bordered
//                   style={{
//                     width: 300,
//                     borderColor: "rgb(19,121,140)",
//                     borderRadius: "10px",
//                   }}
//                   cover={
//                     <div
//                       style={{
//                         height: 175,
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                         backgroundColor: "#085867",
//                         color: "white",
//                         fontSize: "1.5rem",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {course.classroomName}
//                     </div>
//                   }
//                   actions={[
//                     <Button
//                       type="primary"
//                       icon={<DownloadOutlined />}
//                       href={`${SERVER_URL}/cours/${encodeURIComponent(
//                         course.url
//                       )}`}
//                       target="_blank"
//                       block
//                     >
//                       Télécharger
//                     </Button>,
//                     <Button
//                       type="default"
//                       icon={<EditOutlined />}
//                       onClick={() => showModal(course)}
//                       block
//                     >
//                       Edit
//                     </Button>,
//                   ]}
//                 >
//                   <Card.Meta
//                     title={
//                       <Typography.Title level={5}>
//                         {course.title}
//                       </Typography.Title>
//                     }
//                     description={
//                       <>
//                         <Typography variant="h6" gutterBottom>
//                           {course?.url.substring(
//                             course?.url.indexOf("_") + 1
//                           ) || course?.url}
//                         </Typography>
//                         <Divider style={{ borderColor: "rgb(19,121,140)" }} />
//                         <p style={{ fontWeight: "bold", marginBottom: 8 }}>
//                           Professeur : {course.professorName}
//                         </p>
//                         <p>
//                           Niveau : {course.classroomName}
//                           <br />
//                           Date d'upload :{" "}
//                           {new Date(course.creatAt).toLocaleDateString()}
//                         </p>
//                       </>
//                     }
//                   />
//                 </Card>
//               </Col>
//             ))}
//           </Row>
//           <Modal
//             title="Modifier le document"
//             visible={isModalOpen}
//             onOk={handleUpdate}
//             onCancel={handleCancel}
//           >
//             <Select
//               value={newClassroom}
//               onChange={(value) => setNewClassroom(value)}
//               style={{ width: "100%", marginBottom: "20px" }}
//             >
//               <Option value="LICENCE1">LICENCE1</Option>
//               <Option value="LICENCE2">LICENCE2</Option>
//               <Option value="LICENCE3">LICENCE3</Option>
//             </Select>

//             <Upload
//               beforeUpload={(file) => {
//                 setNewFile(file);
//                 return false;
//               }}
//               maxCount={1}
//               accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
//             >
//               <Button icon={<UploadOutlined />}>
//                 Sélectionner un nouveau fichier
//               </Button>
//             </Upload>

//             {/* Bouton de suppression */}
//             <Button
//               type="primary"
//               danger
//               block
//               style={{ marginTop: 20 }}
//               onClick={() => showModalDeleteDocument(selectedDocument.id)}
//             >
//               {/* Supprimer le document : {selectedDocument?.title} */}
//               Supprimer
//             </Button>
//           </Modal>

//           <Pagination
//             current={currentPage}
//             total={filteredCours.length}
//             pageSize={pageSize}
//             onChange={handlePageChange}
//             style={{ marginTop: 20, textAlign: "center" }}
//           />
//         </>
//       )}
//     </div>
//   );
// }

// export default CoursProfessor;

import React, { useCallback, useEffect, useState } from "react";
import { useApi } from "../../Utils/Api";
import { useAuth } from "../../Utils/AuthContext";
import {
  Button,
  Card,
  Col,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Select,
  Typography,
  Upload,
} from "antd";
import {
 
  FilePdfOutlined,
  InfoCircleOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { SERVER_URL } from "../../Utils/constantURL";
import { Option } from "antd/es/mentions";
import { CardActions, CardContent, CardMedia } from "@mui/material";
import {  Edit2Icon } from "lucide-react";
import './CoursProfessor.css'
import { DeleteOutline, PictureAsPdf, PictureAsPdfOutlined } from "@mui/icons-material";

const { Search } = Input;

function CoursProfessor() {
  const api = useApi();
  const { authData } = useAuth();
  const currentUser = authData.user;

  const [cours, setCours] = useState([]);
  const [filteredCours, setFilteredCours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteDocument, setIsModalDeleteDocument] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [newClassroom, setNewClassroom] = useState("");
  const [newFile, setNewFile] = useState(null);

  const handlePageChange = (page) => setCurrentPage(page);

  const fetchCourse = useCallback(async () => {
    try {
      const response = await api.get(`/document/professor/${currentUser?.id}`);
      setCours(response.data.reverse());
    } catch (error) {
      console.error("Error fetching documents professor:", error);
    }
  }, [api, currentUser?.id]);

  useEffect(() => {
    fetchCourse();
  }, [fetchCourse]);

  useEffect(() => {
    const filtered = cours.filter(
      (course) =>
        course.classroomName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCours(filtered);
  }, [searchTerm, cours]);

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const deleteDocument = async () => {
    if (selectedDocument) {
      try {
        await api.delete(`/document/${selectedDocument.id}`);
        message.success("Document supprimé avec succès.");
        setIsModalDeleteDocument(false);
        setIsModalOpen(false);
        fetchCourse();
      } catch (error) {
        message.error("Erreur lors de la suppression du document.");
        console.error("Erreur :", error);
      }
    }
  };

  const showModal = (course) => {
    setSelectedDocument(course);
    setNewClassroom(course.classroomName);
    setIsModalOpen(true);
  };

  const showModalDeleteDocument = (course) => {
    setSelectedDocument(course);
    setIsModalDeleteDocument(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
    setNewClassroom("");
    setNewFile(null);
  };

  const handleUpdate = async () => {
    if (!selectedDocument || !newClassroom) {
      message.error("Veuillez sélectionner une classe et un fichier.");
      return;
    }

    const formData = new FormData();
    formData.append(
      "document",
      JSON.stringify({ classroomName: newClassroom })
    );
    if (newFile) formData.append("file", newFile);

    try {
      await api.put(`/document/${selectedDocument.id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("Document mis à jour avec succès.");
      setIsModalOpen(false);
      fetchCourse();
    } catch (error) {
      message.error("Erreur lors de la mise à jour du document.");
      console.error("Erreur :", error);
    }
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentCours = filteredCours.slice(startIndex, startIndex + pageSize);

  return (
    <div style={{ padding: 24, minHeight: "100vh" }} className="search_course">
      <Search
        size="large"
        allowClear
        placeholder="Rechercher un cours"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: "428px", marginBottom: "20px"}}
      />
      {filteredCours.length === 0 ? (
        <div style={{ textAlign: "center", marginTop: 16 }}>
          <Typography.Title level={4} type="secondary">
            Vous n'avez encore pas de documents.
          </Typography.Title>
          <InfoCircleOutlined style={{ fontSize: "32px", color: "#aaa" }} />
        </div>
      ) : (
        <>
          <Row gutter={[8, 8]} style={{ marginTop: 16 }}>
            {currentCours.map((course) => (
              <Col xs={24} sm={14} md={8} key={course.id}>
                <Card
                    id="GridContainerY"
                    sx={{
                      height: "100%",
                      width: "300px",
                      display: "flex",
                      flexDirection: "column",
                      border: "solid 5px rgb(19,121,140)",
                      borderRadius: "35px",
                    }}
                  >
                    <CardMedia
                      component="div"
                      id="classroomNameCSS"
                      sx={{
                        height: 55,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "white",
                        fontSize: "2rem",
                        fontFamily: "Poppins",
                      }}
                    >
                      {course?.classroomName}
                    </CardMedia>

                    <CardContent sx={{ textAlign: "left" }}>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          fontSize: "16px",
                          marginBottom: "8px",
                        }}
                      >
                        {course?.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        sx={{
                          marginBottom: "8px",
                          fontFamily: "Poppins",
                          color: "rgba(0, 0, 0, 0.87)",
                        }}
                      >
                        <b>{course?.url.substring(course?.url.indexOf("_") + 1) || course?.url} </b>
                      </Typography>
                      <div className="blogCours"></div>
                      <Typography
                        sx={{
                          fontFamily: "Poppins",
                          fontWeight: "bold",
                          marginBottom: "8px",
                        }}
                      >
                        <b>Professeur : </b> {course?.professorName}
                      </Typography>

                      <Typography variant="body2" sx={{ marginBottom: "8px" }}>
                        <b>Niveau :</b> {course.classroomName}
                        <br />
                        <b>Date d'upload :</b>{" "}
                        {new Date(course?.creatAt).toLocaleDateString()}
                      </Typography>
                    </CardContent>

                    <CardActions>
                      <Button
                        id="downloadPDF"
                        variant="contained"
                        color="primary"
                        target="_blank"
                        href={`${SERVER_URL}/cours/${encodeURIComponent(course?.url)}`}
                        fullWidth
                      >
                        <PictureAsPdf/>
                        {/* Télécharger */}
                      </Button>
                      <Button
                        id="modifPDF"
                        variant="outlined"
                        color="secondary"
                        onClick={() => showModal(course)}
                        fullWidth
                      >
                        <Edit2Icon/>
                        {/* Editer */}
                      </Button>
                      <Button
                        id="deletePDF"
                        variant="contained"
                        color="error"
                        onClick={() => showModalDeleteDocument(course)}
                        fullWidth
                      >
                        <DeleteOutline/>
                        {/* Supprimer */}
                      </Button>
                    </CardActions>
                  </Card>
              </Col>
            ))}
          </Row>

          {/* Modal de modification */}
          <Modal
            title="Modifier le document"
            visible={isModalOpen}
            onOk={handleUpdate}
            onCancel={handleCancel}
          >
            <Select
              value={newClassroom}
              onChange={(value) => setNewClassroom(value)}
              style={{ width: "100%", marginBottom: "20px" }}
            >
              <Option value="LICENCE1">LICENCE1</Option>
              <Option value="LICENCE2">LICENCE2</Option>
              <Option value="LICENCE3">LICENCE3</Option>
            </Select>

            <Upload
              beforeUpload={(file) => {
                setNewFile(file);
                return false;
              }}
              maxCount={1}
              accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
            >
              <Button icon={<UploadOutlined />}>
                Sélectionner un nouveau fichier
              </Button>
            </Upload>
          </Modal>

          {/* Modal de confirmation de suppression */}
          <Modal
            title="Confirmer la suppression"
            visible={isModalDeleteDocument}
            onOk={deleteDocument}
            onCancel={() => setIsModalDeleteDocument(false)}
            okText="Oui, supprimer"
            cancelText="Annuler"
          >
            <p>
              Êtes-vous sûr de vouloir supprimer le document{" "}
              <strong>{selectedDocument?.title}</strong> ?
            </p>
          </Modal>

          <Pagination
            current={currentPage}
            total={filteredCours.length}
            pageSize={pageSize}
            onChange={handlePageChange}
            style={{ marginTop: 20, textAlign: "center" }}
          />
        </>
      )}
    </div>
  );
}

export default CoursProfessor;
