import React from "react";
import HomeLogo from "../../components/home-page/homeLogo/HomeLogo";
import HomeBlurb from "../../components/home-page/homeBlurb/HomeBlurb";
import HomeRegisterButton from "../../components/home-page/homeRegisterButton/HomeRegisterButton";
import "./HomeGuestView.css";
import LoginModal from "../../components/loginModal/LoginModal";
import { MatchContent } from "../../components/home-page/matchContent/MatchContent";
function HomeGuestView() {
  return (
    <div id="home-guest-container">
      <div id="home-guest-background-image">
        <LoginModal />
        <MatchContent />
        <HomeLogo />
        <HomeBlurb />
        <HomeRegisterButton />
      </div>
    </div>
  );
}

export default HomeGuestView;
