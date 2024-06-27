import React from 'react';
import { ReadOutlined , UserOutlined, AppstoreOutlined } from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { Link, Outlet } from 'react-router-dom';
import logoL2i from '../../Assets/img/Logo-L2i.png';
import '../../Styles/SidebarProf2.css'

const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const SidebarProf2 = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

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
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >

        <Link to ='/professeur'>
            <img src={logoL2i} alt='LogoL2i' width={110} height={125} style={{ margin: '40px' }} />

        </Link>
        <div className="demo-logo-vertical" />
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']}>
          <Menu.Item key="4" icon={<AppstoreOutlined />}>
            <Link to="/professeur" style={{textDecoration:'none'}}>Mon Dashboard</Link>
          </Menu.Item>
          <SubMenu key="sub1" icon={<ReadOutlined  />} title="Mes Classes">
            <Menu.Item key="1">
              <Link to="classes/L1-2i" style={{textDecoration:'none'}}>L1-2i</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="classes/L2-2i" style={{textDecoration:'none'}}>L2-2i</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="classes/L3-2i" style={{textDecoration:'none'}}>L3-2i</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="sub2" icon={<UserOutlined />} title="Mon profile">
            <Menu.Item key="5">
              <Link to="connexion" style={{textDecoration:'none'}}>Connexion</Link>
            </Menu.Item>
            <Menu.Item key="6">
              <Link to="#" style={{textDecoration:'none'}}>Deconnexion</Link>
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
        <h3 style={{textAlign:'center'}}>
            <UserOutlined />
            Bonjour, Pr Youssou FAYE
        </h3>
        <Content
          style={{
            margin: '24px 16px 0',
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
            textAlign: 'center',
          }}
        >
          <h6>© 2024 - Licence Ingenierie informatique</h6>
        </Footer>
      </Layout>
    </Layout>
  );
};

export default SidebarProf2;
