import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../button/Button";
import "./Navbar.css";

function Navbar() {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [button, setButton] = useState(true);
  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener("resize", showButton);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            BetHard <i class="fa-solid fa-money-bill-1"></i>
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
              <Link to="/Login" className="nav-links" onClick={closeMobileMenu}>
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/Register"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Register
              </Link>
            </li>
          </ul>
          {button && <Button buttonStyle="btn--outline"> Register</Button>}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
