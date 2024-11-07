import React, { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  message,
  Modal,
  Pagination,
  Row,
  Typography,
} from "antd";
import { DownloadOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useApi } from "../../../../Utils/Api";
import { SERVER_URL } from "../../../../Utils/constantURL";

const { Search } = Input;

function CrudDocument() {
  const api = useApi();

  const [cours, setCours] = useState([]);
  const [filteredCours, setFilteredCours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handlePageChange = (page) => setCurrentPage(page);

  // Fetch cours
  const fetchCourse = useCallback(async () => {
    try {
      const response = await api.get(`/document`);
      setCours(response.data.reverse());
    } catch (error) {
      console.error("Error fetching documents professor:", error);
    }
  }, [api]);

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

  // Recherche de document
  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1); // Réinitialise la pagination lors de la recherche
  };

  const deleteDocument = async (documentId) => {
    try {
      await api.delete(`/document/admin/${documentId}`);
      message.success("Document supprimé avec succès.");
      setIsModalOpen(false);
      fetchCourse(); // Rafraîchit la liste des cours
    } catch (error) {
      message.error("Erreur lors de la suppression du document.");
      console.error("Erreur :", error);
    }
  };

  const showModal = (course) => {
    setSelectedDocument(course);
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedDocument(null);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentCours = filteredCours.slice(startIndex, startIndex + pageSize);

  return (
    <div style={{ padding: 24, minHeight: "100vh" }} className="search_course">
      <Search
        enterButton="Recherche"
        size="large"
        allowClear
        placeholder="Rechercher un cours"
        onSearch={handleSearch}
        onChange={(e) => handleSearch(e.target.value)}
        style={{ width: "400px", marginBottom: "20px" }}
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
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            {currentCours.map((course) => (
              <Col xs={24} sm={12} md={8} key={course.id}>
                <Card
                  hoverable
                  bordered
                  style={{
                    width: 300,
                    borderColor: "rgb(19,121,140)",
                    borderRadius: "10px",
                  }}
                  cover={
                    <div
                      style={{
                        height: 175,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: "#085867",
                        color: "white",
                        fontSize: "1.5rem",
                        fontWeight: "bold",
                      }}
                    >
                      {course.classroomName}
                    </div>
                  }
                  actions={[
                    <Button
                      type="primary"
                      icon={<DownloadOutlined />}
                      href={`${SERVER_URL}/cours/${encodeURIComponent(
                        course.url
                      )}`}
                      target="_blank"
                      block
                    >
                      Télécharger
                    </Button>,
                    <Button
                      type="primary"
                      danger
                      onClick={() => showModal(course)}
                      block
                    >
                      Supprimer
                    </Button>,
                  ]}
                >
                  <Card.Meta
                    title={
                      <Typography.Title level={5}>
                        {course.title}
                      </Typography.Title>
                    }
                    description={
                      <>
                        <Typography variant="h6" gutterBottom>
                          {course?.url.substring(
                            course?.url.indexOf("_") + 1
                          ) || course?.url}
                        </Typography>
                        <Divider style={{ borderColor: "rgb(19,121,140)" }} />
                        <p style={{ fontWeight: "bold", marginBottom: 8 }}>
                          Professeur : {course.professorName}
                        </p>
                        <p>
                          Niveau : {course.classroomName}
                          <br />
                          Date d'upload :{" "}
                          {new Date(course.creatAt).toLocaleDateString()}
                        </p>
                      </>
                    }
                  />
                </Card>
              </Col>
            ))}
          </Row>
          <Modal
            title="Supprimer le document"
            visible={isModalOpen}
            onOk={() => deleteDocument(selectedDocument.id)}
            onCancel={handleCancel}
            okText="Supprimer"
            okButtonProps={{ danger: true }}
          >
            <p>
              Voulez-vous vraiment supprimer le document{" "}
              {selectedDocument?.title} ?
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

export default CrudDocument;
