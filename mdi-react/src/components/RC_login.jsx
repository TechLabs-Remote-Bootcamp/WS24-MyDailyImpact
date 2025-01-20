import React from "react";
import ColoredContainers from "./Colored-Containers";
// import "../styles/rc_general.scss";
import "./Colored-Containers.scss";

export default function RC_login() {
  return (
    <div className="login-container">
      <ColoredContainers
      h2Text="Your daily impact"
      h3Text="Sign in to your account"
      > 
      <div className="login-form">    
        <form className="form log-in" action="">
          <input className="email input" type="email" placeholder="Email" />
          <input
            className="password input"
            type="password"
            placeholder="Password"
          />
        </form>
      </div>
      </ColoredContainers>
    </div>
  );
}
