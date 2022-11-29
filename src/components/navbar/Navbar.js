import React from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="Nav">
      <Link to="/">
        <h1>Home</h1>
      </Link>
      <div className="RightNav">
        <Link to="/Contact">
          <h1>Contact Us</h1>
        </Link>
        <Link to="/About">
          <h1>About Us</h1>
        </Link>
        <Link to="/Login">
          <span className="btnSignIn"><h1>Sign In</h1></span>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
