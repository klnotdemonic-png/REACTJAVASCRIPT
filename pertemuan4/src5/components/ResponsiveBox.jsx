import styles from "./ResponsiveBox.module.css";

export default function ResponsiveBox() {
  return (
    <div className={styles.box}>
      Tampilan ini berubah saat ukuran layar berubah!
    </div>
  );
}
