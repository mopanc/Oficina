import React from 'react';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom'
import ManageServices from './ManageServices'
import ServiceKindCrud from './ServiceKindCrud'

function Administrator() {

  return (
    <BrowserRouter>
      <div className="app">
        <ServiceKindCrud />
        <ManageServices />
      </div>
    </BrowserRouter>
  );
}

export default Administrator;