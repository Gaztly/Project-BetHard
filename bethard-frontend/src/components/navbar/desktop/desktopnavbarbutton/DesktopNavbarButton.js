import React from "react";
import { useNavigate } from "react-router-dom";

import "./DesktopNavbarButton.css";

function DesktopNavbarButton({ text, route, clickFunction }) {
    const navigate = useNavigate();

    const onClickHandler = () => {
        route !== null ? navigate(route) : clickFunction();
    };

    return (
        <div className="desktop-navbar-button" onClick={() => onClickHandler()}>
            {text}
        </div>
    );
}

export default DesktopNavbarButton;
