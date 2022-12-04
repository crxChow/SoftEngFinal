import React from "react";
import { Nav, NavLink, NavMenu } from "./elements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
