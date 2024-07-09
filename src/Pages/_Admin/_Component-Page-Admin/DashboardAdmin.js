import React from 'react';
import { Layout, Menu, theme } from 'antd';
import '../_Styles/DashboardAdmin.css'
import {
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  AppstoreOutlined,
  HomeOutlined,
  GoldOutlined,
} from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const DashboardAdmin = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: '100vh'}}>
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
        <div className="demo-logo-vertical"  />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to="/" style={{ textDecoration: "none" }}>
              Go to Etudiants  
            </Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<HomeOutlined />}>
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
            <Menu.Item key="crud-compte-professeurs">Crud-Compte-Professeurs</Menu.Item>
          </SubMenu>
          <SubMenu key="gallerie" icon={<VideoCameraOutlined /> } title="Galleries">
            <Menu.Item key="crud-gallerie">Crud-Gallerie</Menu.Item>
          </SubMenu>
          <SubMenu key="partenaires" icon={<GoldOutlined />} title="Partenaires">
            <Menu.Item key="crud-partenaires">Crud-Partenaires</Menu.Item>
          </SubMenu>
          <SubMenu key="authentification" icon={<GoldOutlined />} title="Authentification">
            <Menu.Item key="connexion">Mon Profile</Menu.Item>
            <Menu.Item key="connexion">Deconnexion</Menu.Item>
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
            margin: '24px 16px 0',
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
            DashboardAdmin Content
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          ©{new Date().getFullYear()} Licence Ingénierie Informatique
        </Footer>
      </Layout>
    </Layout>
  );
};

export default DashboardAdmin;
