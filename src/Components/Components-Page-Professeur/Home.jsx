import { Card, Col, Input, Layout, Menu, Pagination, Row, theme } from "antd";
import React, { useEffect, useState } from "react";
import "../../Styles/SidebarProf2.css";
import { useApi } from "../../Utils/Api";
import { useAuth } from "../../Utils/AuthContext";
import { SERVER_URL } from "../../Utils/constantURL";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

function Home() {
    const {
        token: { colorBgContainer, borderRadiusLG },
    } = theme.useToken();
    const api = useApi();
    const { authData, logout } = useAuth();
    const [cours, setCours] = useState([]);
    const [filteredCours, setFilteredCours] = useState([]); // Cours filtrés
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(4);
    const [searchTerm, setSearchTerm] = useState(""); // État de la recherche
    const jwt_token = sessionStorage.getItem("access_token");

    const currentUser = authData.user;

    const fetchCourse = () => {
        fetch(`${SERVER_URL}/document/professor/${currentUser.id}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${jwt_token}`,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Connecting Error...");
                }
                if (response.status === 204) {
                    throw new Error("Aucun cours disponible");
                }
                return response.json();
            })
            .then((data) => {
                if (!data || data.length === 0) {
                    console.log("Aucun cours disponible");
                    setCours([]);
                } else {
                    setCours(data);
                    setFilteredCours(data); // Initialiser les cours filtrés avec tous les cours
                }
            })
            .catch((error) => {
                console.error("Erreur lors de la récupération : ", error.message);
                setCours([]);
            });
    };

    useEffect(() => {
        fetchCourse();
    }, []);

    // Fonction pour gérer le changement de page
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Fonction pour filtrer les cours en fonction de la recherche
    const handleSearch = (value) => {
        setSearchTerm(value);
        const filtered = cours.filter(
            (course) =>
                course.classeroomName.toLowerCase().includes(value.toLowerCase()) ||
                course.description.toLowerCase().includes(value.toLowerCase())
        );
        setFilteredCours(filtered);
    };

    const startIndex = (currentPage - 1) * pageSize;
    const currentCours = filteredCours.slice(startIndex, startIndex + pageSize);
    return (
        <Content
            style={{
                margin: "24px 16px 0",
                flex: 1,
            }}
        >
            <div
                style={{
                    padding: 24,
                    minHeight: "100vh",
                    background: colorBgContainer,
                    borderRadius: borderRadiusLG,
                }}
                className="search_course"
            >
                {/* Ajout du champ de recherche */}

                <Search
                    enterButton="recherche"
                    size="large"
                    allowClear
                    placeholder="Rechercher un cours"
                    onSearch={handleSearch}
                    onChange={(e) => handleSearch(e.target.value)}
                    style={{
                        width: "500px",
                        marginBottom: "20px",
                    }}
                />

                {filteredCours.length === 0 ? (
                    <h2 className="no-documents-message">
                        Vous n'avez encore pas de documents.
                    </h2>
                ) : (
                    <>
                        <Row gutter={[16, 16]}>
                            {currentCours.map((course) => (
                                <Col key={course.id} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        className="custom-course-card"
                                        title={
                                            <span className="course-title">
                                                {course.classeroomName}
                                            </span>
                                        }
                                        extra={
                                            <a
                                                href={`${SERVER_URL}/document/${encodeURIComponent(
                                                    course.url
                                                )}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="view-document-link"
                                            >
                                                Voir Document
                                            </a>
                                        }
                                        style={{ width: 300 }}
                                    >
                                        <p className="course-description">{course.description}</p>
                                        <p className="course-professor">
                                            Professeur: {course.professorName}
                                        </p>
                                        <iframe
                                            src={`${SERVER_URL}/cours/${course.url}`}
                                            style={{
                                                width: "100%",
                                                height: "300px",
                                                border: "none",
                                            }}
                                            title="PDF Viewer"
                                            className="course-iframe"
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>

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
        </Content>
    );
}

export default Home;
