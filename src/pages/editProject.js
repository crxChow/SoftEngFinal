import Model from "../model/model";
import { useNavigate } from "react-router-dom";
import { instance } from "../model/AI";

export default function Edit({ evennewerModel, changingModel }) {
  console.log(evennewerModel);
  const navigate = useNavigate();

  function handleMove() {
    let editModel = new Model();
    editModel.addDesigner(
      evennewerModel.designer.email,
      evennewerModel.designer.did
    );
    console.log(editModel);
    var data = {};
    data["email"] = evennewerModel.designer.email;
    data["name"] = document.getElementById("name").value;
    data["description"] = document.getElementById("description").value;
    data["date"] = document.getElementById("date").value;
    data["projType"] = document.getElementById("type").value;
    data["goalAmt"] = document.getElementById("goal").value;
    data["DID"] = evennewerModel.designer.did;

    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
    console.log("sent: " + js);

    instance.post("/createproject", js).then((response) => {
      if (response.data.status === 200) {
        let tempProjList = JSON.parse(response.data.result);
        console.log(tempProjList);

        if (tempProjList.length !== 0) {
          for (let i = 0; i < tempProjList.length; i++) {
            editModel.addProject(
              tempProjList[i].name,
              tempProjList[i].PJID,
              tempProjList[i].description,
              tempProjList[i].date,
              tempProjList[i].projType,
              tempProjList[i].goalAmt,
              tempProjList[i].DID
            );
          }
          console.log("nice project bro");
          navigate("/designer");
        } else {
          console.log("create better");
          navigate("/designer/projects/edit");
        }
      } else {
        console.log("error time");
      }
    });

    //changingModel(editModel);
  }

  return (
    <div>
      <h1>Creating a project!</h1>

      <input
        type="text"
        id="name"
        name="name"
        placeholder="Project Name"
      ></input>
      <br></br>
      <input
        type="text"
        id="description"
        placeholder="Project Description
"
      ></input>
      <br></br>
      <input
        type="text"
        id="date"
        placeholder="Project End Date
"
      ></input>
      <br></br>
      <input type="text" id="type" placeholder="Project Type"></input>
      <br></br>
      <input type="text" id="goal" placeholder="Project Goal"></input>
      <br></br>
      <button onClick={handleMove}>Create Project</button>
    </div>
  );
}
