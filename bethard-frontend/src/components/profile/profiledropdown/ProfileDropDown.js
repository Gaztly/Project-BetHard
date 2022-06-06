import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../shared/provider/UserProvider";
import RoutingPath from "../../../Routes/RoutingPath";
import "./ProfileDropDown.css";
import LocalStorage from "../../../shared/storage/LocalStorage";

export const ProfileDropDown = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem(LocalStorage.user);
    setUser(null);
    navigate(RoutingPath.Home);
  };

  return (
    <div id="profiledropdown">
      <p>Balance:{user.wallet.balance}</p>
      <hr />
      <br />
      <p>Edit Profile</p>
      <p>Settings</p>
      <p onClick={() => logout()}> Log Out</p>
    </div>
  );
};
