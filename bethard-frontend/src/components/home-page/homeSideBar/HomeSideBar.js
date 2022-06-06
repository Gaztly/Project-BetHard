import React from "react";
import HomeBets from "./homeBets/HomeBets";

import "./HomeSideBar.css";

function HomeSideBar() {
    return (
        <div class="home-sidebar-container">
            <div class="home-sidebar-header-text"></div>
            <HomeBets />
        </div>
    );
}

export default HomeSideBar;
