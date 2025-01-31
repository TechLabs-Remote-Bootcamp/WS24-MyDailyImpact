import styles from "./Button.module.scss";

const Button = ({
  children,
  onClick,
  disabled = false,
  className = "primary-button",
}) => {
  return (
    <button className={styles[className]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;
