import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Model from "../model/model";
import { instance } from "../model/AI";
//import { Project } from "../model/model";

export default function Search({ searchModel, searchChangeModel }) {
  let model = new Model();
  let navigate = useNavigate();
  console.log(searchModel);
  let projects = searchModel.projects;
  console.log(projects);

  const searchButton = {
    backgroundColor: "#6987c9",
    color: "white",
    textSize: 30,
    marginLeft: 5,
    padding: 5,
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

  function handleView() {
    var data = {};
    data["projType"] = document.getElementById("pt").value;
    var body = {};
    body["body"] = JSON.stringify(data);
    let js = JSON.stringify(body);

    instance.post("/searchprojects", js).then((response) => {
      console.log(response.data.result);
      let tempProjects = response.data.result;

      if (response.data.status === 200) {
        if (tempProjects.length !== 0) {
          for (let i = 0; i < tempProjects.length; i++) {
            model.addProject(
              tempProjects[i].name,
              tempProjects[i].PJID,
              tempProjects[i].description,
              tempProjects[i].date,
              tempProjects[i].projType,
              tempProjects[i].goalAmt,
              tempProjects[i].desName,
              tempProjects[i].currentAmt
            );
          }
          model.supporter = searchModel.supporter;
          searchChangeModel(model);
          navigate("/supporter/search");
        }
      }
    });
  }

  return (
    <>
      <h1 style={welcomeBar}>Search Project Here!</h1>
      <div>
        <input
          style={inputfield}
          type="text"
          id="pt"
          placeholder="Search by Genre"
        ></input>
        <button style={searchButton} onClick={handleView}>
          Search
        </button>
      </div>
      <div>
        <nav style={movedOver}>
          {projects.length ? (
            <ul style={backStyle}>
              {projects.map((proj) => (
                <li style={listSpaceStyle} key={proj.pid}>
                  <Link
                    style={listStyle}
                    to={`/supporter/projects/${proj.pid}`}
                  >
                    {proj.name ? <>{proj.name}</> : <i>No Name</i>}
                    {""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No matching Projects, Search to find ones!</i>
            </p>
          )}
        </nav>
      </div>
    </>
  );
}
