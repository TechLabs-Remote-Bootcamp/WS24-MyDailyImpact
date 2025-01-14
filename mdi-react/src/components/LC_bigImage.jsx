import treeworld from "../images/treeWorld.png";

function LC_bigImage({ overflowText, textClass }) {
  return (
    <div className="image-box">
      <img
        src={treeworld}
        alt="A painted earth with many different trees along its circumfence line"
      />
      {/* <p className={textClass}>{overflowText}</p> */}
    </div>
  );
}

export default LC_bigImage;
