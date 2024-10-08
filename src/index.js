// import React from 'react';
// import ReactDOM from 'react-dom';
// import { createRoot } from 'react-dom/client';
// import './index.scss';
// import App from './container';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   // document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();



import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './container'
import reportWebVitals from './reportWebVitals'
// import store from './store';
// import { Provider } from 'react-redux';
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <Provider store={store}>
      <App />
  // </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();