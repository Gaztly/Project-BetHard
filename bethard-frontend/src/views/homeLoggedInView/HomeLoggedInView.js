import React from "react";
import HomeMainContent from "../../components/home-page/homeMainContent/HomeMainContent";
import HomeSideBar from "../../components/home-page/homeSideBar/HomeSideBar";
import Matches from "../../components/home-page/home-matches/Matches";
import "./HomeLoggedInView.css";

function HomeLoggedInView() {
    return (
        <div id="home-logged-in-container">
            <HomeSideBar />
            <HomeMainContent />
        </div>
    );
}

export default HomeLoggedInView;
