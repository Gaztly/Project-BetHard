import React from "react";
import { MatchContent } from "../matchContent/MatchContent";
import "./HomeUpcomingMatches.css";

function HomeUpcomingMatches() {
  return (
    <div id="home-upcoming-matches-container">
      <div id="home-upcoming-matches-inner">
        <MatchContent />
      </div>
    </div>
  );
}

export default HomeUpcomingMatches;
