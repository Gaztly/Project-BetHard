import React, { useState, useContext } from "react";
import UserContext from "../../context/userContext";
import login from "../../api/services/login-service";
import "./LoginModal.css";

function LoginModal() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    var context = useContext(UserContext);

    const submit = async (context) => {
        const userObject = await login(username, password);
        context = userObject.data;
    };

    return (
        <div id="login-modal-container">
            <div id="login-modal-window">
                <div id="login-modal-input-container">
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
                <button
                    className="login-modal-button"
                    onClick={() => submit(context)}
                >
                    ENTER
                </button>
            </div>
        </div>
    );
}

export default LoginModal;
