import React, { useState, useEffect } from "react";
import { Layout, Menu, theme } from "antd";
import "../_Styles/DashboardAdmin.css";
import {
  UserOutlined,
  VideoCameraOutlined,
  AppstoreOutlined,
  HomeOutlined,
  GoldOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import CrudTable from "./CrudTable.tsx";
import { SERVER_URL } from "../../../constantURL.js";
import CrudClasse from "./Classes/CrudClasse.tsx";
import CrudProfesseur from "./Professor/CrudProfesseur.tsx";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashboardAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedCrud, setSelectedCrud] = useState(null);

  const handleMenuClick = ({ key }) => {
    setSelectedCrud(key);
  };

  const renderContent = () => {
    switch (selectedCrud) {
      case "etudiants":
        return <CrudTable />;
      case "professor":
        return <CrudProfesseur />;
      case "student/niveau/1":
      case "student/niveau/2":
      case "student/niveau/3":
        return <CrudClasse />;
      case "crud-gallerie":
        return <CrudTable />;
      case "crud-module1":
        return <CrudTable />;
      case "crud-partenaires":
        return <CrudTable />;
      default:
        return "DashboardAdmin Content";
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" onClick={handleMenuClick}>
          <Menu.Item key="etudiants" icon={<HomeOutlined />}>
            <Link to="/" style={{ textDecoration: "none" }}>
              Go to Etudiants
            </Link>
          </Menu.Item>
          <Menu.Item key="professor" icon={<HomeOutlined />}>
            <Link to="/professeur" style={{ textDecoration: "none" }}>
              Go to Professors
            </Link>
          </Menu.Item>
          <SubMenu key="classe" icon={<AppstoreOutlined />} title="Classes">
            <Menu.Item key="student/niveau/1">Licence1-2I</Menu.Item>
            <Menu.Item key="student/niveau/2">Licence2-2I</Menu.Item>
            <Menu.Item key="student/niveau/3">Licence3-2I</Menu.Item>
          </SubMenu>
          <SubMenu key="professeur" icon={<UserOutlined />} title="Professeurs">
            <Menu.Item key="professor">Professeurs</Menu.Item>
          </SubMenu>
          <SubMenu
            key="gallerie"
            icon={<VideoCameraOutlined />}
            title="Galleries"
          >
            <Menu.Item key="crud-gallerie">Gallerie</Menu.Item>
          </SubMenu>
          <SubMenu key="module" icon={<VideoCameraOutlined />} title="Modules">
            <Menu.Item key="crud-module1">Modules</Menu.Item>
          </SubMenu>
          <SubMenu
            key="partenaires"
            icon={<GoldOutlined />}
            title="Partenaires"
          >
            <Menu.Item key="crud-partenaires">Nos Partenaires</Menu.Item>
          </SubMenu>
          <SubMenu
            key="authentification"
            icon={<GoldOutlined />}
            title="Authentification"
          >
            <Menu.Item key="mon-profile">Mon Profile</Menu.Item>
            <Menu.Item key="deconnexion">Deconnexion</Menu.Item>
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
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          ©{new Date().getFullYear()} Licence Ingénierie Informatique
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardAdmin;
