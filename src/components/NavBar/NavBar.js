import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function NavBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">JENCAFE</Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/productos">Productos</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/acceso">Login Usuarios</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/uso_interno">Uso Interno</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default NavBar;
