import styles from "./Button.module.css";

export default function Button({ type = "default", children }) {
  return (
    <button className={`${styles.button} ${styles[type]}`}>
      {children}
    </button>
  );
}
