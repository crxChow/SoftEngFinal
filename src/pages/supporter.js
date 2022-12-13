import React from "react";
import { useNavigate, Link } from "react-router-dom";
const welcomeBar = {
  marginLeft: 70,
};

const projectscreatebutton = {
  backgroundColor: "#FF7E6B",
  color: "white",
  padding: 5,
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

  return (
    <>
      <div>
        <h1 style={welcomeBar}>Welcome {supModel.supporter.email}</h1>
      </div>
      <div style={welcomeBar}>You have: $ {supModel.supporter.budget}</div>
      <div>
        <button style={projectscreatebutton} onClick={handleSearch}>
          Search projects{" "}
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
