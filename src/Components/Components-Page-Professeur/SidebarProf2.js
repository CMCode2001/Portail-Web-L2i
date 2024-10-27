// import {
//   AppstoreAddOutlined,
//   DownloadOutlined,
//   EditOutlined,
//   HomeFilled,
//   InfoCircleOutlined,
//   LogoutOutlined,
//   ReadOutlined,
//   UserOutlined,
// } from "@ant-design/icons";
// import {
//   Button,
//   Card,
//   Col,
//   Divider,
//   Input,
//   Layout,
//   Menu,
//   Pagination,
//   Row,
//   theme,
//   Typography,
// } from "antd";
// import React, { useCallback, useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import logoL2i from "../../Assets/img/Logo-L2i.png";
// import "../../Styles/SidebarProf2.css";
// import { useApi } from "../../Utils/Api";
// import { useAuth } from "../../Utils/AuthContext";
// import { SERVER_URL } from "../../Utils/constantURL";

// const { Header, Content, Footer, Sider } = Layout;
// const { SubMenu } = Menu;
// const { Search } = Input;

// const SidebarProf2 = () => {
//   const {
//     token: { colorBgContainer, borderRadiusLG },
//   } = theme.useToken();
//   const api = useApi();
//   const { authData, logout } = useAuth();
//   const [cours, setCours] = useState([]);
//   // const [filteredCours, setFilteredCours] = useState([]); // Cours filtrés
//   const [currentPage, setCurrentPage] = useState(1);
//   const [pageSize] = useState(4);
//   const [searchTerm, setSearchTerm] = useState(""); // État de la recherche

//   const handleLogout = async () => {
//     try {
//       // Envoyer la requête de déconnexion avec les cookies (incluant le refresh token)
//       const response = await api.post("/logout", null, {
//         withCredentials: true,
//       });

//       if (response.status !== 200) {
//         console.error("Erreur lors de la déconnexion.");
//         return;
//       }

//       console.log("Déconnexion réussie.");
//       logout(); // Appeler la fonction de déconnexion du contexte pour effacer les informations locales
//       window.location.href = "/"; // Rediriger vers la page d'accueil après déconnexion
//     } catch (error) {
//       logout(); // En cas d'erreur, déconnecter quand même l'utilisateur localement
//       window.location.href = "/";
//       console.error("Erreur lors de la requête de déconnexion:", error);
//     }
//   };

//   const currentUser = authData.user;

//   const fetchCourse = useCallback(async () => {
//     try {
//       const response = await api.get(`/document/professor/${currentUser?.id}`);

//       // Traiter les données si la requête est réussie
//       setCours(response.data.reverse()); // Inverser l'ordre des données
//     } catch (error) {
//       console.error(
//         "Error fetching documents professor:",
//         error.response?.data || error.message
//       );
//     }
//   }, [api, currentUser?.id]);

//   useEffect(() => {
//     fetchCourse();
//   }, [fetchCourse]);

//   // Fonction pour gérer le changement de page
//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   // Fonction pour filtrer les cours en fonction de la recherche
//   const handleSearch = (value) => {
//     setSearchTerm(value);
//     const filtered = cours.filter(
//       (course) =>
//         course.classroomName.toLowerCase().includes(value.toLowerCase()) ||
//         course.description.toLowerCase().includes(value.toLowerCase())
//     );
//     // setFilteredCours(filtered);
//     cours(filtered);
//   };

//   const startIndex = (currentPage - 1) * pageSize;
//   const currentCours = cours.slice(startIndex, startIndex + pageSize);

//   return (
//     <Layout style={{ minHeight: "100vh" }}>
//       <Sider
//         breakpoint="xl"
//         collapsedWidth="100"
//         onBreakpoint={(broken) => {
//           console.log(broken);
//         }}
//         onCollapse={(collapsed, type) => {
//           console.log(collapsed, type);
//         }}
//         style={{
//           position: "fixed",
//           left: 0,
//           top: 0,
//           bottom: 0,
//           display: "flex",
//           flexDirection: "column",
//           alignItems: "center",
//         }}
//       >
//         <Link to="/professeur">
//           <img
//             src={logoL2i}
//             alt="LogoL2i"
//             width={110}
//             height={125}
//             style={{ margin: "40px" }}
//           />
//         </Link>
//         <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
//           <Menu.Item icon={<HomeFilled />}>
//             <Link to="/" style={{ textDecoration: "none" }}>
//               Accueil
//             </Link>
//           </Menu.Item>

