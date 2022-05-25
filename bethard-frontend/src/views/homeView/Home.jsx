import React from "react";
import HomeBlurb from "../../components/home-page/homeBlurb/HomeBlurb";

import HomeLogo from "../../components/home-page/homeLogo/HomeLogo";
import HomeRegisterButton from "../../components/home-page/homeRegisterButton/HomeRegisterButton";

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
