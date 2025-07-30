import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/beautiful.css';

const Navbar = () => (
  <nav className="app-navbar">
    <div className="nav-title">URL Shortener</div>
    <div className="nav-links">
      <Link className="nav-link" to="/">Url_short</Link>
      <Link className="nav-link" to="/stats">Stats</Link>
    </div>
  </nav>
);

export default Navbar;
