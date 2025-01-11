import PropTypes from 'prop-types';

function Button ({ Component, children }) {
  return (
    <>
    <Component/>
    <p>{children}</p>
    </>
  );
}

Button.propTypes = {
    children: PropTypes.node,
    Component: PropTypes.Component
}

export default Button;