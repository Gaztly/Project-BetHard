import React, { useContext } from "react";
import { UserContext } from "../../shared/provider/UserProvider";
import "./UserInfo.css";

function UserInfo() {
    const [user, setUser] = useContext(UserContext);

    return (
        <div id="user-info-container">
            <div id="user-info-background">
                <div className="user-info-username">{user.username}</div>
                <div className="user-info-wallet">
                    <span className="user-info-wallet-text">Balance:</span>
                    <span className="user-info-wallet-amount">
                        {user.wallet.balance}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default UserInfo;
