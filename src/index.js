import React from "react";
import ReactDOM from "react-dom/client";
//import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
//import {BiggerApp } from './App';
//import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
/*
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home /> ,
    errorElement: <ErrorPage />
    loader: homeLoader,
    action: homeAction,
    children: [
      {
        path: "register/:registerID"
        element: <Register />
        loader: registerLoader
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


*/
