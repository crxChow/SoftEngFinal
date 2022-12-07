import Model from "../model/model";
import { useNavigate } from "react-router-dom";
import { instance } from "../model/AI";

export default function CreatePledge({ pledgeModel, pModel }) {
  console.log(pledgeModel);
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
      <h1>Creating a pledge!</h1>
      <input type="text" id="name"></input>
      Pledge Name
      <br></br>
      <input type="text" id="amount"></input>
      Pledge AMOUNT
      <br></br>
      <input type="text" id="reward"></input>
      Pledge Reward
      <br></br>
      <input type="text" id="maxSupport"></input>
      Project Support Goal
      <br></br>
      <button onClick={handleMove}>Create Pledge</button>
    </div>
  );
}
