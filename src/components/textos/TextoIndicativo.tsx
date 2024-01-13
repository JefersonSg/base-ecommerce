import styles from './TextoIndicativo.module.css';

export function TextoIndicativo({ texto }: { texto: string }) {
  return <span className={styles.texto}>{texto}</span>;
}
