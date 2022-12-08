import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Model from "../model/model";
import { instance } from "../model/AI";
import { Project } from "../model/model";

export default function Search({ searchModel, searchChangeModel }) {
  let model = new Model();
  let navigate = useNavigate();

  function handleView() {
    var data = {};
    data["projType"] = document.getElementById("pt").value;
    var body = {};
    body["body"] = JSON.stringify(data);
    let js = JSON.stringify(body);

    instance.post("/searchprojects", js).then((response) => {
      console.log(response.data.result);
      let p = response.data.result;

      if (response.data.status === 200) {
        model.projects = response.data.result;
        searchChangeModel(model);
        navigate("/supporter/search");
      } else {
        searchChangeModel(searchModel);
      }
    });
  }

  return (
    <>
      <h1>Search Project Here!</h1>
      <div>
        <input type="text" id="pt"></input>
        Project Type:
        <button onClick={handleView}>Search</button>
      </div>
      <div>
        <nav>
          {searchModel.projects.length ? (
            <ul>
              {searchModel.projects.map((proj) => (
                <li key={proj.pid}>
                  <Link to={`../supporter/search/${proj.pid}`}>
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
