import "./Login.scss";
import Content_LR from "../Content_LR";
import Button from "../Button.jsx";

export default function Login() {
  return (
    <>
      <h2>Welcome to the login.</h2>
      <form className="form log-in" action="">
        <input className="email" type="email" placeholder="Email" />
        <input type="password"/> 
      </form>
      <Button>Log in</Button>
    </>
  );
}
