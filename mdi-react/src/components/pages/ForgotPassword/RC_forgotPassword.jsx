import ColoredContainers from "../../core/ColoredContainers/Colored-Containers";
import Button from "../../core/Button/Button";
import styles from "../../../styles/forms.module.scss";

export default function RC_forgotPassword() {
  return (
    <>
      <ColoredContainers
        h2Text="Forgot Your Password"
        h3Text="Enter your email and we'll send you your password"
      >
        <div>
          <form className={styles["forgot-password-input"]} action="">
            <label>
              Email:
              <input
                className={styles["input"]}
                type="email"
                placeholder="Email"
              />
            </label>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </ColoredContainers>
    </>
  );
}
