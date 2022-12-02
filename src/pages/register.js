import React from "react";
import { Outlet, useOutletContext, useLoaderData } from "react-router-dom";
import { instance } from "../model/AI";
import { useContext } from "react";
import { Controller } from "../controller/controller";

const loginbutton = {
  backgroundColor: "blue",
  color: "white",
};

const registerButton = {
  backgroundColor: "gold",
  height: 40,
  width: 150,
  color: "black",
};

/*
export async function loader({ params}){
    const model = getModel(params.model)
    return { model };
}
*/
//class Register extends React.Component{
export default function Register() {
  //const model = useLoaderData();
  //const [model, setModel] = useOutletContext();

  function handleClick() {
    let model = Controller(null);
    console.log(model);
    let userEmail = document.getElementById("user_name").value;

    instance.post("/registerdesigner", userEmail).then((response) => {
      console.log(response);

      if (response.status === 200) {
        return (
          <div>
            <h1>You added {userEmail}</h1>
          </div>
        );
      } else {
      }
    });
  }

  return (
    <div id="register">
      <h1>register designer here!</h1>
      <input type="text" id="user_name" name="email"></input>
      <button style={registerButton} onClick={handleClick}>
        REGISTER DESIGNER
      </button>
    </div>
  );
}

//export default Register;
