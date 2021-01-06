import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navigation from "./components/navbar";
import { Router } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <div style={{ flex: 1 }} className="content">
      <Navigation />
      <App />
    </div>


    <div className="text-center" style={{ marginBottom: '1rem' }}>
      Made with ❤️ by&nbsp;<a href="https://www.linkedin.com/in/milosz-milewski">Milosz Milewski</a>&nbsp;using React
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
