import React from "react";
import "../styles/header.scss";
import config from "@/config/config";
const Header = () => {
  return (
    <div className="header">
      <div className="logo-wrapper">
        <img src={config.LOGO_URL} alt="Jackpot Logo" />
        <h1>Jackpot</h1>
      </div>
      <div className="nav-items">
        <button>
          {" "}
          <img src="assets/search.png" alt="Search Icon" />
        </button>
        <button>
          {" "}
          <img src="assets/chat.png" alt="Chat Icon" />
        </button>
        <button className="login-button">Login</button>
        <button className="register-button">Register</button>
      </div>
    </div>
  );
};

export default Header;
