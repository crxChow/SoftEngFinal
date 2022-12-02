import { getSuggestedQuery } from "@testing-library/react";
import React from "react";
import { Form, useLoaderData, redirect } from "react-router-dom";
import { instance } from "../model/AI";
import { getDesigner } from "../model/model";

const loginbutton = {
  backgroundColor: "blue",
  color: "white",
};

export async function action({ request, params }) {
  const formData = await request.formData();
  console.log(formData);
  const updates = Object.fromEntries(formData);
  console.log(updates);
  await getDesigner(params.designerId, updates);
  if(getDesigner()){
  //return redirect(`/designer`);
  }
  else{}
}

export default function Login() {

    var exists;
  function handleClick() {

    let userEmail = document.getElementById("user_name").value;

    exists =  getDesigner(userEmail);
    console.log(exists);
    return redirect("/designer");
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
      <Form action="designer">
            <button type="submit">LOGIN</button>
          </Form>
    </div>
  );
}
