import treeworld from "../images/treeWorld.png";
import PropTypes from "prop-types";
import clsx from "clsx";

function LC_bigImage(rotationOn, overflowText, textClass) {
  const imageOption = clsx("big-image", {
    "big-image-rotate": rotationOn,
  });

  return (
    <div className="image-box">
      <img
        className={imageOption}
        src={treeworld}
        alt="A painted earth with many different trees along its circumfence line"
      />
      <p className={textClass}>{overflowText}</p>
    </div>
  );
}

LC_bigImage.propTypes = {
  rotationOn: PropTypes.bool.isRequired,
  overflowText: PropTypes.string,
  textClass: PropTypes.string,
};

export default LC_bigImage;
