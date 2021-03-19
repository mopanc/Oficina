import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './components/Nav';
import Routes from './Routes'
import './App.css';
import 'antd/dist/antd.css';
import { BrowserRouter, Switch, Route } from 'react-router-dom'

ReactDOM.render(
  <BrowserRouter>
    <Nav />
    <Routes />
  </ BrowserRouter>
  , document.getElementById('root'));
