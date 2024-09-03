import {
  AppstoreAddOutlined,
  AppstoreOutlined,
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

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SidebarProf2 = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    window.sessionStorage.clear();
    window.location.href = "/";
  };

  // Fonction pour récupérer et utiliser les informations de l'utilisateur
  const getUserInfo = () => {
    const userJson = sessionStorage.getItem("user");
    if (userJson) {
      try {
        const user = JSON.parse(userJson);
        return user;
      } catch (error) {
        console.error(
          "Erreur lors de l'analyse de l'utilisateur depuis le sessionStorage:",
          error
        );
      }
    } else {
      console.warn("Aucun utilisateur trouvé dans le sessionStorage");
    }
  };

  const currentUser = getUserInfo();

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
          <SubMenu key="sub2" icon={<UserOutlined />} title="Mon profile">
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
        <h3 style={{ textAlign: "center" }}>
          <br />
          <UserOutlined /> Bonjour, Pr {currentUser?.firstName}{" "}
          {currentUser?.name}
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
