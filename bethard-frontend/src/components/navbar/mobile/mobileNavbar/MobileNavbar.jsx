import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MobileNavbarButton } from "../mobileNavbarButton/MobileNavbarButton";
import "./MobileNavbar.css";

function MobileNavbar({ click, setClick }) {
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
    useEffect(() => {
        showButton();
    }, []);

    window.addEventListener("resize", showButton);

    return (
        <>
            <div className="menu-icon" onClick={handleClick}>
                <i className={click ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
                <li className="nav-item">
                    <Link
                        to="/"
                        className="nav-links"
                        onClick={closeMobileMenu}
                    >
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link
                        to="/Login"
                        className="nav-links"
                        onClick={closeMobileMenu}
                    >
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
        </>
    );
}

export default MobileNavbar;
