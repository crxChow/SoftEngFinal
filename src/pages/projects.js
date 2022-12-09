import { Link } from "react-router-dom";
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
const firstButton = {
  backgroundColor: "#6987c9",
  color: "white",
  padding: 5,
  marginLeft: 70,
};

const moveOver = {
  marginLeft: 70,
};
const listStyle = {
  backgroundColor: "white",
  color: "black",
  marginTop: 10,
  textSize: 20,
};
const listSpaceStyle = {
  backgroundColor: "white",
  color: "white",
  marginTop: 10,
  textSize: 20,
};
const backStyle = {
  backgroundColor: "white",
  color: "white",
  padding: 5,
};

export default function ProjectPage({ niceModel, dopeModel }) {
  const navigate = useNavigate();
  console.log(niceModel);
  let pid = window.location.href.split("/projects/")[1];
  console.log(pid);
  let project;
  let pledges;
  let index;
  for (let i = 0; i <= niceModel.designer.projects.length; i++) {
    if (pid === niceModel.designer.projects[i].pid) {
      project = niceModel.designer.projects[i];
      pledges = niceModel.designer.projects[i].pledge;
      //console.log(pledges);
      index = i;
      break;
    }
  }
  console.log(project);

  function handleView() {
    var data = {};
    data["PJID"] = pid;
    var body = {};
    body["body"] = JSON.stringify(data);
    let js = JSON.stringify(body);

    instance.post("/listpledge", js).then((response) => {
      console.log(response);
      if (response.data.status === 200) {
        let model = new Model();
        model = niceModel;
        model.designer.projects[index].pledge = response.data.result;
        dopeModel(model);
        navigate("/designer/projects/" + pid);
      }
    });
  }

  function handleCreate() {
    navigate("/designer/projects/" + pid + "/create");
  }

  function handleLaunch() {
    console.log("about to launch");
    var data = {};
    data["PJID"] = pid;
    var body = {};
    body["body"] = JSON.stringify(data);
    let js = JSON.stringify(body);

    instance.post("/launchproject", js).then((response) => {
      console.log(response);
      let result = response.data.result;
      if (response.data.status === 200) {
        let model = new Model();
        let replaceProj = new Project(
          result.name,
          result.PJID,
          result.description,
          result.date,
          result.projType,
          result.goalAmt,
          result.desName,
          result.currentAmt
        );
        replaceProj.isLaunched = result.isLaunched;
        model = niceModel;
        model.designer.projects.splice(index, 1, replaceProj);
        dopeModel(model);
        navigate("/designer/projects/" + pid);
      }
    });
  }

  function handleDelete() {
    let deleteModel = new Model();

    deleteModel.designer = niceModel.designer;
    for (let i = 0; i < deleteModel.designer.projects.length; i++) {
      let proj = deleteModel.designer.projects[i];
      if (proj.pid === pid) {
        var data = {};
        data["PJID"] = pid;
        var body = {};
        body["body"] = JSON.stringify(data);
        let js = JSON.stringify(body);

        instance.post("/deleteproject", js).then((response) => {
          console.log(response);
          if (response.data.result === "delete success") {
            deleteModel.designer.projects.splice(
              deleteModel.designer.projects.indexOf(proj),
              1
            );
            dopeModel(deleteModel);
            navigate("/designer");
          } else {
            navigate("/designer");
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
        <button style={firstButton} onClick={handleView}>
          List Pledges
        </button>
        <button style={projectsbutton} onClick={handleCreate}>
          Create Pledge
        </button>
        <button style={projectsbutton} onClick={handleDelete}>
          Delete Project
        </button>
        <button style={projectsbutton} onClick={handleLaunch}>
          Launch Project
        </button>
        <nav style={moveOver}>
          {pledges.length ? (
            <ul style={backStyle}>
              {pledges.map((pledge) => (
                <li style={listSpaceStyle} key={pledge.PLID}>
                  <Link
                    style={listStyle}
                    to={`../designer/pledge/${pledge.PLID}`}
                  >
                    {pledge.name ? <>{pledge.name}</> : <i>No Name</i>}
                    {""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>
                No pledges<br></br> To see pledges click the list pledges
                button!
              </i>
            </p>
          )}
        </nav>
      </div>
    </>
  );
}
