import {
  AppstoreOutlined,
  GoldOutlined,
  HomeOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import logoL2i from "../../Assets/img/Logo-L2i.png";
import "../../Styles/SidebarProf2.css";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SidebarProf2 = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
    // Fonction pour gérer la déconnexion
    const handleLogout = () => {
      // Logique de déconnexion ici (ex: effacer les informations de l'utilisateur)
      window.sessionStorage.clear();
      window.location.href = "/";
    };
  // Fonction pour récupérer et utiliser les informations de l'utilisateur
  const getUserInfo = () => {
    // Récupérer la chaîne JSON stockée dans sessionStorage
    const userJson = sessionStorage.getItem("user");

    if (userJson) {
      try {
        // Convertir la chaîne JSON en un objet JavaScript
        const user = JSON.parse(userJson);
        // Vous pouvez également retourner ou utiliser ces valeurs dans votre application
        return user;
      } catch (error) {
        console.error(
          "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
          error
        );
        // Vous pouvez gérer cette erreur, par exemple, en affichant un message d'erreur à l'utilisateur
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans le sessionStorage");
      // Gérer le cas où il n'y a pas d'utilisateur dans le sessionStorage
    }
  };
  const currentUser = getUserInfo();
  if (currentUser) {
    // Faire quelque chose avec les informations de l'utilisateur
    console.log("L'utilisateur actuel est:", currentUser);
  }
  return (
    <Layout>
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Link to="/professeur">
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
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/" style={{ textDecoration: "none" }}>
              Retour à l'accueil 
            </Link>
          </Menu.Item>
          <Menu.Item key="2" icon={ <ReadOutlined />}>
            <Link to="/mes-cours" style={{ textDecoration: "none" }}>
              Mes Cours 
            </Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<GoldOutlined />} title="Mes Classes">
            <Menu.Item key="3">
              <Link to="classes/L1-2i" style={{ textDecoration: "none" }}>
                L1-2i
              </Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="classes/L2-2i" style={{ textDecoration: "none" }}>
                L2-2i
              </Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="classes/L3-2i" style={{ textDecoration: "none" }}>
                L3-2i
              </Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="Mon profile">
            <Menu.Item key="6">
              <Link to="connexion" style={{ textDecoration: "none" }}>
                Modifier mes infos
              </Link>
            </Menu.Item>
            <Menu.Item key="7">
              <Link to="#" style={{ textDecoration: "none" }} onClick={handleLogout}>
                Deconnexion
              </Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>

      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <h3 style={{ textAlign: "center" }}>
          <UserOutlined /> Bonjour, Pr {currentUser.firstName}{" "}
          {currentUser.name}
        </h3>
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 467,
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
          <h6>© 2024 - Licence Ingenierie informatique</h6>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SidebarProf2;
