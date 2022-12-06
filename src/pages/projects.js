import { Link } from "react-router-dom";

export default function Project({ curModel }) {
  console.log(curModel);
  const projects = curModel.projects;
  return (
    <>
      <div>
        <nav>
          {projects.length ? (
            <ul>
              {projects.map((project) => (
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
              <i>No Projects</i>
            </p>
          )}
        </nav>
      </div>
      
    </>
  );
}
