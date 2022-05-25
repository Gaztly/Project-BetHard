import React, { useState, useContext } from "react";
import login from "../../shared/api/services/login-service";
import UserContext from "../../context/userContext";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    var context = useContext(UserContext);

    const submit = async (context) => {
        const userObject = await login(username, password);
        context = userObject.data;
    };

    return (
        <>
            <div>
                This is the login page
                <br />
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
            <button onClick={() => submit(context)}>ENTER</button>
        </>
    );
}

export default Login;
