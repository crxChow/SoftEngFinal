import { Link } from "react-router-dom";

export default function Project({ niceModel }) {
  console.log(niceModel);
  let pid = window.location.href.split('/projects/')[1];
  console.log(pid);
  let project;
  for(let i = 0; i <= niceModel.designer.projects.length; i++){
    if(pid === niceModel.designer.projects[i].pid){
      project = niceModel.designer.projects[i];
      break;
    }
  }
  console.log(project);
  return (
    <>
      <div>
        <h1>Name: {project.name}</h1>
        <br></br>
        <h2>Description: {project.description}</h2>
        <br></br>
        <h2>Date: {project.date}</h2>
        <br></br>
        <h2>Goal: {project.goal}</h2>
        <br></br>
        <h2>DID: {project.designer}</h2>
      </div>
    </>
  );
}
