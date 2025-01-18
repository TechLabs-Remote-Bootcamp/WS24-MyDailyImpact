import React from "react";
import "./Colored-Containers.scss";

export default function ColoredContainers({ h2Text, h3Text, children }) {
  return (
    <div className="colored-containers">
      <div className="box h2-box">
        <h2>{h2Text}</h2>
      </div>
      <div className="box h3-box">
        <h3>{h3Text}</h3>
      </div>
      <div className="box text-box">{children}</div>
    </div>
  );
}
