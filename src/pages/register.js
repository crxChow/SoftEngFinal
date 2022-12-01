import React from "react";
import { Outlet, useOutletContext } from "react-router-dom";
import { instance } from "../model/AI";
import { useContext } from "react";

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


//class Register extends React.Component{
export default function Register(){
	const [model, setModel] = useOutletContext();
	
    function handleClick(){
        let userEmail = document.getElementById("user_name").value;
		//this.props.rModel.addDesigner(userEmail)
        instance.post('/registerdesigner', userEmail).then((response) => {
            console.log(response);
			
            if(response.status === 200){
                model.addDesigner(response.user_name);
            }
            else{
                
            }
        })
	}

	return (
	<div>
	<h1>
		register designer here!
	</h1>
    <Outlet/>
    <input type="text" id="user_name" name="email"></input>
    <button style = {registerButton} onClick={handleClick}>REGISTER DESIGNER</button>
    
	</div>
	);
};

//export default Register;

