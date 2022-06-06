import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../shared/provider/UserProvider";
import RoutingPath from "../../../Routes/RoutingPath";
import "./ProfileDropDown.css";
import LocalStorage from "../../../shared/storage/LocalStorage";

export const ProfileDropDown = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  let bal = Math.floor(user.wallet.balance);
  const logout = () => {
    localStorage.removeItem(LocalStorage.user);
    setUser(null);
    navigate(RoutingPath.Home);
  };

  return (
    <div id="profiledropdown">
      <span id="name">{user.username}</span>
      <p>Balance:{bal}</p>
      <hr />
      <br />
      <p>Edit Profile</p>
      <p>Settings</p>
      <p onClick={() => logout()}> Log Out</p>
    </div>
  );
};
