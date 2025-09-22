import React from 'react';
import { Layout, Card, Typography, Row, Col, Button } from 'antd';
import { CarOutlined, ToolOutlined, CalendarOutlined, TeamOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css';
import './App.css';
import { Link } from 'react-router-dom';

const { Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

function App() {
  const features = [
    {
      icon: <CalendarOutlined style={{ fontSize: '48px', color: '#e67e22' }} />,
      title: 'Online Booking',
      description: 'Easy and fast system to schedule your garage services'
    },
    {
      icon: <ToolOutlined style={{ fontSize: '48px', color: '#d35400' }} />,
      title: 'Service Management',
      description: 'Complete control over the types of services offered'
    },
    {
      icon: <span style={{ fontSize: '48px', color: '#f39c12' }}>🏎️</span>,
      title: 'Vehicle Registry',
      description: 'Complete history of interventions per vehicle'
    },
    {
      icon: <TeamOutlined style={{ fontSize: '48px', color: '#e67e22' }} />,
      title: 'Customer Management',
      description: 'Organized database of all customers'
    }
  ];

  return (
    <Layout className="site-layout">
      <Content style={{ padding: 0 }}>
        {/* Hero Banner Section */}
        <div
          style={{
            height: '70vh',
            background: `linear-gradient(
              rgba(0, 0, 0, 0.5),
              rgba(0, 0, 0, 0.3)
            ), url('https://img.freepik.com/fotos-gratis/trabalhador-de-servico-de-carro-muscular-reparando-o-veiculo_146671-19605.jpg?t=st=1758483453~exp=1758487053~hmac=e44275e54182a7e1f011b6d21dc26fb98fdffcbf6f12e47e5f761493c61dbeba&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          <div style={{ textAlign: 'center', color: 'white', zIndex: 2, padding: '0 20px' }}>
            <Title
              level={1}
              style={{
                color: 'white',
                fontSize: '64px',
                fontWeight: 'bold',
                marginBottom: '20px',
                textShadow: '3px 3px 6px rgba(0, 0, 0, 0.7)',
                animation: 'fadeIn 1.2s ease-out'
              }}
            >
              🏎️ DIGITAL GARAGE
            </Title>
            <Paragraph
              style={{
                color: 'white',
                fontSize: '24px',
                marginBottom: '30px',
                textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                fontWeight: '500',
                animation: 'fadeIn 1.4s ease-out'
              }}
            >
              The Future of Automotive Management is Here
            </Paragraph>
            <Paragraph
              style={{
                color: 'rgba(255, 255, 255, 0.9)',
                fontSize: '18px',
                marginBottom: '40px',
                textShadow: '1px 1px 3px rgba(0, 0, 0, 0.7)',
                maxWidth: '600px',
                margin: '0 auto 40px auto',
                animation: 'fadeIn 1.6s ease-out'
              }}
            >
              Transform your garage management with cutting-edge technology.
              Smart scheduling, efficient management and satisfied customers.
            </Paragraph>

            <div style={{ animation: 'fadeIn 1.8s ease-out' }}>
              <Link to="/nav">
                <Button
                  type="primary"
                  size="large"
                  style={{
                    marginRight: '20px',
                    padding: '0 40px',
                    height: '60px',
                    fontSize: '20px',
                    borderRadius: '30px',
                    background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
                    border: 'none',
                    boxShadow: '0 8px 25px rgba(255, 107, 107, 0.4)',
                    fontWeight: 'bold',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-3px)';
                    e.target.style.boxShadow = '0 12px 35px rgba(255, 107, 107, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 25px rgba(255, 107, 107, 0.4)';
                  }}
                >
                  🛠️ BOOK NOW
                </Button>
              </Link>
            </div>
          </div>

          {/* Scroll indicator */}
          <div style={{
            position: 'absolute',
            bottom: '30px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            animation: 'bounce 2s infinite',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '16px', marginBottom: '10px' }}>Explore More</div>
            <div style={{ fontSize: '24px' }}>⬇️</div>
          </div>
        </div>

        {/* Welcome Section */}
        <div className="main-content">
        <div className="welcome-section fade-in" style={{ marginTop: '0' }}>
          <Title className="welcome-title" style={{ fontSize: '42px' }}>
            🎯 Why Choose Digital Garage?
          </Title>
          <Paragraph className="welcome-subtitle">
            Cutting-Edge Technology for Exceptional Results
          </Paragraph>
          <Paragraph className="welcome-description">
            Our system revolutionizes how garages operate,
            providing maximum efficiency and total customer satisfaction.
          </Paragraph>
        </div>

        <div style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
          <Title level={2} style={{ textAlign: 'center', marginBottom: '50px', color: '#2c3e50' }}>
            Main Features
          </Title>
          <Row gutter={[32, 32]}>
            {features.map((feature, index) => (
              <Col xs={24} sm={12} lg={6} key={index}>
                <Card
                  className="modern-card fade-in"
                  style={{
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  hoverable
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  <div style={{ marginBottom: '20px' }}>
                    {feature.icon}
                  </div>
                  <Title level={4} style={{ color: '#2c3e50', marginBottom: '15px' }}>
                    {feature.title}
                  </Title>
                  <Paragraph style={{ color: '#666', lineHeight: '1.6' }}>
                    {feature.description}
                  </Paragraph>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        </div>
      </Content>

      <Footer className="ant-layout-footer">
        <div>
          ©2024 Garage Management System • Developed by Jorge Morais
        </div>
        <div style={{ marginTop: '10px', fontSize: '14px', opacity: 0.8 }}>
          🚀 Modernized with current technologies
        </div>
        <Link to="/administrators">
          <div style={{
            position: 'absolute',
            bottom: '10px',
            right: '20px',
            fontSize: '10px',
            opacity: '0.3',
            cursor: 'pointer',
            transition: 'opacity 0.3s ease'
          }}
          onMouseEnter={(e) => e.target.style.opacity = '0.7'}
          onMouseLeave={(e) => e.target.style.opacity = '0.3'}
          >
            ⚙️
          </div>
        </Link>
      </Footer>
    </Layout>
  );
}

export default App;
