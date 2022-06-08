import React, { useContext, useRef, useState } from "react";
import "./Profile.css";
import { ProfileDropDown } from "./profiledropdown/ProfileDropDown";
import "./profiledropdown/ProfileDropDown.css";
export const Profile = () => {
    const [showDropDown, setShowDropDown] = useState(false);
    const profileRef = useRef();

    const handleClick = () => {
        console.log("click");
        setShowDropDown(!showDropDown);

        document.addEventListener("click", clickOutside);
    };

    //Hanterar klick utanför menyn
    const clickOutside = (e) => {
        if (!profileRef.current || profileRef.current.contains(e.target))
            return;
        setShowDropDown(false);
        document.removeEventListener("click", clickOutside);
    };

    return (
        <div className="page-cover">
            <div className="box"></div>
            <div ref={profileRef} id="profile" onClick={() => handleClick()}>
                Menu
                <ProfileDropDown show={showDropDown} />
            </div>
        </div>
    );
};
