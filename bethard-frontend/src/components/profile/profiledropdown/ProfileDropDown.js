import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "../../../shared/provider/UserProvider";
import RoutingPath from "../../../Routes/RoutingPath";
import "./ProfileDropDown.css";
import LocalStorage from "../../../shared/storage/LocalStorage";

export const ProfileDropDown = ({ show }) => {
    const [user, setUser] = useContext(UserContext);
    const navigate = useNavigate();

    let bal = Math.floor(user.wallet.balance);

    const logout = () => {
        localStorage.removeItem(LocalStorage.user);
        setUser(null);
        navigate(RoutingPath.Home);
    };

    const getStyle = () => {
        return show ? { display: "block" } : {};
    };

    return (
        <div id="profiledropdown" style={getStyle()}>
            <span id="name">
                <h3>{user.username}</h3>
            </span>
            <span>
                <h4>Balance:{bal}</h4>
            </span>
            <hr />
            <br />
            <p>Edit Profile</p>
            <p>Settings</p>
            <p onClick={() => logout()}> Log Out</p>
        </div>
    );
};
