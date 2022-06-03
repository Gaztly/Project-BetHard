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

  const submit = async (e) => {
    e.preventDefault();
    const userObject = await login(username, password);

    if (userObject.status !== 200) {
      setErrorMessage(userObject.data);
      return;
    }

    setUser(userObject.data);
    localStorage.setItem(LocalStorage.user, JSON.stringify(userObject.data));

    navigate(RoutingPath.Home);
  };

  return (
    <div id="login-modal-container">
      <div id="login-modal-window">
        <div className="login-modal-warning-text">{errorMessage}</div>
        <form class="login-modal-form" onSubmit={(e) => submit(e)}>
          <div id="login-modal-input-container">
            <input
              className="login-modal-input"
              type="text"
              placeholder="Username or Email"
              onChange={(e) => setUsername(e.target.value)}
              required
            />

            <input
              className="login-modal-input"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="login-modal-button-container">
            <button className="login-modal-button" type="submit">
              LOG IN
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;
