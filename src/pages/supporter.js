import React from "react";
import { useNavigate, Link } from "react-router-dom";
//import { instance } from "../model/AI";
//import Model from "../model/model";
//import { useLoaderData } from "react-router-dom";

/*const projectsbutton = {
  backgroundColor: "blue",
  color: "magenta",
  padding: 0,
};
*/

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
        <h1>Welcome {supModel.supporter.email}</h1>
      </div>
      <div>
        <button onClick={handleSearch}>Search projects </button>
      </div>
      <div>
        <nav>
          {pledges.length ? (
            <ul>
              {pledges.map((pledge) => (
                <li key={pledge.id}>
                  <Link to={`pledges/${pledge.plid}`}>
                    {pledge.name ? <>{pledge.name}</> : <i>No Name</i>}
                    {""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>You Got No Pledges Bro</i>
            </p>
          )}
        </nav>
      </div>
      <div>
        <nav>
          {drs.length ? (
            <ul>
              {drs.map((dr) => (
                <li key={dr.id}>
                  <Link to={`pledges/${dr.plid}`}>
                    {dr.name ? <>{dr.name}</> : <i>No Name</i>}
                    {""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>You Got No Direct Support Bro</i>
            </p>
          )}
        </nav>
      </div>
    </>
  );
}
