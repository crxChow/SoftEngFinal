import { useNavigate } from "react-router-dom";
import { instance } from "../model/AI";
import Model from "../model/model";

export default function PledgePageSup({ supPModel, supPChange }) {
  let navigate = useNavigate();
  const pledgeID = window.location.href.split("/supporter/pledge/")[1];
  console.log(pledgeID);
  let poj = new Model();
  poj.projects = supPModel.projects;
  console.log(supPModel);

  const welcomeBar = {
    marginLeft: 69,
  };
  const moveOver = {
    marginLeft: 70,
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
  const claimButton = {
    backgroundColor: "#FF7E6B",
    color: "white",
    textSize: 30,
    marginLeft: 5,
    marginBottom: 10,
    padding: 5,
    width: 215,
  };
  function handleClaim() {
    var data = {};
    data["PLID"] = pledgeID;
    data["email"] = supPModel.supporter.email;
    var body = {};
    body["body"] = JSON.stringify(data);
    let js = JSON.stringify(body);
    console.log("sent" + js);

    instance.post("/claimpledge", js).then((response) => {
      //let model = supPModel;
      console.log(poj);
      console.log(response.data.result);
      if (response.data.status === 200) {
        if (response.data.result.length !== 0) {
          poj.pledges = response.data.result[0];
          console.log(poj);
          poj.supporter = supPModel.supporter;
          supPChange(poj);
          navigate(`../supporter/pledge/${pledgeID}`);
        }
      }
    });
  }

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
      console.log(response.data.result[0]);

      if (response.data.status === 200) {
        if (response.data.result.length !== 0) {
          poj.pledges = response.data.result[0];
          console.log(poj);
          poj.supporter = supPModel.supporter;
          supPChange(poj);
          navigate(`../supporter/pledge/${poj.pledges.PLID}`);
        }
      }
    });
  }
  /*
  function dataHandler() {
    if (poj !== undefined) {
      console.log(poj);
      return "test";
    }
  }*/

  return (
    <>
      <div>
        <h1 style={welcomeBar}>Click to view the pledge info</h1>
        <button style={getPledgeButton} onClick={handleClick}>
          Get pledge info!
        </button>
        <button style={claimButton} onClick={handleClaim}>
          Claim this pledge!
        </button>
      </div>
      <div>
        {supPModel.pledges.name ? (
          <div>
            <h1 style={moveOver}>Name: {supPModel.pledges.name}</h1>
            <br></br>
            <h2 style={moveOver}>Reward: {supPModel.pledges.reward}</h2>
            <br></br>
            <h2 style={moveOver}>Cost: {supPModel.pledges.amount}</h2>
            <br></br>
            <h2 style={moveOver}>Goal: {supPModel.pledges.maxSupport}</h2>
          </div>
        ) : (
          <p style={moveOver}>
            <i>
              No info<br></br> To see pledge info click the button!
            </i>
          </p>
        )}
      </div>
    </>
  );
}
