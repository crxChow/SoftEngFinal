import React from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../model/AI";
import Model from "../model/model";
const loginbutton = {
  backgroundColor: "#FF7E6B",
  color: "white",
};
const createbutton = {
  backgroundColor: "#6987C9",
  color: "white",
};

export default function Login({ newerModel }) {
  const navigate = useNavigate();
  const handleMove = () => {
    console.log("bye bitch");
    navigate("/register");
  };
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
      console.log(response.data);
      console.log(response);
      //result = response.data.result;

      //FIX WHEN MOVING FROM MOCK
      let tempUser = response.data.result;
      console.log(tempUser);

      if (response.data.user === "designer") {
        //return response.data.result ?? null;
        //model.addDesigner(username, response.data.projects);
        modelAgain.addDesigner(
          tempUser[0].email,
          tempUser[0].DID,
          tempUser[0].name,
          tempUser[0].password
        );
        console.log(modelAgain);
        newerModel(modelAgain);
        console.log("there should be a model aove this");
        console.log("blastoff");
        navigate("/designer");
      } else if (response.data.user === "admin") {
        navigate("/admin");
      } else if (response.data.user === "supporter") {
        modelAgain.addSupporter(
          tempUser[0].email,
          tempUser[0].SID,
          tempUser[0].name,
          tempUser[0].password
        );
        newerModel(modelAgain);
        console.log("SUPPORTER LOGGED IN");
        navigate("/supporter");
      } else {
        console.log("not in the system");
        navigate("/register");
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
      <button style={createbutton} onClick={handleMove}>
        CREATE ACCOUNT
      </button>
    </div>
  );
}
