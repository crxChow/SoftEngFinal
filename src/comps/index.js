import React from "react";
import { Nav, NavLink, NavMenu } from "./elements";

const Navbar = () => {
  return (
    <>
      <Nav>
        <NavMenu>
          <NavLink to="/login">Login</NavLink>
        </NavMenu>
      </Nav>
    </>
  );
};

export default Navbar;
