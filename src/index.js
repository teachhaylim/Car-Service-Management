import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import "./assets/styles/index.scss";
import './i18n';
import 'react-perfect-scrollbar/dist/css/styles.css';
import 'react-toastify/dist/ReactToastify.css';

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), document.getElementById('root'));