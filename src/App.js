import React from 'react';
import Model from "./model/model.js";
import './App.css';
import Navbar from './comps/index';
import { BrowserRouter as Router, Routes, Route}
	from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import { Outlet } from 'react-router-dom';


function App() {
  const [model, setModel] = React.useState(new Model());
  
  //const MyContext = React.createContext([model, setModel]);
  const [redraw, forceRedraw] = React.useState(0);
  const appRef = React.useRef(null);
  const canvasRef = React.useRef(null);
  

  //console.log(model);

  React.useEffect(() => {
    //redrawModel(model, canvasRef.current);
  }, [model, redraw]);


return (
	<Router>
	<Navbar />
	<Routes>
		<Route exact path='/' element={<Home />} />
		<Route path='/login' element={<Login/>} />
    <Route path='/register' element={<Register rModel = {model} />} />
	</Routes>
  <Outlet context ={[model, setModel]} />
	</Router>

);
}

export default App;

