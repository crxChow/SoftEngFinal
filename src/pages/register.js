import React from "react";

const loginbutton = {
    backgroundColor: "blue",
    color: "white",
};

const registerButton = {
backgroundColor: "gold",
height: 40,
width: 150,
color: "black",
}

const registerDesigner = () => {
    
};


const Register = () => {
   
return (
	<div>
	<h1>
		register designer here!
	</h1>
    <input type="text" id="user_name" name="email"></input>
    <button style = {registerButton} onClick={(e) => registerDesigner()}>REGISTER DESIGNER</button>
	</div>
);
};

export default Register;