//           <SubMenu icon={<ReadOutlined />} title="Mes Classes">
//             <Menu.Item>
//               <Link to="classes/L1-2i" style={{ textDecoration: "none" }}>
//                 L1-2i
//               </Link>
//             </Menu.Item>
//             <Menu.Item>
//               <Link to="classes/L2-2i" style={{ textDecoration: "none" }}>
//                 L2-2i
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="3">
//               <Link to="classes/L3-2i" style={{ textDecoration: "none" }}>
//                 L3-2i
//               </Link>
//             </Menu.Item>
//           </SubMenu>
//           <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
//             <Link to="ajouter-notes" style={{ textDecoration: "none" }}>
//               Ajouter Notes
//             </Link>
//           </Menu.Item>
//           <SubMenu
//             key="sub2"
//             icon={<UserOutlined />}
//             title={`${currentUser?.firstName?.charAt(0)}.${
//               currentUser.lastName
//             }`}
//           >
//             <Menu.Item key="5">
//               <Link to="update-prof" style={{ textDecoration: "none" }}>
//                 <EditOutlined /> &nbsp; Modifier
//               </Link>
//             </Menu.Item>
//             <Menu.Item key="6">
//               <Link
//                 to="#"
//                 style={{ textDecoration: "none" }}
//                 onClick={handleLogout}
//               >
//                 <LogoutOutlined /> &nbsp; Déconnexion
//               </Link>
//             </Menu.Item>
//           </SubMenu>
//         </Menu>
//       </Sider>

//       <Layout style={{ marginLeft: 200 }}>
//         <Header
//           style={{
//             padding: 0,
//             background: colorBgContainer,
//             height: "0",
//           }}
//         />
//         <Content
//           style={{
//             margin: "24px 16px 0",
//             flex: 1,
//           }}
//         >
//           <div
//             style={{
//               padding: 24,
//               minHeight: "100vh",
//               background: colorBgContainer,
//               borderRadius: borderRadiusLG,
//             }}
//             className="search_course"
//           >
//             {/* Ajout du champ de recherche */}

//             <Search
//               enterButton="recherche"
//               size="large"
//               allowClear
//               placeholder="Rechercher un cours"
//               onSearch={handleSearch}
//               onChange={(e) => handleSearch(e.target.value)}
//               style={{
//                 width: "500px",
//                 marginBottom: "20px",
//               }}
//             />
//             {cours.length === 0 ? (
//               <div style={{ textAlign: "center", marginTop: 16 }}>
//                 <Typography.Title level={4} type="secondary">
//                   Vous n'avez encore pas de documents.
//                 </Typography.Title>
//                 <InfoCircleOutlined
//                   style={{ fontSize: "32px", color: "#aaa" }}
//                 />
//               </div>
//             ) : (
//               <>
//                 <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
//                   {currentCours.map((course) => (
//                     <Col xs={24} sm={12} md={8} lg={6} key={course.id}>
//                       <Card
//                         hoverable
//                         bordered
//                         style={{
//                           width: 300,
//                           borderColor: "rgb(19,121,140)",
//                           borderRadius: "10px",
//                         }}
//                         cover={
//                           <div
//                             style={{
//                               height: 175,
//                               display: "flex",
//                               alignItems: "center",
//                               justifyContent: "center",
//                               backgroundColor: "#085867",
//                               color: "white",
//                               fontSize: "1.5rem",
//                               fontWeight: "bold",
//                             }}
//                           >
//                             {course.classroomName}
//                           </div>
//                         }
//                         actions={[
//                           <Button
//                             type="primary"
//                             icon={<DownloadOutlined />}
//                             href={`${SERVER_URL}/cours/${course?.url}`}
//                             target="_blank"
//                             block
//                           >
//                             Télécharger
//                           </Button>,
//                         ]}
//                       >
//                         <Card.Meta
//                           title={
//                             <Typography.Title
//                               level={5}
//                               style={{ marginBottom: 0 }}
//                             >
//                               {course.title}
//                             </Typography.Title>
//                           }
//                           description={
//                             <>
//                               <Divider
//                                 style={{ borderColor: "rgb(19,121,140)" }}
//                               />
//                               <p
//                                 style={{ fontWeight: "bold", marginBottom: 8 }}
//                               >
//                                 Professeur : {course.professorName}
//                               </p>
//                               <p>
//                                 Niveau : {course.classroomName}
//                                 <br />
//                                 Date d'upload :{" "}
//                                 {new Date(course.creatAt).toLocaleDateString()}
//                               </p>
//                             </>
//                           }
//                         />
//                       </Card>
//                     </Col>
//                   ))}
//                 </Row>
//                 <Pagination
//                   current={currentPage}
//                   total={cours.length}
//                   pageSize={pageSize}
//                   onChange={handlePageChange}
//                   style={{ marginTop: 20, textAlign: "center" }}
//                 />
//               </>
//             )}
//           </div>
//         </Content>
//         <Footer
//           style={{
//             textAlign: "center",
//           }}
//         >
//           <h6>
//             © {new Date().getFullYear()} - Licence Ingénierie informatique
//           </h6>
//         </Footer>
//       </Layout>
//     </Layout>
//   );
// };

