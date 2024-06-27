import React from 'react';
import ReactDOM from 'react-dom/client'; 
import 'bootstrap/dist/css/bootstrap.css'
import "./assets/css/animate.min.css";
import "./assets/css/style.css";
import './assets/css/sidebar.css';
import './assets/css/progress.css';
import './assets/css/dropdownmenu.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './Redux/Store/Store'
import {Toaster} from "react-hot-toast";


const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
       <Provider store={store}>
            <App />
            </Provider>
            <Toaster position="bottom-center"/>
    </React.StrictMode>
);
