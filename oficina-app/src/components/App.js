import { Layout, Menu, Breadcrumb } from 'antd';
import { Button } from 'antd';
import { DashboardOutlined, MailOutlined } from '@ant-design/icons';
import { useState } from 'react';
import './App.css';

const { Header, Content, Footer } = Layout;
const { SubMenu } = Menu;

function App () {
  const [collapsed, setCollapsed] = useState(false);

  return <Layout className="layout">
  <Header>

    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
      <Button type="primary" shape="round" icon={<MailOutlined />} style={{ margin: '0 50px' }} size={10}>
        Agendar Serviço
      </Button>
      <Button type="primary" shape="round" icon={<DashboardOutlined />} size={10}>
        Administração
      </Button>
    </Menu>
  </Header>
  <Content style={{ padding: '0 50px' }}>
    <Breadcrumb style={{ margin: '16px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
    <div className="site-layout-content">Content</div>
  </Content>
  <Footer style={{ textAlign: 'center' }}>Ant Design ©2021 Created by Ant UED</Footer>
</Layout>
}

export default App
