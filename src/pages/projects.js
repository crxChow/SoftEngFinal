import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const projectsbutton = {
  backgroundColor: "blue",
  color: "magenta",
  padding: 0,
};

export default function Project({ niceModel }) {
  const navigate = useNavigate();
  console.log(niceModel);
  let pid = window.location.href.split('/projects/')[1];
  console.log(pid);
  let project;
  let pledges;
  for(let i = 0; i <= niceModel.designer.projects.length; i++){
    if(pid === niceModel.designer.projects[i].pid){
      project = niceModel.designer.projects[i];
      pledges = niceModel.designer.projects[i].pledge;
      console.log(pledges);
      break;
    }
  }
  console.log(project);

  function handleView(){

  }

  function handleCreate(){
    navigate("/designer/projects/"+pid+"/create");
  }
  return (
    <>
      <div>
        <h1>Name: {project.name}</h1>
        <br></br>
        <h2>Description: {project.description}</h2>
        <br></br>
        <h2>Date: {project.date}</h2>
        <br></br>
        <h2>Goal: {project.goal}</h2>
        <br></br>
        <h2>DID: {project.designer}</h2>
      </div>
      <div>
      <button style={projectsbutton} onClick={handleView}>
          List Pledges
        </button>
        <button style={projectsbutton} onClick={handleCreate}>
          Create Pledge
        </button>
      <nav>
          {pledges.length ? (
            <ul>
              {pledges.map((pledge) => (
                <li key={pledge.plid}>
                  <Link to={`pledge/${pledge.plid}`}>
                    {pledge.name ? <>{pledge.name}</> : <i>No Name</i>}
                    {""}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>You Got No pledges Bro</i>
            </p>
          )}
        </nav>
        </div>
    </>
  );
}
