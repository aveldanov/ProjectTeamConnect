import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
      <h1>

        <Link to="/">
          <i className="fas fa-project-diagram"></i> Project Team Connect
      </Link>
      </h1>

      <ul>
        <li>
          <Link to="/profiles">Managers</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
      </ul>


    </nav>
  )
}

export default Navbar
