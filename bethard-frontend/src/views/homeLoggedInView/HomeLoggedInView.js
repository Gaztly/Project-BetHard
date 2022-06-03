import React from "react";
import HomeMainContent from "../../components/home-page/homeMainContent/HomeMainContent";
import HomeSideBar from "../../components/home-page/homeSideBar/HomeSideBar";
import { UserContext } from "../../shared/provider/UserProvider";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import LocalStorage from "../../shared/storage/LocalStorage";
import RoutingPath from "../../Routes/RoutingPath";
import "./HomeLoggedInView.css";

function HomeLoggedInView() {
  const [user, setUser] = useContext(UserContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(LocalStorage.user);
    setUser(null);
    navigate(RoutingPath.Home);
  };
  return (
    <>
      <div id="home-logged-in-container">
        <HomeSideBar />

        <HomeMainContent />
      </div>
      <div className="btn-container">
        <button id="logout-btn" onClick={() => logout()}>
          Log Out
        </button>
      </div>
    </>
  );
}

export default HomeLoggedInView;
