import React from "react";
import { instance } from "../model/AI";
import Model from "../model/model";
import { useNavigate } from "react-router-dom";

const registerButton = {
  backgroundColor: "#FF7E6B",
  color: "white",
  textSize: 30,
  marginLeft: 69,
  marginBottom: 10,
  padding: 5,
  width: 215,
};
const registerSupButton = {
  backgroundColor: "#6987c9",
  color: "white",
  textSize: 30,
  marginLeft: 69,
  marginBottom: 10,
  padding: 5,
  width: 215,
};

const welcomeBar = {
  marginLeft: 69,
};
const inputfield = {
  marginLeft: 69,
  marginBottom: 5,
  textSize: 30,
  padding: 5,
  width: 200,
};

export default function Register({ newModel }) {
  const navigate = useNavigate();

  const handleClick = () => {
    let userEmail = document.getElementById("user_name").value;

    let modelAgain = new Model();
    var data = {};
    data["name"] = document.getElementById("password").value;
    data["email"] = userEmail;
    data["password"] = document.getElementById("name").value;

    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);

    instance.post("/registerdesigner", js).then((response) => {
      console.log(response.data.result);
      let tempResponse = response.data.result;
      console.log(tempResponse);

      if (response.status === 200) {
        modelAgain.addDesigner(
          tempResponse[0].email,
          tempResponse[0].DID,
          tempResponse[0].name,
          tempResponse[0].password
        );
        console.log(modelAgain);
        navigate("/login");
      } else {
        console.log("oops");
      }
    });
  };

  const handleSupClick = () => {
    let userEmail = document.getElementById("user_name").value;

    let modelAgain = new Model();
    var data = {};
    data["name"] = document.getElementById("name").value;
    data["email"] = userEmail;
    data["password"] = document.getElementById("password").value;

    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);

    instance.post("/registersupporter", js).then((response) => {
      console.log(response.data.result);
      let tempResponse = response.data.result;
      console.log(tempResponse);

      if (response.status === 200) {
        /*modelAgain.addSupporter(
          tempResponse[0].email,
          tempResponse[0].SID,
          tempResponse[0].name
        ); */
        console.log(modelAgain);
        navigate("/login");
      } else {
        console.log("oops");
      }
    });
  };

  return (
    <div>
      <h1 style={welcomeBar}>register a new user here!</h1>
      <input
        style={inputfield}
        type="text"
        id="user_name"
        placeholder="User Email"
      ></input>
      <br></br>
      <input
        style={inputfield}
        type="text"
        id="name"
        placeholder="Name"
      ></input>
      <br></br>
      <input
        style={inputfield}
        type="text"
        id="password"
        placeholder="Password"
      ></input>
      <br></br>
      <button style={registerButton} onClick={handleClick}>
        REGISTER DESIGNER
      </button>{" "}
      <br></br>
      <button style={registerSupButton} onClick={handleSupClick}>
        REGISTER SUPPORTER
      </button>
    </div>
  );
}

//export default Register;
