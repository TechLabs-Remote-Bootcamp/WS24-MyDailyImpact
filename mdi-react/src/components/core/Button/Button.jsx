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
