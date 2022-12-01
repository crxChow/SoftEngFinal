import React from "react";
import { Controller } from "../controller/controller";

const loginbutton = {
    backgroundColor: "blue",
    color: "white",
};

export default function Login(){
    var exists;
    function handleClick(){
        let model = Controller(null)
        console.log(model);
        let userEmail = document.getElementById("user_name").value;
		exists = model.checkDesigner(userEmail)
        console.log(exists);
        /*instance.post('/registerdesigner', userEmail).then((response) => {
            console.log(response);
			
            if(response.status === 200){
                model.addDesigner(response.user_name);
            }
            else{
                
            }
        })*/
	}
    /*function check(email){
        let model = Controller(null)
        exists = model.checkDesigner(email)
        console.log(exists);
    }*/

    function display(){
        if(exists){
            return "Invalid Login";
        }
        else{
            return "Login Here!"
        }
    }
   
    return (
        <div>
        <h1>
            { display() }
        </h1>
        <input type="text" id="user_name" name="email"></input>
        <button style = {loginbutton} onClick={handleClick} >LOGIN</button>
        </div>
    );
};

