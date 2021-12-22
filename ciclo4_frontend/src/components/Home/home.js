//import { Link } from 'react-router-dom';
import inicio from './inicio.jpg';
import NavBar from '../nav/nav';
// import Cards from "./components/Cards";

import React from "react";
const Home = () => {

  return (
    <div>
      <NavBar pagina={"/home"} />
      {/* <Logout/> */}
      <h1 className="text-center mt-5 mb-5">Pagina de Inicio</h1>
      <div className="text-center justify-content-center align-items-center">
        <img style={{ width: "50%", height: "50%" }} src={inicio} alt="logo" />
      </div>
    </div>
  );
};

export default Home;