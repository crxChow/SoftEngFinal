import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { instance } from "../model/AI";
import Model from "../model/model";
//import { useLoaderData } from "react-router-dom";

const welcomeBar = {
  marginLeft: 70,
};
const projectsbutton = {
  backgroundColor: "#6987c9",
  color: "white",
  padding: 5,
  marginLeft: 70,
};
const projectscreatebutton = {
  backgroundColor: "#FF7E6B",
  color: "white",
  padding: 5,
  marginLeft: 20,
};
const movedOver = {
  marginLeft: 70,
};

export default function Designer({ newerModel, changeModel }) {
  console.log(newerModel);
  const navigate = useNavigate();
  console.log(newerModel.designer.email);
  console.log(newerModel.designer.did);
  const projects = newerModel.designer.projects;
  console.log(projects);

  const handleEdit = () => {
    navigate("/designer/projects/edit");
  };
  const handleMove = () => {
    let projModel = new Model();
    projModel.addDesigner(newerModel.designer.email, newerModel.designer.did);
    console.log(projModel);
    var data = {};
    data["DID"] = newerModel.designer.did;

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
            /*console.log(tempProjects[i].name);
            console.log(tempProjects[i].PJID);
            console.log(tempProjects[i].description);
            console.log(tempProjects[i].date);
            console.log(tempProjects[i].projtype);
            console.log(tempProjects[i].goalAmt);
            console.log(tempProjects[i].DID);*/

            projModel.designer.addProject(
              tempProjects[i].name,
              tempProjects[i].PJID,
              tempProjects[i].description,
              tempProjects[i].date,
              tempProjects[i].projType,
              tempProjects[i].goalAmt,
              tempProjects[i].DID
            );
          }
          //dont delete
          console.log(projModel);
          console.log("somehow we got here!");
          changeModel(projModel);
          navigate("/designer");
        } else {
          console.log("you got no projects bro");
          navigate("/designer");
        }
      } else {
        console.log("error time");
      }
    });
  };
  return (
    <>
      <div>
        <h1 style={welcomeBar}>Welcome {newerModel.designer.email}</h1>
        <button style={projectsbutton} onClick={handleMove}>
          List Projects
        </button>
        <button style={projectscreatebutton} onClick={handleEdit}>
          Create Project
        </button>
      </div>
      <div>
        <nav>
          {projects.length ? (
            <ul>
              {projects.map((project) => (
                <li key={project.id}>
                  <Link to={`projects/${project.pid}`}>
                    {project.name ? <>{project.name}</> : <i>No Name</i>}
                    {""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>You Got No Projects Bro</i>
            </p>
          )}
        </nav>
      </div>
    </>
  );
}
