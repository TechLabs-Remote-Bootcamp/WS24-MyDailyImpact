import styles from "./Button.module.scss";

const DeleteButton = ({
  children,
  onClick,
  disabled = false,
  className = "delete-button",
}) => {
  return (
    <button className={styles[className]} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default DeleteButton;