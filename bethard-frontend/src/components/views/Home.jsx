import React from "react";
import HomeBlurb from "../home-page/homeBlurb/HomeBlurb";

import HomeLogo from "../home-page/homeLogo/HomeLogo";
import HomeRegisterButton from "../home-page/homeRegisterButton/HomeRegisterButton";

import "./Home.css";

function Home() {
    return (
        <div id="home-container">
            <HomeLogo />
            <HomeBlurb />
            <HomeRegisterButton />
        </div>
    );
}

export default Home;
