import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import MobileNavbar from "../mobile/mobileNavbar/MobileNavbar";
import "./Navigation.css";
import RoutingPath from "../../../Routes/RoutingPath";
import DesktopNavbar from "../desktop/desktopnavbar/DesktopNavbar";
import { useLocation } from "react-router-dom";
import { UserContext } from "../../../shared/provider/UserProvider";
import { Profile } from "../../../components/profile/Profile";

function Navigation() {
  const [click, setClick] = useState(false);
  const currentRoute = useLocation();
  const [user, setUser] = useContext(UserContext);
  let bal = Math.floor(user?.wallet?.balance);
  const closeMobileMenu = () => setClick(false);

  const getNavbar = () => {
    return currentRoute.pathname !== RoutingPath.Register ? (
      <>
        <DesktopNavbar /> <MobileNavbar click={click} setClick={setClick} />
      </>
    ) : (
      <MobileNavbar click={click} setClick={setClick} />
    );
  };

  return (
    <nav className={user ? "navbar navbar-center" : "navbar"}>
      <div className="navbar-container">
        <Link
          to={RoutingPath.Home}
          className={user ? "navbar-logo" : "navbar-logo navbar-logo-left"}
          onClick={closeMobileMenu}
        >
          BetHard <i class="fa-solid fa-money-bill-1"></i>
        </Link>
      </div>
      {!user && getNavbar()}

      {user ? <Profile /> : null}
      <div id="user-info">
        {user ? (
          <span>
            {" "}
            {user.username} <br />
            <hr />
            <span id="user-info-cash">{bal} Funs</span>
          </span>
        ) : null}
      </div>
    </nav>
  );
}

export default Navigation;
