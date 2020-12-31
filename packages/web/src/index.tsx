import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import {AppRoot} from "./AppRoot";
import {StateProvider} from "./application/Store";

ReactDOM.render(
  <React.StrictMode>
    <StateProvider>
      <AppRoot />
    </StateProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
