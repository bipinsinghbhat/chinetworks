import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-logo">
          XYZ Solutions
        </Link>
      </div>

      <div className="navbar-links">
        <Link to="/Movie" className="navbar-link">
          Movies
        </Link>

        <Link to="/fav" className="navbar-link">
          Favorite
        </Link>

        <Link to="/" className="navbar-link">
          Signup
        </Link>
        <Link to="/login" className="navbar-link">
          Login
        </Link>
        <Link to="/logout" className="navbar-link">
          Logout
        </Link>
      </div>

      <div className="navbar-toggle">
        <button className="hamburger-icon">
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
