import React from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import Home from "./pages/home";
import Login, {action as designerAction} from "./pages/login";
import Register from "./pages/register";
import ErrorPage from "./error-page.jsx";
import ListProjects from "./pages/listprojects";
import Designer from "./pages/designer";
import { Outlet, useOutletContext } from "react-router-dom";
import { Controller } from "./controller/controller.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
        action: designerAction,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "login/designer",
        element: <Designer />
      }
    ],
  },
]);

//console.log(model);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

