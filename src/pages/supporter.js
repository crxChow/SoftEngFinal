import React from "react";
import { Link } from "react-router-dom";
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
  //const navigate = useNavigate();
  console.log(supModel.supporter.email);
  console.log(supModel.supporter.sid);
  const pledges = supModel.supporter.pledges;
  const drs = supModel.supporter.directSupport;
  console.log(pledges);
  /*
  const handleMove = () => {
    let projModel = new Model();
    projModel.addSupporter(newerModel.supporter.email, newerModel.supporter.sid);
    console.log(projModel);
    var data = {};
    data["DID"] = newerModel.supporter.sid;

    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
    console.log("sent: " + js);
    //let result;
    instance.post("/listprojectssup", js).then((response) => {
      console.log(response.data.result);

      if (response.data.status === 200) {
        let tempProjects = JSON.parse(response.data.result);
        console.log(tempProjects);
        //result = response.data.result;

        //return response.data.result ?? null;
        //model.addDesigner(username, response.data.projects);
        if (tempProjects.length !== 0) {
          for (let i = 0; i < tempProjects.length; i++) {
            /*console.log(tempProjects[i].name);
            console.log(tempProjects[i].PJID);
            console.log(tempProjects[i].description);
            console.log(tempProjects[i].date);
            console.log(tempProjects[i].projtype);
            console.log(tempProjects[i].goalAmt);
            console.log(tempProjects[i].DID);*/
  /*
            projModel.designer.addProject(
              tempProjects[i].name,
              tempProjects[i].PJID,
              tempProjects[i].description,
              tempProjects[i].date,
              tempProjects[i].projType,
              tempProjects[i].goalAmt,
              tempProjects[i].DID
            );
          }
          //dont delete
          console.log(projModel);
          console.log("somehow we got here!");
          changeModel(projModel);
          navigate("/designer");
        } else {
          console.log("you got no projects bro");
          navigate("/designer");
        }
      } else {
        console.log("error time");
      }
    });
    
  };*/
  return (
    <>
      <div>
        <h1>Welcome {supModel.supporter.email}</h1>
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
