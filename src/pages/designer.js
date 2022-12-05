import React from "react";
import { useNavigate } from "react-router-dom";

const projectsbutton = {
  backgroundColor: "blue",
  color: "magenta",
  padding: 0,
};

export default function Designer({ model }) {
  const navigate = useNavigate();

  console.log(model.designer.email);
  const handleMove = () => {
    console.log("bye bitch");
    navigate("/designer/projects");
  };
  return (
    <div>
      <h1>Welcome {model.designer.email}</h1>
      <button style={projectsbutton} onClick={handleMove}>
        List Projects
      </button>
    </div>
  );
}
