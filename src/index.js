import React from 'react';
import ReactDOM from "react-dom/client";
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import {store} from 'store';
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

if (process.env.NODE_ENV === 'production') {
    console.log = () => {}
    console.error = () => {}
    console.debug = () => {}
}


root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

