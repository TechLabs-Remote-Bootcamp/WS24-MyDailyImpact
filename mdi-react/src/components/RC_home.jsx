import ColoredContainers from "./Colored-Containers";
import "../styles/rc_general.scss";
import "./Colored-Containers.scss";

export default function RC_Home() {
  return (
    <>
      <ColoredContainers
        h2Text="Get ready for your impact journey"
        h3Text="Every plant-based meal counts"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </ColoredContainers>
    </>
  );
}
