import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import App from './App';
import Admin from './components/administrator/Administrator'
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Nav />
    <Switch>
      <Route path="/" exact={true} component={App} />
      <Route path="/administrators" component={Admin} />
    </Switch>
  </ BrowserRouter>
  , document.getElementById('root'));