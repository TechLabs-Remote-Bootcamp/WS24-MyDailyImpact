import "./Colored-Containers.scss";

export default function ColoredContainers({ h2Text, h3Text, children }) {
  return (
    <div className="color-container">
      <div className="green-box">
        <h2>{h2Text}</h2>
      </div>
      <div className="blue-box">
        <h3>{h3Text}</h3>
      </div>
      <div className="text-box">{children}</div>
    </div>
  );
}
