import React from "react";
import { useNavigate } from "react-router-dom";
import RoutingPath from "../../../Routes/RoutingPath";
import "./HomeRegisterButton.css";

function HomeRegisterButton() {
    const navigate = useNavigate();
    return (
        <div id="home-register-button-container">
            <button
                id="home-register-button"
                onClick={() => navigate(RoutingPath.Register)}
            >
                Register now!
            </button>
        </div>
    );
}

export default HomeRegisterButton;
