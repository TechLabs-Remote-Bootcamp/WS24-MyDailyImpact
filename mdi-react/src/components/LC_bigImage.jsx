import treeworld from "../images/treeWorld800.png";
import "./LC_bigImage.scss";

function LC_bigImage({ overflowText, textClass }) {
  return (
    <>
      <img
        className="image-box"
        src={treeworld}
        alt="A painted earth with many different trees along its circumfence line"
      />
      {/* <p className={textClass}>{overflowText}</p> */}
    </>
  );
}

export default LC_bigImage;
