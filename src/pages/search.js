import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Model from "../model/model";
import { instance } from "../model/AI";
import { Project } from "../model/model";

export default function Search({ searchModel, searchChangeModel }) {
  let model = new Model();
  let navigate = useNavigate();
  console.log(searchModel)
  let projects = searchModel.projects;
  console.log(projects)

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
              tempProjects[i].DID
            );
          }
        
        searchChangeModel(model);
        navigate("/supporter/search");
        }
      } 
    });
  }

  return (
    <>
      <h1>Search Project Here!</h1>
      <div>
        <input type="text" id="pt"></input>
        <button onClick={handleView}>Search</button>
      </div>
      <div>
        <nav>
          {projects.length ? (
            <ul>
              {projects.map((proj) => (
                <li key={proj.pid}>
                  <Link to={`/supporter/projects/${proj.pid}`}>
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
