import React from "react";
import {
  NavLink,
  redirect,
  UNSAFE_enhanceManualRouteObjects,
  useNavigate,
} from "react-router-dom";
import { instance } from "../model/AI";
import Model from "../model/model";

const loginbutton = {
  backgroundColor: "blue",
  color: "white",
};

export default function Login({ newModel }) {
  const navigate = useNavigate();
  const handleClick = () => {
    let userEmail = document.getElementById("user_name").value;

    let modelAgain = new Model();

    var data = {};
    data["email"] = userEmail;

    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
    console.log("sent: " + js);
    //let result;
    instance.post("/login", js).then((response) => {
      console.log(response.data.result);
      //result = response.data.result;

      if (response.data.result === "true") {
        //return response.data.result ?? null;
        //model.addDesigner(username, response.data.projects);
        modelAgain.addDesigner(userEmail);
        console.log(modelAgain);
        newModel(modelAgain);
        console.log("blastoff");
        navigate("/designer");
      } else {
        console.log("not in the system");
      }
    });
  };

  function display() {
    return "Login Here";
  }

  return (
    <div>
      <h1>{display()}</h1>
      <input type="text" id="user_name" name="email"></input>
      <button style={loginbutton} onClick={handleClick}>
        LOGIN
      </button>
    </div>
  );
}
