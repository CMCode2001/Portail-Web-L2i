import {
  AppstoreAddOutlined,
  EditOutlined,
  HomeFilled,
  LogoutOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import logoL2i from "../../Assets/img/Logo-L2i.png";
import "../../Styles/SidebarProf2.css";
import { useAuth } from "../../Utils/AuthContext";
import { useApi } from "../../Utils/Api";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SidebarProf2 = () => {
  const api = useApi();
  const { authData, logout } = useAuth();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Fonction pour gérer la déconnexion
  // const handleLogout = async () => {
  //   try {
  //     // const jwt = sessionStorage.getItem("access_token");
  //     const jwt = authData?.accessToken;

  //     if (!jwt) {
  //       console.error("Aucun token trouvé pour déconnexion.");
  //       return;
  //     }

  //     const response = await fetch(SERVER_URL + "/logout", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${jwt}`,
  //       },
  //     });

  //     // Si la requête échoue
  //     if (!response.ok) {
  //       console.error("Erreur lors de la déconnexion.");
  //       return;
  //     }

  //     // Si la requête réussit
  //     console.log("Déconnexion réussie.");

  //     // Nettoyer le stockage et rediriger l'utilisateur
  //     sessionStorage.clear();
  //     window.location.href = "/";
  //   } catch (error) {
  //     console.error("Erreur lors de la requête de déconnexion:", error);
  //   }
  // };

  // Fonction pour gérer la déconnexion
  const handleLogout = async () => {
    try {
      // Envoyer la requête de déconnexion avec les cookies (incluant le refresh token)
      const response = await api.post("/logout", null, {
        withCredentials: true,
      });

      if (response.status !== 200) {
        console.error("Erreur lors de la déconnexion.");
        return;
      }

      console.log("Déconnexion réussie.");
      logout(); // Appeler la fonction de déconnexion du contexte pour effacer les informations locales
      window.location.href = "/"; // Rediriger vers la page d'accueil après déconnexion
    } catch (error) {
      logout(); // En cas d'erreur, déconnecter quand même l'utilisateur localement
      window.location.href = "/";
      console.error("Erreur lors de la requête de déconnexion:", error);
    }
  };

  const currentUser = authData.user; // Récupérer l'utilisateur depuis le contexte

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="xl"
        collapsedWidth="100"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        style={{
          position: "fixed",
          left: 0,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/">
          <img
            src={logoL2i}
            alt="LogoL2i"
            width={110}
            height={125}
            style={{ margin: "40px" }}
          />
        </Link>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["4"]}>
          <Menu.Item icon={<HomeFilled />}>
            <Link
              to="/professeurlkmsdqkjdslk"
              style={{ textDecoration: "none" }}
            >
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
            <Menu.Item key="3">
              <Link to="classes/L3-2i" style={{ textDecoration: "none" }}>
                L3-2i
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item key="2" icon={<AppstoreAddOutlined />}>
            <Link to="ajouter-notes" style={{ textDecoration: "none" }}>
              Ajouter Notes
            </Link>
          </Menu.Item>
          {/* <SubMenu key="sub2" icon={<UserOutlined />} title=`Pr ${currentUser?.firstName}${" "} ${currentUser?.name}` > */}
          <SubMenu
            key="sub2"
            icon={<UserOutlined />}
            title={`${currentUser?.firstName?.charAt(0)}.${
              currentUser.lastName
            }`}
          >
            <Menu.Item key="5">
              <Link to="update-prof" style={{ textDecoration: "none" }}>
                <EditOutlined /> &nbsp; Modifier
              </Link>
            </Menu.Item>
            <Menu.Item key="6">
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
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            height: "0",
          }}
        />
        {/* <h3 style={{ textAlign: "center" }}>
          <br />
          <UserOutlined /> Bonjour, Pr {currentUser?.firstName}{" "}
          {currentUser?.name}
        </h3> */}
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
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          {/* <h6>© 2024 - Licence Ingénierie informatique</h6> */}
          <h6>
            © {new Date().getFullYear()} - Licence Ingénierie informatique
          </h6>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SidebarProf2;
