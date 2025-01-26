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

import styles from "./Button.module.scss";

const Button = ({ children, onClick, disabled = false }) => {
  return (
    <button
      className={styles["primary-button"]}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
