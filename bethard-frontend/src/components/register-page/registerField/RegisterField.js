import React, { useState } from "react";
import "./RegisterField.css";
import register from "../../../shared/api/services/register-service";

function RegisterField() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirtday] = useState(Date.now);

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
        <br />
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input type="date" onChange={(e) => setBirtday(e.target.value)} />
        <button onClick={() => submit()}>ENTER</button>
      </div>
      <div id="texting">sadasdsad</div>
    </>
  );
}

export default RegisterField;
