import React from "react";
import Model from "./model/model.js";
import "./App.css";
import Navbar from "./comps/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Designer from "./pages/designer";
import Project from "./pages/projects.js";
import ErrorPage from "./error-page.jsx";

function App() {
  //const [model, setModel] = useOutletContext
  //const MyContext = React.createContext([model, setModel]);
  const [model, setModel] = React.useState(new Model());
  const [redraw, forceRedraw] = React.useState(0);
  //const appRef = React.useRef(null);
  //const canvasRef = React.useRef(null);

  //console.log(model);

  React.useEffect(() => {
    forceRedraw(redraw);
    console.log(model);
  }, [model, redraw]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login newModel={setModel} />} />
        <Route path="/register" element={<Register newModel={setModel} />} />
        <Route path="/designer" element={<Designer model={model} />} />
        <Route path="/designer/projects" element={<Project model={model} />} />
        {/*this is the error page*/}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
