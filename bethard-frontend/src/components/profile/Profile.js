import React, { useContext, useState } from "react";
import "./Profile.css";
import { UserContext } from "../../shared/provider/UserProvider";
import { ProfileDropDown } from "./profiledropdown/ProfileDropDown";
import "./profiledropdown/ProfileDropDown.css";
export const Profile = () => {
  const [user, setUser] = useContext(UserContext);

  return (
    <>
      <div className="box"></div>
      <div id="profile">
        Menu
        <ProfileDropDown />
      </div>
    </>
  );
};
