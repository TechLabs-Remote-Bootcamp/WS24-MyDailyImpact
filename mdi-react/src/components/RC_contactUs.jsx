import ColoredContainers from "./Colored-Containers";
import Button from "./Button";
import styles from "./Colored-Containers.module.scss";

export default function RC_contactUs() {
  return (
    <>
      <ColoredContainers h2Text="Contact Us" h3Text="">
        <div>
          <form className={styles["contact-us-form"]} action="">
            <label>
              Name:
              <input className={styles["input"]} placeholder="Name" />
            </label>
            <label>
              Email:
              <input className={styles["input"]} type="email" placeholder="Email" />
            </label>
            <label>
              Message:
              <textarea
                className={styles["input"]}
                cols="50"
                rows="10"
                placeholder="Write your message here"
              />
            </label>
            <Button type="submit">Send</Button>
          </form>
        </div>
      </ColoredContainers>
    </>
  );
}
