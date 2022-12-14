import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Model from "../model/model";
import { instance } from "../model/AI";
const welcomeBar = {
  marginLeft: 70,
};

const inputfield = {
  marginLeft: 70,
  marginBottom: 5,
  textSize: 30,
  padding: 5,
  width: 200,
};

const addFundsButton = {
  backgroundColor: "#6987c9",
  color: "white",
  padding: 5,
  marginLeft: 5,
};

const reviewButton = {
  backgroundColor: "#6987c9",
  color: "white",
  padding: 5,
  marginLeft: 70,
  marginTop: 10,
};

const projectscreatebutton = {
  backgroundColor: "#FF7E6B",
  color: "white",
  padding: 5,
  marginLeft: 70,
  marginTop: 10,
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
const movedOver = {
  marginLeft: 70,
};

export default function Supporter({ supModel, supChangeModel }) {
  console.log(supModel);
  const navigate = useNavigate();
  console.log(supModel.supporter.email);
  console.log(supModel.supporter.sid);
  const pledges = supModel.supporter.pledges;
  const drs = supModel.supporter.directSupport;
  console.log(pledges);

  function handleSearch() {
    supChangeModel(supModel);
    navigate("/supporter/search");
  }

  function reviewActivity() {
    let modelAgain = new Model();

    var data = {};
    data["email"] = supModel.supporter.email;
    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);

    instance.post("/reviewsupactivity", js).then((response) => {
      console.log(response.data.result);
      let tempResponse = response.data.result;
      console.log(tempResponse);

      if (response.status === 200) {
        modelAgain.addFullSupporter(
          tempResponse.email,
          tempResponse.SID,
          tempResponse.name,
          tempResponse.password,
          tempResponse.budget,
          tempResponse.pledges,
          tempResponse.projects
        );
        console.log(modelAgain);
        supChangeModel(modelAgain);
        navigate("/supporter");
      } else {
        console.log("oops");
      }
    });
  }

  function addFunds() {
    let fundsAdd = document.getElementById("funds").value;

    let modelAgain = new Model();

    var data = {};
    data["email"] = supModel.supporter.email;
    data["funds"] = fundsAdd;
    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);

    instance.post("/addfunds", js).then((response) => {
      console.log(response.data.result);
      let tempResponse = response.data.result;
      console.log(tempResponse);

      if (response.status === 200) {
        modelAgain.addFullSupporter(
          tempResponse.email,
          tempResponse.SID,
          tempResponse.name,
          tempResponse.password,
          tempResponse.budget,
          [],
          []
        );
        console.log(modelAgain);
        modelAgain.projects = supModel.projects;
        supChangeModel(modelAgain);
        navigate("/supporter");
      } else {
        console.log("oops");
      }
    });
  }

  return (
    <>
      <div>
        <h1 style={welcomeBar}>Welcome {supModel.supporter.email}</h1>
      </div>
      <div style={welcomeBar}>You have: $ {supModel.supporter.budget}</div>
      <br></br>
      <input
        style={inputfield}
        placeholder="Funds to add!"
        type="text"
        id="funds"
      ></input>
      <button style={addFundsButton} onClick={addFunds}>
        Add Funds
      </button>
      <br></br>
      <div>
        <button style={projectscreatebutton} onClick={handleSearch}>
          Click to Search Projects
        </button>
      </div>
      <div>
        <button style={reviewButton} onClick={reviewActivity}>
          Review Activity
        </button>
      </div>
      <div>
        <nav style={movedOver}>
          {pledges.length ? (
            <ul style={backStyle}>
              {pledges.map((pledge) => (
                <li style={listSpaceStyle} key={pledge.id}>
                  <Link style={listStyle} to={`pledges/${pledge.plid}`}>
                    {pledge.name ? <>{pledge.name}</> : <i>No Name</i>}
                    {""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No pledges</i>
            </p>
          )}
        </nav>
      </div>
      <div>
        <nav style={movedOver}>
          {drs.length ? (
            <ul style={backStyle}>
              {drs.map((dr) => (
                <li style={listSpaceStyle} key={dr.id}>
                  <Link style={listStyle} to={`pledges/${dr.plid}`}>
                    {dr.name ? <>{dr.name}</> : <i>No Name</i>}
                    {""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No direct support</i>
            </p>
          )}
        </nav>
      </div>
    </>
  );
}
