import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Model from "../model/model";
import { instance } from "../model/AI";

export default function Search({ searchModel, searchChangeModel }) {
  let model = new Model();
  let navigate = useNavigate();

  function handleView() {
    var data = {};
    data["projType"] = document.getElementById("pt").value;
    var body = {};
    body["body"] = JSON.stringify(data);
    let js = JSON.stringify(body);

    instance.post("/searchproject", js).then((response) => {
      console.log(response);

      if (response.data.status === 200) {
        model.projects.push(response.data.result);
        searchChangeModel(model);
        navigate("/supporter/search");
      } else {
        searchChangeModel(searchModel);
      }
    });
  }

  return (
    <>
      <div>
        <input type="text" id="pt"></input>
        Project Type:
        <button onClick={handleView}>Search</button>
      </div>
    </>
  );
}
