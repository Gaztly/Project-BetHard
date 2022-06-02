import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileNavbar from "../mobile/mobileNavbar/MobileNavbar";
import "./Navigation.css";
import RoutingPath from "../../../Routes/RoutingPath";
import DesktopNavbar from "../desktop/desktopnavbar/DesktopNavbar";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../shared/provider/UserProvider";

function Navigation() {
    const [click, setClick] = useState(false);
    const currentRoute = useLocation();
    const [user, setUser] = useContext(UserContext);

    const closeMobileMenu = () => setClick(false);

    const getNavbar = () => {
        return currentRoute.pathname !== RoutingPath.Register ? (
            <>
                <DesktopNavbar />{" "}
                <MobileNavbar click={click} setClick={setClick} />
            </>
        ) : (
            <MobileNavbar click={click} setClick={setClick} />
        );
    };

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
            </div>
            {!user && getNavbar()}
        </nav>
    );
}

export default Navigation;
