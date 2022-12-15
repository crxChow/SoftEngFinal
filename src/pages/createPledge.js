import Model from "../model/model";
import { useNavigate } from "react-router-dom";
import { instance } from "../model/AI";

export default function CreatePledge({ pledgeModel, pModel }) {
  console.log(pledgeModel);
  const createButton = {
    backgroundColor: "#6987c9",
    color: "white",
    textSize: 30,
    marginLeft: 69,
    marginBottom: 10,
    padding: 5,
    width: 215,
  };

  const welcomeBar = {
    marginLeft: 69,
  };
  const inputfield = {
    marginLeft: 69,
    marginBottom: 5,
    textSize: 30,
    padding: 5,
    width: 200,
  };
  const navigate = useNavigate();
  const projID = window.location.href
    .split("/projects/")[1]
    .split("/create")[0];
  console.log(projID);

  function handleMove() {
    let createModel = new Model();
    createModel.addDesigner(
      pledgeModel.designer.email,
      pledgeModel.designer.did
    );
    //find project with same pjid
    let thisProj;
    for (let i = 0; i < pledgeModel.designer.projects.length; i++) {
      let proj = pledgeModel.designer.projects[i];
      //console.log(proj.pid);
      if (proj.pid === projID) {
        console.log(proj);
        thisProj = proj;
        pledgeModel.designer.projects.splice(
          pledgeModel.designer.projects.indexOf(proj),
          1
        );
      }
    }
    console.log(pledgeModel.designer.projects);
    console.log(thisProj);
    console.log(createModel);
    var data = {};

    data["projectName"] = thisProj.name;
    data["name"] = document.getElementById("name").value;
    data["amount"] = document.getElementById("amount").value;
    data["reward"] = document.getElementById("reward").value;
    data["maxSupport"] = document.getElementById("maxSupport").value;
    data["PJID"] = projID;

    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
    console.log("sent: " + js);

    instance.post("/createpledge", js).then((response) => {
      console.log(response);
      if (response.data.status === 200) {
        let project = response.data.result;
        console.log(response.data.result);
        thisProj.pledge = response.data.result;
        console.log(project);

        if (project.length !== 0) {
          console.log("nice pledge bro");
          navigate(`/designer/projects/${projID}`);
        } else {
          console.log("create better");
          navigate("/designer/projects/" + projID + "/create");
        }
      } else {
        console.log("error time");
      }
    });
    pledgeModel.designer.projects.push(thisProj);
    console.log(pledgeModel);
    pModel(pledgeModel);
  }

  return (
    <div>
      <h1 style={welcomeBar}>Creating a pledge!</h1>
      <input
        style={inputfield}
        type="text"
        id="name"
        placeholder="Pledge Name"
      ></input>
      <br></br>
      <input
        style={inputfield}
        type="text"
        id="amount"
        placeholder="Pledge Amount"
      ></input>
      <br></br>
      <input
        style={inputfield}
        type="text"
        id="reward"
        placeholder="Pledge Reward"
      ></input>
      <br></br>
      <input
        style={inputfield}
        type="text"
        id="maxSupport"
        placeholder="Max Support"
      ></input>
      <br></br>
      <button style={createButton} onClick={handleMove}>
        Create Pledge
      </button>
    </div>
  );
}
