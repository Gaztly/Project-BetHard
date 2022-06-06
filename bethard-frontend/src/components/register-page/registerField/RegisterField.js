import React, { useState, useContext } from "react";
import "./RegisterField.css";
import register from "../../../shared/api/services/register-service";
import video from "../videos/balls.mp4";
import RoutingPath from "../../../Routes/RoutingPath";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../../shared/provider/UserProvider";
import LocalStorage from "../../../shared/storage/LocalStorage";
import loginUser from "../../../shared/api/services/login-service";
import { Loader } from "../../loader/Loader";

function RegisterField() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirtday] = useState(Date.now);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const [user, setUser] = useContext(UserContext);

    const submit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        const userObject = await register({
            username: username,
            password: password,
            email: email,
            birthday: birthday,
        });
        setIsLoading(false);
        if (userObject.status !== 200) {
            setErrorMessage(userObject.data);
            alert(errorMessage);
            return;
        }
        setUser(userObject.data);
        localStorage.setItem(
            LocalStorage.user,
            JSON.stringify(userObject.data)
        );

        loginUser(username, password);
        navigate(RoutingPath.Home);
    };

    return (
        <>
            <div id="billboard">
                <h1 id="regtext">Register</h1>
                <form onSubmit={(e) => submit(e)}>
                    <div className="reginput-container">
                        <input
                            id="username"
                            className="reginput"
                            type="text"
                            placeholder="username"
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="reginput-container">
                        <input
                            id="password"
                            className="reginput"
                            type="password"
                            placeholder="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className="reginput-container">
                        <input
                            id="email"
                            className="reginput"
                            type="email"
                            placeholder="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="reginput-container">
                        <input
                            id="birthday"
                            className="reginput"
                            type="date"
                            onChange={(e) => setBirtday(e.target.value)}
                        />
                    </div>
                    {isLoading ? (
                        <Loader />
                    ) : (
                        <button className="btn" onClick={() => submit()}>
                            SUBMIT
                        </button>
                    )}
                </form>
            </div>
            <video src={video} id="videos" autoPlay loop muted></video>
        </>
    );
}

export default RegisterField;
