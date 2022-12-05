import React from "react";
import { useNavigate } from "react-router-dom";
import { instance } from "../model/AI";
import Model from "../model/model";
//import { useLoaderData } from "react-router-dom";

const projectsbutton = {
  backgroundColor: "blue",
  color: "magenta",
  padding: 0,
};

export default function Designer({ model }) {
  const navigate = useNavigate();
  console.log(model.designer.email);
  const handleMove = () => {
    let projModel = new Model();
    projModel.addDesigner(model.designer.email);
    console.log(projModel);
    var data = {};
    data["email"] = model.designer.email;

    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
    console.log("sent: " + js);
    //let result;
    instance.post("/listprojectsdes", js).then((response) => {
      console.log(response.data.result);
      let tempProjects = JSON.parse(response.data.result);
      console.log(tempProjects);
      //result = response.data.result;
      console.log(tempProjects[0].name);
      console.log(tempProjects[0].PJID);
      console.log(tempProjects[0].description);
      console.log(tempProjects[0].date);
      console.log(tempProjects[0].projtype);
      console.log(tempProjects[0].goalAmt);
      console.log(tempProjects[0].DID);
      if (response.data.status === 200) {
        //return response.data.result ?? null;
        //model.addDesigner(username, response.data.projects);
        projModel.designer.addProject(
          tempProjects[0].name,
          tempProjects[0].PJID,
          tempProjects[0].description,
          tempProjects[0].date,
          tempProjects[0].projtype,
          tempProjects[0].goalAmt,
          tempProjects[0].DID
        );
        console.log(projModel);
        console.log("somehow we got here!");
        navigate("/designer/projects");
      } else {
        console.log("error time");
      }
    });
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
