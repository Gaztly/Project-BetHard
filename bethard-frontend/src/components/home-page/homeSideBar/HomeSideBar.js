import React from "react";
import HomeBets from "../homeMainContent/homeBets/HomeBets";

import "./HomeSideBar.css";

function HomeSideBar() {
    return (
        <div class="home-sidebar-container">
            <div class="home-sidebar-header-text">YOUR BETS</div>
            <HomeBets />
        </div>
    );
}

export default HomeSideBar;
