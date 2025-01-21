import treeworld_big from "../images/treeWorld1250.png";
import "./LC_bigImage.scss";

function LC_bigImage({ overflowText, textClass }) {
  return (
    <>
      <img
        id="treeWorld"
        className="image-box"
        src={treeworld_big}
        alt="A painted earth with many different trees along its circumfence line"
      />
    </>
  );
}

export default LC_bigImage;
