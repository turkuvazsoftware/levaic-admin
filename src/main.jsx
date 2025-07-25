import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

//store
import { Provider } from "react-redux";

//reducer
import { store } from "./store";

// scss
import "flatpickr/dist/flatpickr.css";
import "choices.js/public/assets/styles/choices.min.css";
import './assets/scss/levaic.scss'
import './assets/scss/custom.scss'
import './assets/scss/customizer.scss'
import './assets/scss/rtl.scss'

import { RouterProvider, createHashRouter } from 'react-router-dom';
import { IndexRouter } from './router/indexRouter';

const router = createHashRouter([...IndexRouter]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App> 
        <RouterProvider router={router}></RouterProvider>
      </App>
    </Provider>
  </React.StrictMode>,
)
