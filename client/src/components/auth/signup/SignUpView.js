import React from "react";
import "../../forms/Forms.css";

export const SignUpView = () => {
  return (
    <div className="settingsWrapper">
      <h3>Sign up</h3>
      <div className="updateWrapper">
        <span>Username </span>
        <input />
        <br />
        <span>Profile picture URL </span>
        <input /> <br />
        <span>Password </span>
        <input /> <br />
        <span>Repeat password </span>
        <input /> <br />
        <button>Create account</button>
      </div>
    </div>
  );
};