import ColoredContainers from "./Colored-Containers";
import "./Colored-Containers.module.scss";
import Button from "./Button";

export default function RC_contactUs() {
  return (
    <div className="contact-us-container">
      <ColoredContainers h2Text="Contact Us" h3Text="">
        <div className="contact-form">
          <form className="form " action="">
            <label className="input-label">
              Name:
              <input className="name input" placeholder="Name" />
            </label>
            <label className="input-label">
              Email:
              <input className="email input" type="email" placeholder="Email" />
            </label>
            <label className="input-label">
              Message:
              <textarea
                className="message input"
                cols="50"
                rows="10"
                placeholder="Write your message here"
              />
            </label>
          </form>
        </div>
      </ColoredContainers>
      <Button>Submit</Button>
    </div>
  );
}
