import ColoredContainers from "./Colored-Containers";
import "./Colored-Containers.module.scss";
import styles from "./RC_login.module.scss";

export default function RC_login() {
  return (
    <div className="login-container">
      <ColoredContainers
        h2Text="Your daily impact"
        h3Text="Sign in to your account"
      >
        <div className="login-form">
          <form className="form log-in" action="">
            <label className="input-label">
              Email:
              <input
                className="email login-input"
                type="email"
                placeholder="Email"
              />
            </label>
            <label className="input-label">
              Password:
              <input
                className="password login-input"
                type="password"
                placeholder="Password"
              />
            </label>
          </form>
        </div>
      </ColoredContainers>
    </div>
  );
}
