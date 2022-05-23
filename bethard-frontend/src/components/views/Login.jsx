import React, { useState } from "react";
import login from "../../api/services/login-service";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const submit = () => {
        login(username, password);
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
            <button onClick={() => submit()}>ENTER</button>
        </>
    );
}

export default Login;
