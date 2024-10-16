import {
  AppstoreOutlined,
  EditOutlined,
  FileTextOutlined,
  HomeOutlined,
  LogoutOutlined,
  MailOutlined,
  MessageOutlined,
  PictureOutlined,
  PushpinOutlined,
  UserOutlined,
  WechatOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../_Styles/DashboardAdmin.css";
import CrudClasseL1 from "./Classes/CrudClasseL1.jsx";
import CrudClasseL2 from "./Classes/CrudClasseL2.jsx";
import CrudClasseL3 from "./Classes/CrudClasseL3.jsx";
import OldStudent from "./Classes/OldStudent.tsx";
import CrudTable from "./SendEmail.tsx";
import CrudForum from "./Forum/CrudForum.tsx";
import CrudMessageForum from "./Forum/CrudMessageForum.tsx";
import UploadPicture from "./Galleries/UploadPicture.js";
import CrudProfesseur from "./Professor/CrudProfesseur.tsx";
import UpdateAdmin from "./Professor/UpdateAdmin.js";
import ScreenText from "./text/ScreenText.tsx";
import UserSite from "./user/UserSite.tsx";
import { useApi } from "../../../Utils/Api.js";
import { useAuth } from "../../../Utils/AuthContext.js";
import SendEmail from "./SendEmail.tsx";

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashboardAdmin = () => {
  const api = useApi();
  const { logout } = useAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const [selectedCrud, setSelectedCrud] = useState(null);

  const handleMenuClick = ({ key }) => {
    setSelectedCrud(key);
  };

  // const handleLogout = () => {
  //   window.sessionStorage.clear();
  //   window.location.href = "/";
  // };

  // const handleLogout = async () => {
  //   try {
  //     const jwt = sessionStorage.getItem("access_token");

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
  const renderContent = () => {
    switch (selectedCrud) {
      case "etudiants":
        return <CrudTable />;
      case "professor":
        return <CrudProfesseur />;
      case "utilisateurs":
        return <UserSite />;
      case "student/niveau/1":
        return <CrudClasseL1 />;
      case "student/niveau/2":
        return <CrudClasseL2 />;
      case "student/niveau/3":
        return <CrudClasseL3 />;
      case "student/niveau/ancien":
        return <OldStudent />;
      case "crud-gallerie":
        return <UploadPicture />;
      case "crud-welcomeText":
        return <ScreenText />;
      case "Send-Email":
        return <SendEmail />;
      case "forum":
        return <CrudForum />;
      case "messageForum":
        return <CrudMessageForum />;
      case "crud-partenaires":
        return <CrudTable />;
      case "mon-profile":
        return <UpdateAdmin />;
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
          {/* <Menu.Item key="professor" icon={<HomeOutlined />}>
            <Link to="/professeur" style={{ textDecoration: "none" }}>
              Go to Professors
            </Link>
          </Menu.Item> */}
          <SubMenu key="classe" icon={<AppstoreOutlined />} title="Classes">
            <Menu.Item key="student/niveau/1">Licence1-2I</Menu.Item>
            <Menu.Item key="student/niveau/2">Licence2-2I</Menu.Item>
            <Menu.Item key="student/niveau/3">Licence3-2I</Menu.Item>
            <Menu.Item key="student/niveau/ancien">Anciens</Menu.Item>
          </SubMenu>
          <SubMenu key="professeur" icon={<UserOutlined />} title="Professeurs">
            <Menu.Item key="professor">Professeurs</Menu.Item>
          </SubMenu>
          <SubMenu
            key="utilisateurs"
            icon={<UserOutlined />}
            title="Utilisateurs"
          >
            <Menu.Item key="utilisateurs">Utilisateurs</Menu.Item>
          </SubMenu>
          <SubMenu key="gallerie" icon={<PictureOutlined />} title="Galleries">
            <Menu.Item key="crud-gallerie">Gallerie</Menu.Item>
          </SubMenu>
          <SubMenu
            key="welcomeText"
            icon={<FileTextOutlined />}
            title="Texte Ecran"
          >
            <Menu.Item key="crud-welcomeText">Text</Menu.Item>
          </SubMenu>
          <SubMenu key="module" icon={<MailOutlined />} title="Email">
            <Menu.Item key="Send-Email">Send Email</Menu.Item>
          </SubMenu>
          <SubMenu key="forum" icon={<MessageOutlined />} title="Forum">
            <Menu.Item key="forum">Forum</Menu.Item>
          </SubMenu>
          <SubMenu
            key="messageForum"
            icon={<WechatOutlined />}
            title="Messages Forum"
          >
            <Menu.Item key="messageForum">Messages Forum</Menu.Item>
          </SubMenu>
          <SubMenu
            key="partenaires"
            icon={<PushpinOutlined />}
            title="Partenaires"
          >
            <Menu.Item key="crud-partenaires">Nos Partenaires</Menu.Item>
          </SubMenu>
          <SubMenu
            key="authentification"
            icon={<UserOutlined />}
            title="Authentification"
          >
            <Menu.Item icon={<EditOutlined />} key="mon-profile">
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
