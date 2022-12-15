import { instance } from "../model/AI";
import Model from "../model/model";
import { useNavigate } from "react-router-dom";

export default function PledgePage({ pledgePageModel, pledgePageEdit }) {
  const pledgeID = window.location.href.split("/designer/pledge/")[1];
  let navigate = useNavigate(0);
  let poj = new Model();
  poj.project = pledgePageModel.project;
  console.log(pledgeID);
  console.log(pledgePageModel);
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
  const deletePledgeButton = {
    backgroundColor: "#6987c9",
    color: "white",
    textSize: 20,
    marginLeft: 20,
    marginBottom: 10,
    padding: 5,
    width: 215,
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
    color: "black",
    padding: 5,
    marginLeft: 70,
  };
  console.log("loop time");

  function handleDelete() {
    var data = {};
    data["PLID"] = pledgeID;
    var body = {};
    body["body"] = JSON.stringify(data);
    let js = JSON.stringify(body);
    console.log(js);

    instance.post("/deletepledge", js).then((response) => {
      console.log(response);
      if (response.data.result === "delete success") {
        /*deleteModel.designer.projects.splice(
              deleteModel.designer.projects.indexOf(proj),
              1
            );*/
        let newMod = new Model();
        newMod.designer = pledgePageModel.designer;
        pledgePageEdit(newMod);
        navigate("/designer");
      } else {
        console.log("not deleted");
        navigate(`../designer/pledge/${pledgeID}`);
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
      console.log(poj);
      console.log(response.data.result);

      if (response.data.status === 200) {
        if (response.data.result.length !== 0) {
          poj.pledges = response.data.result;
          poj.designer = pledgePageModel.designer;
          console.log(poj);
          pledgePageEdit(poj);
          navigate(`../designer/pledge/${pledgeID}`);
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
        <button style={deletePledgeButton} onClick={handleDelete}>
          Delete pledge!
        </button>
      </div>
      <div>
        {pledgePageModel.pledges.pledge ? (
          <div>
            <h1 style={moveOver}>
              Name: {pledgePageModel.pledges.pledge[0].name}
            </h1>
            <br></br>
            <h2 style={moveOver}>
              Reward: {pledgePageModel.pledges.pledge[0].reward}
            </h2>
            <br></br>
            <h2 style={moveOver}>
              Cost: {pledgePageModel.pledges.pledge[0].amount}
            </h2>
            <br></br>
            <h2 style={moveOver}>
              Goal: {pledgePageModel.pledges.pledge[0].maxSupport}
            </h2>
            {pledgePageModel.pledges.supporters.length ? (
              <ul style={backStyle}>
                <h2>Pledge Claims</h2>
                {pledgePageModel.pledges.supporters.map((supporter) => (
                  <li style={listSpaceStyle}>
                    <div style={listStyle}>
                      {supporter.email ? (
                        <>{supporter.email}</>
                      ) : (
                        <i>No Name</i>
                      )}
                      {""}
                    </div>
                  </li>
                ))}
              </ul>
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
