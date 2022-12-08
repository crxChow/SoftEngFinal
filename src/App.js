import React, { useState, useEffect } from "react";
import Model from "./model/model.js";
import "./App.css";
import Navbar from "./comps/index";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Designer from "./pages/designer";
import Supporter from "./pages/supporter.js";
import ProjectPage from "./pages/projects.js";
import ErrorPage from "./error-page.jsx";
import Admin from "./pages/admin.js";
import Edit from "./pages/editProject.js";
import CreatePledge from "./pages/createPledge.js";
import PledgePage from "./pages/pledgePage.js";
import Search from "./pages/search.js";
//import "./mock/mock.js";

function App() {
  //const [model, setModel] = useOutletContext
  //const MyContext = React.createContext([model, setModel]);
  const [model, setModel] = useState(new Model());
  const [redraw, forceRedraw] = React.useState(0);
  //const appRef = React.useRef(null);
  //const canvasRef = React.useRef(null);

  //console.log(model);

  useEffect(() => {
    forceRedraw(redraw);
    console.log(model);
  }, [model, redraw]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/login" element={<Login newerModel={setModel} />} />
        <Route path="/register" element={<Register newModel={setModel} />} />
        <Route
          path="/designer"
          element={<Designer newerModel={model} changeModel={setModel} />}
        />
        <Route
          path="/supporter"
          element={<Supporter supModel={model} supChangeModel={setModel} />}
        />
        <Route
          path="/supporter/search"
          element={<Search searchModel={model} searchChangeModel={setModel} />}
        />
        <Route
          path="/designer/projects/:projectID"
          element={<ProjectPage niceModel={model} dopeModel={setModel} />}
        />

        <Route
          path="/designer/projects/edit"
          element={<Edit evennewerModel={model} changingModel={setModel} />}
        />

        <Route
          path="/designer/projects/:projectID/create"
          element={<CreatePledge pledgeModel={model} pModel={setModel} />}
        />
        <Route
          path="/designer/pledge/:pledgeID"
          element={
            <PledgePage pledgePageModel={model} pledgePageEdit={setModel} />
          }
        />
        <Route
          path="/admin"
          element={<Admin adminCurModel={model} adminChangeModel={setModel} />}
        />
        {/*this is the error page*/}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
