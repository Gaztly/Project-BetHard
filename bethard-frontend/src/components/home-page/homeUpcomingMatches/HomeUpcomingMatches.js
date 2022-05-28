import React from "react";
import "./HomeUpcomingMatches.css";
import Matches from "../home-matches/Matches";

function HomeUpcomingMatches() {
    return (
        <div id="home-upcoming-matches-container">
            <div id="home-upcoming-matches-inner">
                <Matches />
                Här ska det vara matcher sen
            </div>
        </div>
    );
}

export default HomeUpcomingMatches;
