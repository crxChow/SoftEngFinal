import React from "react";
import { instance } from "../model/AI";
import Model from "../model/model";
import { useNavigate } from "react-router-dom";

const registerButton = {
  backgroundColor: "#FF7E6B",
  color: "white",
};


export default function Register({ newModel }) {
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

    instance.post("/registerdesigner", js).then((response) => {
      console.log(response.data.result);
      let tempResponse = response.data.result;
      console.log(tempResponse);

      if (response.status === 200) {
        modelAgain.addDesigner(tempResponse[0].email, tempResponse[0].DID, tempResponse[0].name);
        console.log(modelAgain);
        navigate("/login");
      } else {
        console.log("oops");
      }
    });
  };

  return (
    <div>
      <h1>register a new user here!</h1>
      <input type="text" id="user_name" name="email"></input>
      <button style={registerButton} onClick={handleClick}>
        REGISTER DESIGNER
      </button>
    </div>
  );
}

//export default Register;
