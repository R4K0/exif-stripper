import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Navigation from "./components/navbar";

ReactDOM.render(
  <React.StrictMode>
    <div style={{ flex: 1 }} className="content">
      <Navigation />
      <App />
    </div>

    {/* This took a few hacks, it is a "sticky" footer - Meaning it is always at the bottom of the page AND after all content has scrolled.
    React does something differently so I had do take a different approach to this than usually*/}
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
