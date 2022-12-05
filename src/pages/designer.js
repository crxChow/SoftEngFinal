import React from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../model/AI";
import Model from "../model/model";

const projectsbutton = {
  backgroundColor: "blue",
  color: "magenta",
  padding: 0,
};

export async function loader({ newModel }) {
  let projModel = new Model();
  projModel.addDesigner(newModel.designer.email);
  var data = {};
  data["designer"] = newModel.designer.email;

  // to work with API gateway, I need to wrap inside a 'body'
  var body = {};
  body["body"] = JSON.stringify(data);
  var js = JSON.stringify(body);
  console.log("sent: " + js);
  //let result;
  instance.post("/listprojectsdes", js).then((response) => {
    console.log(response.data.result);
    //result = response.data.result;

    if (response.data.status === 200) {
      //return response.data.result ?? null;
      //model.addDesigner(username, response.data.projects);
      console.log("somehow we got here!");
    } else {
      console.log("not in the system");
    }
  });
}

export default function Designer({ model }) {
  const navigate = useNavigate();

  console.log(model.designer.email);
  const handleMove = () => {
    console.log("bye bitch");
    navigate("/designer/projects");
  };
  return (
    <div>
      <h1>Welcome {model.designer.email}</h1>
      <button style={projectsbutton} onClick={handleMove}>
        List Projects
      </button>
    </div>
  );
}
