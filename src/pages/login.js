import { getSuggestedQuery } from "@testing-library/react";
import React from "react";
import { Form, useLoaderData } from "react-router-dom";
import { Controller } from "../controller/controller";
import { instance } from "../model/AI";
import { getDesigner } from "../model/model";

const loginbutton = {
  backgroundColor: "blue",
  color: "white",
};

export default function Login() {
  const user = useLoaderData();
  var exists;
  function handleClick() {
    //let model = Controller(null);
    //console.log(model);
    let userEmail = document.getElementById("user_name").value;
    //exists = model.checkDesigner(userEmail);
    //console.log(userEmail);
    getDesigner(userEmail);
  }

  function display() {
    if (exists) {
      return "Invalid Login";
    } else {
      return "Login Here!";
    }
  }

  return (
    <div id="login">
      <h1>{display()}</h1>
      <input type="text" id="user_name" name="email"></input>
      <button style={loginbutton} onClick={handleClick}>
        LOGIN DESIGNER
      </button>
    </div>
  );
}
