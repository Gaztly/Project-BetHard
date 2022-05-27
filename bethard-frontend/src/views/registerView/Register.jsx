import React from "react";
import RegisterField from "../../components/register-page/registerField/RegisterField";
import RegisterBlurb from "../../components/register-page/registerBlurb/RegisterBlurb";
import "./Register.css";
import RegisterLogo from "../../components/register-page/registerLogo/RegisterLogo";

function Register() {
  return (
    <>
      <div id="grid-container">
        <RegisterBlurb />
        <RegisterField />
        <RegisterLogo />
      </div>
    </>
  );
}

export default Register;
