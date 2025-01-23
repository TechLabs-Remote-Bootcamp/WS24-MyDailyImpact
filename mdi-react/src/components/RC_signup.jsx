import ColoredContainers from "./Colored-Containers";
import "./Colored-Containers.module.scss";
export default function RC_signup() {
  return (
    <div className="login-container">
      <ColoredContainers h2Text="Create your account" h3Text="">
        <div className="sign-up-form">
          <form className="form sign-up" action="">
            <label>
              Salutation:
              <select className="input" name="salutation">
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Ms">Ms</option>
                <option value="Dr">Dr</option>
                <option value="Not Specified">Not Specified</option>
              </select>
            </label>
            <label>
              First Name:
              <input className="input" type="text" placeholder="First Name" />
            </label>
            <label>
              Last Name:
              <input className="input" type="text" placeholder="Last Name" />
            </label>
            <label>
              Date of Birth:
              <input
                className="input"
                type="date"
                placeholder="Date of Birth"
              />
            </label>
            <label>
              Country:
              <select className="input" name="country">
                <option value="Country">Country Name</option>
                <option value="Other">Other</option>
              </select>
            </label>
            <label>
              Email:
              <input className="input" type="email" placeholder="Email" />
            </label>
            <label>
              Password:
              <input className="input" type="password" placeholder="Password" />
            </label>
            <label>
              Confirm Password:
              <input
                className="input"
                type="password"
                placeholder="Confirm Password"
              />
            </label>
          </form>
        </div>
      </ColoredContainers>
    </div>
  );
}
