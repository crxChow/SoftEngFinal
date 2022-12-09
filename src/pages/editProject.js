import Model from "../model/model";
import { useNavigate } from "react-router-dom";
import { instance } from "../model/AI";

export default function Edit({ evennewerModel, changingModel }) {
  console.log(evennewerModel);
  const navigate = useNavigate();
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

  function handleMove() {
    let editModel = new Model();
    editModel.addDesigner(
      evennewerModel.designer.email,
      evennewerModel.designer.did
    );
    console.log(editModel);
    var data = {};
    data["email"] = editModel.designer.email;
    data["desName"] = document.getElementById("designerName").value;
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
              tempProjList[i].desName
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
      <h1 style={welcomeBar}>Creating a project!</h1>
      <input
        style={inputfield}
        type="text"
        id="name"
        name="name"
        placeholder="Project Name"
      ></input>
      <br></br>
      <input
        style={inputfield}
        type="text"
        id="description"
        placeholder="Project Description
"
      ></input>
      <br></br>
      <input
        style={inputfield}
        type="text"
        id="date"
        placeholder="Project End Date
"
      ></input>
      YYYY-MM-DD
      <br></br>
      <input
        style={inputfield}
        type="text"
        id="type"
        placeholder="Project Type"
      ></input>
      <br></br>
      <input
        style={inputfield}
        type="text"
        id="goal"
        placeholder="Project Goal"
      ></input>
      <br></br>
      <input
        style={inputfield}
        type="text"
        id="designerName"
        placeholder="Designer Name"
      ></input>
      <br></br>
      <button style={createButton} onClick={handleMove}>
        Create Project
      </button>
    </div>
  );
}
