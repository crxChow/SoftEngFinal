import Model from "../model/model";
import { instance } from "../model/AI";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Admin({ adminCurModel, adminChangeModel }) {
  let navigate = useNavigate();

  const welcomeBar = {
    marginLeft: 69,
  };
  const projectButton = {
    backgroundColor: "#6987c9",
    color: "white",
    fontSize: 50,
    marginLeft: 69,
    marginBottom: 10,
    padding: 5,
  };
  const reapButton = {
    backgroundColor: "#6987c9",
    color: "white",
    padding: 5,
    marginLeft: 70,
  };

  let allProjects;
  let modelNew = new Model();
  modelNew = adminCurModel;
  allProjects = modelNew.projects;

  function handleReap() {
    var data = {};
    data["email"] = "cp@gmail.com";

    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
    console.log("sent: " + js);

    instance.post("/reapprojects", js).then((response) => {
      console.log(response.data);
    });
  }

  const handleClick = () => {
    let adminModel = new Model();
    var data = {};
    data["AID"] = "admin";

    // to work with API gateway, I need to wrap inside a 'body'
    var body = {};
    body["body"] = JSON.stringify(data);
    var js = JSON.stringify(body);
    console.log("sent: " + js);
    //let result;
    instance.post("/listprojectsadmin", js).then((response) => {
      console.log(response.data.result);

      if (response.data.status === 200) {
        let tempProjects = response.data.result;
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

            adminModel.addProject(
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
          console.log(adminModel);
          console.log("somehow we got here!");
          adminChangeModel(adminModel);
          navigate("/admin");
        } else {
          console.log("you got no projects bro");
          navigate("/admin");
        }
      } else {
        console.log("error time");
      }
    });
  };
  return (
    <>
      <div>
        <h1 style={welcomeBar}>Welcome madame admin!</h1>
        <h2 style={welcomeBar}>You are the owner of this site!</h2>
        <br></br>
        <button style={projectButton} onClick={handleClick}>
          See all of your glorious projects!
        </button>
      </div>
      <div>
        <nav>
          {allProjects.length ? (
            <ul>
              {allProjects.map((project) => (
                <li key={project.id}>
                  <Link to={`projects/${project.pid}`}>
                    {project.name ? <>{project.name}</> : <i>No Name</i>}
                    {""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i style={welcomeBar}>CLICK THE BIG BUTTON</i>
            </p>
          )}
        </nav>
      </div>
      <div>
        <button style={reapButton} onClick={handleReap}>
          Reap Projects
        </button>
      </div>
    </>
  );
}
