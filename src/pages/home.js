import React from "react";
import Navbar from "../comps/index";
import { Outlet } from "react-router-dom";

const Home = () => {
  return (
    <>
      <Navbar />
      <div id="details">
        <Outlet />
      </div>
    </>
  );
};

export default Home;
