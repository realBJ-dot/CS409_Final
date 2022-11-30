import React, { useState, useEffect } from "react";
import "./navbar.css";
import { Link } from "react-router-dom";
import Button from "../button/Button";
const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => {
    setClick(!click);
  };
  const [button, setButton] = useState(true);
  const closeMobileMenu = () => {
    setClick(false);
  };
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };
  window.addEventListener("resize", showButton);

  useEffect(() => {
    showButton();
  }, []);
  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
            <i class="fa-solid fa-sack-dollar"></i> EPTK
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/About" className="nav-links" onClick={closeMobileMenu}>
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/Login"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Log In
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn-outline0" >Log In</Button>}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
