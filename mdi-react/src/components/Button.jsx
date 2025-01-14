// import PropTypes from 'prop-types';

// function Button ({ Component, children }) {
//   return (
//     <>
//     <Component/>
//     <p>{children}</p>
//     </>
//   );
// }

// Button.propTypes = {
//     children: PropTypes.node,
//     Component: PropTypes.Component
// }

// export default Button;

import React from "react";
// import "../Button.scss";

const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button className="button" onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;