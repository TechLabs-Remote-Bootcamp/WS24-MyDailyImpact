import PropTypes from "prop-types";
import "./Content_LR.scss";
// import LeftComponent from
// import RightComponent from     -----What if we were to create separate components? I don't understand what's happening down there
import TreeWorld from "../images/treeWorld.png";

// const LeftComponent = () => {
//     <div className='left-box'>
//     </div>
// }

// const RightComponent = () => {
//     <div className='right-box'>

//     </div>
// }
function Content_LR({ LeftComponent, RightComponent }) {
  return (
    <div className="lr-container">
      <div>
        <LeftComponent className="left-box" />
      </div>
      <div>
        <RightComponent className="right-box" />
      </div>
    </div>
  );
}

Content_LR.propTypes = {
  LeftComponent: PropTypes.Component,
  RightComponent: PropTypes.Component,
};

export default Content_LR;

// import React from "react";
// import "./Content_LR.scss";
// import TreeWorld from "../images/treeWorld.png";

// export default function Content_LR() {
//   return (
//     <div className="lr-container">
//       <div className="left-box">
//         <img src={TreeWorld} />
//       </div>
//       <div className="right-box">
//         <h1>Welcome to My Daily Impact!</h1>
//         <p>
//           Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
//           natus culpa fuga praesentium, tempore dolores? Veritatis magni,
//           repudiandae ullam beatae, nisi nemo, provident ut quod tempore ipsum
//           dolorem aut debitis.
//         </p>
//       </div>
//     </div>
//   );
// }
