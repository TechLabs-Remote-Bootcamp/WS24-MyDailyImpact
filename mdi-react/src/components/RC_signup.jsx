import "../styles/rc_general.scss";

export default function RC_signup() {
  return (
    <div className="login-container">
      <h2>Create your account.</h2>
      <form className="form log-in" action="">
        <input className="email input" type="email" placeholder="Email" />
        <input className="password input" type="password" placeholder="Password"/>
      </form>
    </div>
  );
}
