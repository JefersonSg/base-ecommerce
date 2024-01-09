import styles from './Subtitulo.module.css';

export function Subtitulo({ texto }: { texto: string }) {
  return <h2 className={styles.subtitulo}>{texto}</h2>;
}
