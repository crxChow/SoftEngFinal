import { useNavigate } from "react-router-dom";
import Model from "../model/model";
import { instance } from "../model/AI";
import { Project } from "../model/model";

const projectsbutton = {
  backgroundColor: "#6987c9",
  color: "white",
  padding: 5,
  marginLeft: 10,
};
const moveOver = {
  marginLeft: 70,
};

export default function AdminProjectPage({
  adminProjModel,
  adminProjChangeModel,
}) {
  let index;
  const navigate = useNavigate();
  console.log(adminProjModel);
  let pid = window.location.href.split("/projects/")[1];
  console.log(pid);
  let project;
  for (let i = 0; i <= adminProjModel.projects.length; i++) {
    if (pid === adminProjModel.projects[i].pid) {
      project = adminProjModel.projects[i];
      index = i;
      break;
    }
  }
  console.log(project);

  function handleDelete() {
    let deleteModel = new Model();

    deleteModel.projects = adminProjModel.projects;
    for (let i = 0; i < deleteModel.projects.length; i++) {
      let proj = deleteModel.projects[i];
      if (proj.pid === pid) {
        var data = {};
        data["PJID"] = pid;
        var body = {};
        body["body"] = JSON.stringify(data);
        let js = JSON.stringify(body);

        instance.post("/deleteprojectadmin", js).then((response) => {
          console.log(response);
          if (response.data.result === "delete success") {
            deleteModel.designer.projects.splice(
              deleteModel.designer.projects.indexOf(proj),
              1
            );
            adminProjChangeModel(deleteModel);
            navigate("/amdin");
          } else {
            navigate("/admin");
          }
        });
      }
    }
  }
  return (
    <>
      <div>
        <h1 style={moveOver}>Name: {project.name}</h1>
        <br></br>
        <h2 style={moveOver}>Description: {project.description}</h2>
        <br></br>
        <h2 style={moveOver}>Date: {project.date}</h2>
        <br></br>
        <h2 style={moveOver}>Goal: {project.goal}</h2>
        <br></br>
        <h2 style={moveOver}>Designer: {project.designer}</h2>
        <br></br>
        <h2 style={moveOver}>Amount: {project.curAmount}</h2>
      </div>
      <div>
        <button style={projectsbutton} onClick={handleDelete}>
          Delete Project
        </button>
      </div>
    </>
  );
}
