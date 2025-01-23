import styles from "./Content_LR.module.scss";

function Content_LR(props) {
  const leftComponent = props.LeftComponent;
  const rightComponent = props.RightComponent;

  return (
    <section className={styles.lrContainer}>
      <div className={styles.leftBox}>{leftComponent}</div>
      <div className={styles.rightBox}>{rightComponent}</div>
    </section>
  );
}

export default Content_LR;
