import React from "react";
import { Controller } from "../controller/controller";
import { instance } from "../model/AI";

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
        console.log(userEmail);


        var data = {};
        data["email"] = userEmail;
        
        // to work with API gateway, I need to wrap inside a 'body'
        var body = {}
        body["body"] = JSON.stringify(data);
        var js = JSON.stringify(body);
        console.log("sent: " +js)

        instance.post('/login', js).then((response) => {
  
            console.log(response.data.result);
			
            if(response.data.status === 200){
                model.addDesigner(userEmail);
            }
            else{
                
            }
        })
	}

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

