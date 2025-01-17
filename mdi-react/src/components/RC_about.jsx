import React from "react";
import ColoredContainers from "./Colored-Containers";
import "../styles/rc_general.scss";
import "./Colored-Containers.scss";

export default function RC_about() {
  return (
    <div>
      <ColoredContainers
        h2Text="About Us"
        h3Text="Using tech for good"
      >
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </ColoredContainers>
    </div>
  );
}
