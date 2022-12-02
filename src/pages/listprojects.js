import { getSuggestedQuery } from "@testing-library/react";
import React from "react";
import { Form, useLoaderData } from "react-router-dom";
import { instance } from "../model/AI";
import { getDesigner } from "../model/model";

const loginbutton = {
  backgroundColor: "blue",
  color: "white",
};

export default function ListProjects() {
  const user = useLoaderData();
  var exists;
  function handleClick() {

    let userEmail = document.getElementById("user_name").value;

    console.log(getDesigner(userEmail));
    
  }

  function display() {
    if (exists) {
      return "Invalid Login";
    } else {
      return "Login Here!";
    }
  }

  return (
    <div id="listprojects">
      <h1> PROJECTS </h1>
      
    </div>
  );
}
