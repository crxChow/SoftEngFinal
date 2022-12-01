import React from "react";

const loginbutton = {
    backgroundColor: "blue",
    color: "white",
};

const Login = () => {
   
return (
	<div>
	<h1>
		login here!
	</h1>
    <input type="text" id="user_name" name="email"></input>
    <button style = {loginbutton}>LOGIN</button>
	</div>
);
};

export default Login;
