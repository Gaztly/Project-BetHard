import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../shared/provider/UserProvider";
import login from "../../shared/api/services/login-service";
import "./LoginModal.css";
import LocalStorage from "../../shared/storage/LocalStorage";
import RoutingPath from "../../Routes/RoutingPath";

function LoginModal() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const [user, setUser] = useContext(UserContext);

    const submit = async () => {
        const userObject = await login(username, password);

        if (userObject.status !== 200) {
            console.log("No user");
            setErrorMessage(userObject.data);
            return;
        }

        setUser(userObject.data);
        console.log("test");
        localStorage.setItem(
            LocalStorage.user,
            JSON.stringify(userObject.data)
        );

        navigate(RoutingPath.Home);
    };

    return (
        <div id="login-modal-container">
            <div id="login-modal-window">
                <div id="login-modal-input-container">
                    <div className="login-modal-warning-text">
                        {errorMessage}
                    </div>
                    <input
                        className="login-modal-input"
                        type="text"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="login-modal-input"
                        type="text"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button className="login-modal-button" onClick={() => submit()}>
                    ENTER
                </button>
            </div>
        </div>
    );
}

export default LoginModal;
