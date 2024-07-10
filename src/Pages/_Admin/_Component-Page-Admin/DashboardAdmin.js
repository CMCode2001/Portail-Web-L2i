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
import CrudTable from "./CrudTable.tsx"; // Assurez-vous que le chemin est correct

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashboardAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedCrud, setSelectedCrud] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (selectedCrud) {
      // Fetch data from the back-end based on the selectedCrud
      fetch(`/api/${selectedCrud}`)
        .then((response) => response.json())
        .then((data) => setData(data))
        .catch((error) => console.error("Error fetching data:", error));
    }
  }, [selectedCrud]);

  const handleMenuClick = ({ key }) => {
    setSelectedCrud(key);
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
          <Menu.Item key="professeurs" icon={<HomeOutlined />}>
            <Link to="/professeur" style={{ textDecoration: "none" }}>
              Go to Professors
            </Link>
          </Menu.Item>
          <SubMenu key="classe" icon={<AppstoreOutlined />} title="Classes">
            <Menu.Item key="crud-l1">Crud-L1</Menu.Item>
            <Menu.Item key="crud-l2">Crud-L2</Menu.Item>
            <Menu.Item key="crud-l3">Crud-L3</Menu.Item>
          </SubMenu>
          <SubMenu key="professeur" icon={<UserOutlined />} title="Professeurs">
            <Menu.Item key="crud-compte-professeurs">
              Crud-Compte-Professeurs
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="gallerie"
            icon={<VideoCameraOutlined />}
            title="Galleries"
          >
            <Menu.Item key="crud-gallerie">Crud-Gallerie</Menu.Item>
          </SubMenu>
          <SubMenu key="module" icon={<VideoCameraOutlined />} title="Modules">
            <Menu.Item key="crud-module1">Crud-Module</Menu.Item>
          </SubMenu>
          <SubMenu
            key="partenaires"
            icon={<GoldOutlined />}
            title="Partenaires"
          >
            <Menu.Item key="crud-partenaires">Crud-Partenaires</Menu.Item>
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
            {selectedCrud ? (
              <CrudTable data={data} />
            ) : (
              "DashboardAdmin Content"
            )}
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
