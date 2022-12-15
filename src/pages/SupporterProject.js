import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Model from "../model/model";
import { instance } from "../model/AI";

const firstButton = {
  backgroundColor: "#6987c9",
  color: "white",
  padding: 5,
  marginLeft: 70,
};

const inputfield = {
  marginLeft: 70,
  marginBottom: 5,
  textSize: 30,
  padding: 5,
  width: 200,
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

const supportButton = {
  backgroundColor: "#6987c9",
  color: "white",
  padding: 5,
  marginLeft: 5,
};

export default function SupporterProject({ projModel, projChangeModel }) {
  const navigate = useNavigate();
  console.log("check sup");
  console.log(projModel);
  let pid = window.location.href.split("/projects/")[1];
  console.log(pid);
  let project;
  let pledges;
  let index;
  for (let i = 0; i <= projModel.projects.length; i++) {
    if (pid === projModel.projects[i].pid) {
      project = projModel.projects[i];
      pledges = projModel.projects[i].pledge;
      //console.log(pledges);
      index = i;
      break;
    }
  }
  console.log(project);

  function directSupport() {
    var data = {};
    data["email"] = projModel.supporter.email;
    data["PJID"] = pid;
    data["amount"] = document.getElementById("amount").value;
    var body = {};
    body["body"] = JSON.stringify(data);
    let js = JSON.stringify(body);

    instance.post("/directsupport", js).then((response) => {
      console.log(response);
    });
  }

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
        model = projModel;
        model.projects[index].pledge = response.data.result;
        projChangeModel(model);
        navigate("/supporter/projects/" + pid);
      }
    });
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
      </div>
      <br></br>
      <h2 style={moveOver}>Make a direct support contribution!</h2>
      <input
        style={inputfield}
        placeholder="Support Ammount"
        type="text"
        id="amount"
      ></input>
      <button style={supportButton} onClick={directSupport}>
        Support!
      </button>{" "}
      <div>
        <button style={firstButton} onClick={handleView}>
          List Pledges
        </button>

        <nav style={moveOver}>
          {pledges.length ? (
            <ul style={backStyle}>
              {pledges.map((pledge) => (
                <li style={listSpaceStyle} key={pledge.PLID}>
                  <Link
                    style={listStyle}
                    to={`../supporter/pledge/${pledge.PLID}`}
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
