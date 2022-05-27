import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RoutingPath from "../../Routes/RoutingPath";
import login from "../../shared/api/services/login-service";
import { UserContext } from "../../shared/provider/UserProvider";
import LocalStorage from "../../shared/storage/LocalStorage";

function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    var [user, setUser] = useContext(UserContext);

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
        <>
            <div>
                This is the login page
                <div style={{ color: "red" }}>{errorMessage}</div>
                <input
                    type="text"
                    placeholder="username"
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button onClick={() => submit()}>ENTER</button>
        </>
    );
}

export default Login;
