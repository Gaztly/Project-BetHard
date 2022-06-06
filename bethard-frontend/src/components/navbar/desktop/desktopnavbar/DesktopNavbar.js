import React, { useState, useContext } from "react";
import RoutingPath from "../../../../Routes/RoutingPath";
import LoginModal from "../../../loginModal/LoginModal";
import DesktopNavbarButton from "../desktopnavbarbutton/DesktopNavbarButton";
import "./DesktopNavbar.css";

function DesktopNavbar() {
  const [showLogin, setShowLogin] = useState(false);
  const toggleLogin = () => setShowLogin(!showLogin);

  return (
    <div className="desktop-navbar-container">
      <div className="desktop-navbar-buttons-container">
        <DesktopNavbarButton
          text="Login"
          route={null}
          clickFunction={toggleLogin}
        />
        <DesktopNavbarButton text="Register" route={RoutingPath.Register} />
      </div>
      {showLogin && <LoginModal />}
    </div>
  );
}

export default DesktopNavbar;
