import React from 'react';
import { Layout, Typography, Tabs, Card, Button } from 'antd';
import { SettingOutlined, ToolOutlined, HomeOutlined, CalendarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import ManageServices from './ManageServices';
import ServiceKindCrud from './ServiceKindCrud';

const { Header, Content, Footer } = Layout;
const { Title } = Typography;
const { TabPane } = Tabs;

function Administrator() {
  return (
    <Layout style={{ minHeight: '100vh', background: 'white !important' }}>
      <Header className="ant-layout-header">
        <Link to="/" className="header-brand">
          <ToolOutlined style={{ marginRight: '10px' }} />
          Digital Garage - Administration
        </Link>
        <div className="header-buttons">
          <Link to="/">
            <Button className="header-button" icon={<HomeOutlined />}>
              Home
            </Button>
          </Link>
          <Link to="/nav">
            <Button className="header-button" icon={<CalendarOutlined />}>
              Bookings
            </Button>
          </Link>
        </div>
      </Header>

      <Content style={{
        padding: '40px 20px',
        background: '#f5f5f5',
        minHeight: 'calc(100vh - 160px)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            background: 'white',
            borderRadius: '15px',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
            padding: '40px',
            border: '3px solid #e67e22'
          }}>
            <Title level={2} style={{ textAlign: 'center', color: '#2c3e50', marginBottom: '40px' }}>
              <SettingOutlined style={{ marginRight: '15px', color: '#e67e22' }} />
              Administration Panel
            </Title>

            <Tabs defaultActiveKey="1" size="large" centered>
              <TabPane
                tab={
                  <span>
                    <ToolOutlined />
                    Service Types
                  </span>
                }
                key="1"
              >
                <div style={{ padding: '20px 0' }}>
                  <ServiceKindCrud />
                </div>
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <CalendarOutlined />
                    Booking Management
                  </span>
                }
                key="2"
              >
                <div style={{ padding: '20px 0' }}>
                  <ManageServices />
                </div>
              </TabPane>
            </Tabs>
          </div>
        </div>
      </Content>

      <Footer className="ant-layout-footer">
        <div>
          ©2024 Garage Management System • Developed by Jorge Morais
        </div>
        <div style={{ marginTop: '10px', fontSize: '14px', opacity: 0.8 }}>
          🔧 Administration Area
        </div>
      </Footer>
    </Layout>
  );
}

export default Administrator;