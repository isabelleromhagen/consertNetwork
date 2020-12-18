import React from 'react'
import '../Profile.css'

const SettingsView = () => {
    return (
      <div className="settingsWrapper">
        <h3>Settings</h3>
        <div className="updateWrapper">
          <span>Username </span>
          <input />
          <br />
          <span>Profile picture URL </span>
          <input /> <br />
          <span>Password </span>
          <input type="password" /> <br />
          <span>Repeat password </span>
          <input type="password" /> <br />
          <button>Update</button>
        </div>
        <div className="deleteWrapper">
          <h4>Delete account</h4>
          <span>Enter password</span> <br />
          <input type="password" /> <br />
          <button>Delete</button>
        </div>
      </div>
    );
}

export default SettingsView;