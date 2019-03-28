import React from "react";
import { BrowserRouter as Route, NavLink, Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="row bg-light">
      <nav className="navbar navbar-expand-lg navbar-light bg-light container">
        <Link className="navbar-brand" to="/">
          IBM
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/Users">
                Users
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
      </div>
 
  );
};

export default Navbar;
