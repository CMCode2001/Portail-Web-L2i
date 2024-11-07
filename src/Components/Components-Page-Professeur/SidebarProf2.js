import {
  AppstoreAddOutlined,
  EditOutlined,
  HomeFilled,
  LogoutOutlined,
  MailOutlined,
  ReadOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logoL2i from "../../Assets/img/Logo-L2i.png";
import "../../Styles/SidebarProf2.css";
import { useAuth } from "../../Utils/AuthContext";
import Licence12i from "./Classes/Licence12i";
import Licence22i from "./Classes/Licence22i";
import Licence32i from "./Classes/Licence32i";
import AjouterNotes from "./Classes/_NewsAdd/AjouterNotes";
import SendEmailClasse from "./Classes/SendEmailClasse";
import UpdateProf from "./Profiles/UpdateProf";
import { useApi } from "../../Utils/Api";
import CoursProfessor from "./CoursProfessor";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SidebarProf2 = () => {
  const api = useApi();
  const [selectedCrud, setSelectedCrud] = useState(null);
  const { logout } = useAuth();

  const handleMenuClick = ({ key }) => {
    setSelectedCrud(key);
  };

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

  const renderContent = () => {
    switch (selectedCrud) {
      case "coursPrfesseur":
        return <CoursProfessor />;
      case "professeur/classes/L1-2i":
        return <Licence12i />;
      case "professeur/classes/L2-2i":
        return <Licence22i />;
      case "professeur/classes/L3-2i":
        return <Licence32i />;
      case "ajouter-notes":
        return <AjouterNotes />;
      case "enoyerEmailClasse":
        return <SendEmailClasse />;
      case "update-prof":
        return <UpdateProf />;
      default:
        return <CoursProfessor />;
      // return "Espace professeur";
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ position: "fixed", left: 0, top: 0, bottom: 0 }}>
        <Link to="/">
          <img
            src={logoL2i}
            alt="LogoL2i"
            width={110}
            height={125}
            style={{ margin: "40px" }}
          />
        </Link>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          onClick={handleMenuClick}
        >
          <Menu.Item icon={<HomeFilled />} key="coursPrfesseur">
            Accueil
          </Menu.Item>
          <SubMenu icon={<ReadOutlined />} title="Mes Classes">
            <Menu.Item key="professeur/classes/L1-2i">L1-2i</Menu.Item>
            <Menu.Item key="professeur/classes/L2-2i">L2-2i</Menu.Item>
            <Menu.Item key="professeur/classes/L3-2i">L3-2i</Menu.Item>
          </SubMenu>
          {/* <SubMenu icon={<AppstoreAddOutlined />} title="Ajouter Notes"> */}
          <Menu.Item icon={<AppstoreAddOutlined />} key="ajouter-notes">
            Ajouter Notes
          </Menu.Item>
          {/* </SubMenu> */}
          {/* <SubMenu icon={<MailOutlined />} title="Envoyer Email"> */}
          <Menu.Item icon={<MailOutlined />} key="enoyerEmailClasse">
            Envoyer Email
          </Menu.Item>
          {/* </SubMenu> */}
          <SubMenu
            key="authentification"
            icon={<UserOutlined />}
            title="Authentification"
          >
            <Menu.Item key="update-prof" icon={<EditOutlined />}>
              Mon Profile
            </Menu.Item>
            <Menu.Item
              icon={<LogoutOutlined />}
              key="deconnexion"
              onClick={handleLogout}
            >
              Deconnexion
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>

      <Layout style={{ marginLeft: 200 }}>
        <Header style={{ padding: 0, height: 0 }} />
        <Content style={{ margin: "24px 16px 0", flex: 1 }}>
          {renderContent()}
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
