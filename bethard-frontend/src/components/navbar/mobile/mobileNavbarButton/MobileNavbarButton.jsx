import React from "react";
import "./MobileNavbarButton.css";
import { Link } from "react-router-dom";

const STYLES = ["mobile-navbar-btn--primary", "mobile-navbar-btn--outline"];

const SIZES = ["mobile-navbar-btn--medium", "mobile-navbar-btn--large"];

export const MobileNavbarButton = ({
    children,
    type,
    onClick,
    buttonStyle,
    buttonSize,
}) => {
    const checkButtonStyle = STYLES.includes(buttonStyle)
        ? buttonStyle
        : STYLES[0];
    const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];

    return (
        <Link to="/Register" classname="mobile-navbar-btn-mobile">
            <button
                className={`mobile-navbar-btn ${checkButtonStyle} ${checkButtonSize}`}
                onClick={onClick}
                type={type}
            >
                {children}
            </button>
        </Link>
    );
};
