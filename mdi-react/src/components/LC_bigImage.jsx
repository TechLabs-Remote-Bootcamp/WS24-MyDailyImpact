import treeworld_big from "../images/treeWorld1250.png";
import treeworld_small from "../images/treeWorld.png";
import "./LC_bigImage.scss";

function LC_bigImage({ overflowText, textClass }) {
  return (
    <>
      <img
        id="treeWorld-big"
        className="image-box"
        src={treeworld_big}
        alt="A painted earth with many different trees along its circumfence line"
      />
      {/* <img
        id="treeWorld-small"
        className="image-box"
        src={treeworld_small}
        alt="A painted earth with many different trees along its circumfence line"
      /> */}
      {/* <p className={textClass}>{overflowText}</p> */}
    </>
  );
}

export default LC_bigImage;
