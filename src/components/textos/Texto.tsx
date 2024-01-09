import styles from './Texto.module.css';

export function Texto({ texto }: { texto: string }) {
  return <p className={styles.texto}>{texto}</p>;
}
