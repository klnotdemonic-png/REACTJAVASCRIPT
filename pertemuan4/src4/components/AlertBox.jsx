import styles from "./AlertBox.module.css";

export default function AlertBox({ type = "success", children }) {
  // type bisa: success, warning, error
  return (
    <div className={`${styles.alert} ${styles[type]}`}>
      {children}
    </div>
  );
}
