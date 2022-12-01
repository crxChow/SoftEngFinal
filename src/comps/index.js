import React from "react";
import { Nav, NavLink, NavMenu }
	from "./elements";

const Navbar = () => {
return (
	<>
	<Nav>
		<NavMenu>
		<NavLink to="/login" activeStyle>
			Login
		</NavLink>
        <NavLink to="/register" activeStyle>
			Register
		</NavLink>
		
		</NavMenu>
	</Nav>
	</>
);
};

export default Navbar;
