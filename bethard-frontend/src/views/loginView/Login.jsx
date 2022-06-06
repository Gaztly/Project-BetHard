import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../../components/loader/Loader";
import RoutingPath from "../../Routes/RoutingPath";
import login from "../../shared/api/services/login-service";
import { UserContext } from "../../shared/provider/UserProvider";
import LocalStorage from "../../shared/storage/LocalStorage";

import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const userObject = await login(username, password);
        setIsLoading(false);

        if (userObject.status !== 200) {
            setErrorMessage(userObject.data);
            return;
        }

        setUser(userObject.data);
        localStorage.setItem(
            LocalStorage.user,
            JSON.stringify(userObject.data)
        );

        navigate(RoutingPath.Home);
    };

    return (
        <div className="login-container">
            <div className="login-container-text">
                <div className="login-text-big">Log in</div>
                <div className="login-text-small">To bet harder</div>
            </div>
            <form className="login-form" onSubmit={(e) => submit(e)}>
                <div className="login-input-container">
                    <input
                        className="login-input-field"
                        type="text"
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="login-input-field"
                        type="password"
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button className="login-input-button" type="submit">
                            LOG IN
                        </button>
                    )}
                    <div style={{ color: "red" }}>{errorMessage}</div>
                </div>
            </form>
        </div>
    );
}

export default Login;
