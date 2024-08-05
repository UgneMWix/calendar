import styles from './Alert.module.css';
export function Alert({ text }: { text: string }) {
  return <div className={styles.alert}>{text}</div>;
}
