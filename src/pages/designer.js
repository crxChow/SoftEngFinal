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

export default function Designer({ newModel }) {
  const navigate = useNavigate();
  console.log(newModel.designer.email);
  console.log(newModel.designer.did);
  const handleMove = () => {
    let projModel = new Model();
    projModel.addDesigner(newModel.designer.email, newModel.designer.did);
    console.log(projModel);
    var data = {};
    data["DID"] = newModel.designer.did;

    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
    console.log("sent: " + js);
    //let result;
    instance.post("/listprojectsdes", js).then((response) => {
      console.log(response.data.result);

      if (response.data.status === 200) {
        let tempProjects = JSON.parse(response.data.result);
        console.log(tempProjects);
        //result = response.data.result;

        //return response.data.result ?? null;
        //model.addDesigner(username, response.data.projects);
        if (tempProjects.length !== 0) {
          for (let i = 0; i < tempProjects.length; i++) {
            console.log(tempProjects[i].name);
            console.log(tempProjects[i].PJID);
            console.log(tempProjects[i].description);
            console.log(tempProjects[i].date);
            console.log(tempProjects[i].projtype);
            console.log(tempProjects[i].goalAmt);
            console.log(tempProjects[i].DID);

            projModel.designer.addProject(
              tempProjects[i].name,
              tempProjects[i].PJID,
              tempProjects[i].description,
              tempProjects[i].date,
              tempProjects[i].projtype,
              tempProjects[i].goalAmt,
              tempProjects[i].DID
            );
          }
          //dont delete
          console.log(projModel);
          console.log("somehow we got here!");
          newModel(projModel);
          navigate("/designer/projects");
        } else {
          console.log("you got no projects bro");
          navigate("/designer/projects");
        }
      } else {
        console.log("error time");
      }
    });
  };
  return (
    <div>
      <h1>Welcome {newModel.designer.email}</h1>
      <button style={projectsbutton} onClick={handleMove}>
        List Projects
      </button>
    </div>
  );
}