// export default SidebarProf2;

import {
  AppstoreAddOutlined,
  DownloadOutlined,
  EditOutlined,
  HomeFilled,
  InfoCircleOutlined,
  LogoutOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Col,
  Divider,
  Input,
  Layout,
  Menu,
  Pagination,
  Row,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logoL2i from "../../Assets/img/Logo-L2i.png";
import "../../Styles/SidebarProf2.css";
import { useApi } from "../../Utils/Api";
import { useAuth } from "../../Utils/AuthContext";
import { SERVER_URL } from "../../Utils/constantURL";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
const { Search } = Input;

const SidebarProf2 = () => {
  const api = useApi();
  const { authData, logout } = useAuth();
  const [cours, setCours] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(3); // Afficher 3 cours par page
  const [searchTerm, setSearchTerm] = useState("");

  const currentUser = authData.user;

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

  const handleLogout = async () => {
    try {
      const response = await api.post("/logout", null, {
        withCredentials: true,
      });
      if (response.status === 200) {
        console.log("Déconnexion réussie.");
        logout();
        window.location.href = "/";
      } else {
        console.error("Erreur lors de la déconnexion.");
      }
    } catch (error) {
      console.error("Erreur lors de la requête de déconnexion:", error);
      logout();
      window.location.href = "/";
    }
  };

  const handlePageChange = (page) => setCurrentPage(page);

  const handleSearch = (value) => {
    setSearchTerm(value);
    const filtered = cours.filter(
      (course) =>
        course.classroomName.toLowerCase().includes(value.toLowerCase()) ||
        course.description.toLowerCase().includes(value.toLowerCase())
    );
    setCours(filtered);
  };

  const startIndex = (currentPage - 1) * pageSize;
  const currentCours = cours.slice(startIndex, startIndex + pageSize);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ position: "fixed", left: 0, top: 0, bottom: 0 }}>
        <Link to="/professeur">
          <img
            src={logoL2i}
            alt="LogoL2i"
            width={110}
            height={125}
            style={{ margin: "40px" }}
          />
        </Link>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item icon={<HomeFilled />}>
            <Link to="/" style={{ textDecoration: "none" }}>
              Accueil
            </Link>
          </Menu.Item>
          <SubMenu icon={<ReadOutlined />} title="Mes Classes">
            <Menu.Item>
              <Link to="classes/L1-2i" style={{ textDecoration: "none" }}>
                L1-2i
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="classes/L2-2i" style={{ textDecoration: "none" }}>
                L2-2i
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link to="classes/L3-2i" style={{ textDecoration: "none" }}>
                L3-2i
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item icon={<AppstoreAddOutlined />}>
            <Link to="ajouter-notes" style={{ textDecoration: "none" }}>
              Ajouter Notes
            </Link>
          </Menu.Item>
          <SubMenu
            icon={<UserOutlined />}
            title={`${currentUser?.firstName?.charAt(0)}.${
              currentUser.lastName
            }`}
          >
            <Menu.Item>
              <Link to="update-prof" style={{ textDecoration: "none" }}>
                <EditOutlined /> &nbsp; Modifier
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link
                to="#"
                style={{ textDecoration: "none" }}
                onClick={handleLogout}
              >
                <LogoutOutlined /> &nbsp; Déconnexion
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, height: 0 }} />
        <Content style={{ margin: "24px 16px 0", flex: 1 }}>
          <div
            style={{ padding: 24, minHeight: "100vh" }}
            className="search_course"
          >
            <Search
              enterButton="Recherche"
              size="large"
              allowClear
              placeholder="Rechercher un cours"
              onSearch={handleSearch}
              onChange={(e) => handleSearch(e.target.value)}
              style={{ width: "500px", marginBottom: "20px" }}
            />
            {cours.length === 0 ? (
              <div style={{ textAlign: "center", marginTop: 16 }}>
                <Typography.Title level={4} type="secondary">
                  Vous n'avez encore pas de documents.
                </Typography.Title>
                <InfoCircleOutlined
                  style={{ fontSize: "32px", color: "#aaa" }}
                />
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
                            type="default"
                            icon={<EditOutlined />}
                            href={"#"}
                            // target="_blank"
                            block
                          >
                            Edit
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
                              <Divider
                                style={{ borderColor: "rgb(19,121,140)" }}
                              />
                              <p
                                style={{ fontWeight: "bold", marginBottom: 8 }}
                              >
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
                <Pagination
                  current={currentPage}
                  total={cours.length}
                  pageSize={pageSize}
                  onChange={handlePageChange}
                  style={{ marginTop: 20, textAlign: "center" }}
                />
              </>
            )}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          <h6>
            © {new Date().getFullYear()} - Licence Ingénierie informatique
          </h6>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SidebarProf2;
