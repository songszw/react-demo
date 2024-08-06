import {Suspense} from "react";
import {RouterProvider} from "react-router-dom";

// import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
import {I18nextProvider} from "react-i18next";
import i18n from "@/i18n/i18n";
import './index.css'
import router from "@/router";
import 'antd/dist/reset.css'
import './common.less'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Suspense fallback={<div>Loading...</div>}>
    <I18nextProvider i18n={i18n}>
      <RouterProvider router={router} />
    </I18nextProvider>
  </Suspense>
  // <React.StrictMode>
  //   <I18nextProvider i18n={i18n}>
  //     <App />
  //   </I18nextProvider>
  // </React.StrictMode>,
)
