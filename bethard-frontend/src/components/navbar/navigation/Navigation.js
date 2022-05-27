import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileNavbar from "../mobile/mobileNavbar/MobileNavbar";
import "./Navigation.css";
import RoutingPath from "../../../Routes/RoutingPath";

function Navigation() {
  const [click, setClick] = useState(false);
  const closeMobileMenu = () => setClick(false);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link
                    to={RoutingPath.Home}
                    className="navbar-logo"
                    onClick={closeMobileMenu}
                >
                    BetHard <i class="fa-solid fa-money-bill-1"></i>
                </Link>
                <MobileNavbar click={click} setClick={setClick} />
            </div>
        </nav>
    );
}

export default Navigation;
