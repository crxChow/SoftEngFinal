import React from 'react';
import Model from "./model/model.js";
import './App.css';
import Navbar from './comps/index';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter}
	from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Outlet, useOutletContext } from 'react-router-dom';
import { Controller } from './controller/controller.js';


function App() {
  //const [model, setModel] = useOutletContext
  //const MyContext = React.createContext([model, setModel]);
  const [model, setModel] = React.useState(new Model());
  const [redraw, forceRedraw] = React.useState(0);
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  
  //console.log(model);

  React.useEffect(() => {
    forceRedraw(redraw + Controller(model));
    console.log(model); 
  }, [model, redraw]);

return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' element={<Home />} />
		<Route path='/login' element={<Login />} />
    <Route path='/register' element={<Register />} />
	</Routes>
	</Router>

);
}

export default App;


