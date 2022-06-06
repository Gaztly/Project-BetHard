import React from "react";
import UserInfo from "../../userInfo/UserInfo";
import HomeUpcomingMatches from "../homeUpcomingMatches/HomeUpcomingMatches";

import "./HomeMainContent.css";

function HomeMainContent() {
  return (
    <div id="home-main-content-container">
      {/* <UserInfo /> */}
      <HomeUpcomingMatches />
    </div>
  );
}

export default HomeMainContent;
