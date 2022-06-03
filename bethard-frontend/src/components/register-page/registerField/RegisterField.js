import React, { useState } from "react";
import "./RegisterField.css";
import register from "../../../shared/api/services/register-service";
import video from "../videos/balls.mp4";
import RoutingPath from "../../../Routes/RoutingPath";
import { useNavigate } from "react-router-dom";
import login from "../../../shared/api/services/login-service";

function RegisterField() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirtday] = useState(Date.now);
  const navigate = useNavigate();

  const submit = () => {
    register({
      username: username,
      password: password,
      email: email,
      birthday: birthday,
    });
  };
  return (
    <>
      <div id="billboard">
        <h1 id="regtext">Register</h1>

        <input
          id="reginput"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <i class="fa-solid fa-user"></i>
        <br />
        <input
          id="reginput"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <i class="fa-solid fa-key"></i>
        <br />

        <input
          id="reginput"
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <i class="fa-solid fa-envelope"></i>
        <br />
        <input
          id="reginput"
          type="date"
          onChange={(e) => setBirtday(e.target.value)}
        />
        <br />
        <button id="btn" onClick={() => submit()}>
          SUBMIT
        </button>
      </div>
      <video src={video} id="videos" autoPlay loop muted></video>
      {/* <div id="imgleft"></div> */}
    </>
  );
}

export default RegisterField;
