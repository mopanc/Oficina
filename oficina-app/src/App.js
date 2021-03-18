import React from 'react';
import { Form, Layout } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const { Content, Footer } = Layout;

function App() {

  return (
    <Layout className="site-layout">
      <Content style={{ margin: '0 16px' }}>
        <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
          Oficina.
        </div>
      </Content>
      <Footer style={{ textAlign: 'center' }}>©2021 Created by Jorge Morais</Footer>
    </Layout>
  );
}

export default App;
