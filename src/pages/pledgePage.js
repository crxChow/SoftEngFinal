import { instance } from "../model/AI";
import Model from "../model/model";
import { useNavigate } from "react-router-dom";

export default function PledgePage({ pledgePageModel, pledgePageEdit }) {
  const pledgeID = window.location.href.split("/designer/pledge/")[1];
  let navigate = useNavigate(0);
  let poj = new Model();
  poj.project = pledgePageModel.project;
  console.log(pledgeID);
  const welcomeBar = {
    marginLeft: 69,
  };
  const moveOver = {
    marginLeft: 70,
  };
  const moveOverText = {
    marginLeft: 70,
  };
  const getPledgeButton = {
    backgroundColor: "#6987c9",
    color: "white",
    textSize: 20,
    marginLeft: 69,
    marginBottom: 10,
    padding: 5,
    width: 215,
  };
  console.log("loop time");

  function handleClick() {
    var data = {};
    data["PLID"] = pledgeID;
    var body = {};
    body["body"] = JSON.stringify(data);
    let js = JSON.stringify(body);
    console.log("sent" + js);

    instance.post("/viewpledge", js).then((response) => {
      console.log(poj);
      console.log(response.data.result[0]);

      if (response.data.status === 200) {
        if (response.data.result.length !== 0) {
          poj.pledges = response.data.result[0];
          console.log(poj);
          pledgePageEdit(poj);
          navigate(`../designer/pledge/${poj.pledges.PLID}`);
        }
      }
    });
  }

  return (
    <>
      <div>
        <h1 style={welcomeBar}>Click to view the pledge info</h1>
        <button style={getPledgeButton} onClick={handleClick}>
          Get pledge info!
        </button>
      </div>
      <div>
        {pledgePageModel.pledges.name ? (
          <div>
            <h1 style={moveOver}>Name: {pledgePageModel.pledges.name}</h1>
            <br></br>
            <h2 style={moveOver}>Reward: {pledgePageModel.pledges.reward}</h2>
            <br></br>
            <h2 style={moveOver}>Cost: {pledgePageModel.pledges.amount}</h2>
            <br></br>
            <h2 style={moveOver}>Goal: {pledgePageModel.pledges.maxSupport}</h2>
            <br></br>
            {pledgePageModel.pledges.supEmail.length ? (
              <h2 style={moveOver}>User: {pledgePageModel.pledges.supEmail}</h2>
            ) : (
              <h2 style={moveOverText}>Pledge is yet to be claimed!</h2>
            )}
          </div>
        ) : (
          <p>
            <i style={moveOver}>
              No info. To see pledge info click the button!
            </i>
          </p>
        )}
      </div>
    </>
  );
}
