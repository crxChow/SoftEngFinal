import { instance } from "../model/AI";
import Model from "../model/model";

export default function PledgePageSup({ supPModel, supPChange }) {
  const pledgeID = window.location.href.split("/supporter/pledge/")[1];
  console.log(pledgeID);
  let poj = new Model();
  poj.project = supPModel.project;
  const welcomeBar = {
    marginLeft: 69,
  };
  const getPledgeButton = {
    backgroundColor: "#6987c9",
    color: "white",
    textSize: 30,
    marginLeft: 69,
    marginBottom: 10,
    padding: 5,
    width: 215,
  };
  let pledge;
  console.log("loop time");

  function handleClick() {
    var data = {};
    data["PLID"] = pledgeID;
    var body = {};
    body["body"] = JSON.stringify(data);
    let js = JSON.stringify(body);
    console.log("sent" + js);

    instance.post("/viewpledge", js).then((response) => {
      //let model = supPModel;
      console.log(poj);
      poj = response.data.result[0];
      console.log(response.data.result[0]);

      if(response.data.status === 200){
        if(response.data.result.length !== 0){

        }
      }

    });
  }

  function dataHandler() {
    if(poj !== undefined){
      console.log(poj)
      return(
        "test"
      );
    }
  }

  return (
    <div>
      <h1 style={welcomeBar}>Click to view the pledge info</h1>
      <button style={getPledgeButton} onClick={handleClick}>
        Get pledge info!
      </button>
      <h2></h2>
    </div>
  );
}
