import React from "react";
import { instance } from "../model/AI";
import Model from "../model/model";

const registerButton = {
  backgroundColor: "#FF7E6B",
  color: "white",
};

/*
export async function loader({ params}){
    const model = getModel(params.model)
    return { model };
}
*/
//class Register extends React.Component{
export default function Register({ newModel }) {
  //const model = useLoaderData();
  //const [model, setModel] = useOutletContext();

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
      console.log(response);

      if (response.status === 200) {
        modelAgain.addDesigner(response.user_name);
        console.log(modelAgain);
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
