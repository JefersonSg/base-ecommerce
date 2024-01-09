import styles from './Titulo.module.css';

export function Titulo({ titulo }: { titulo: string }) {
  return <h1 className={styles.titulo}>{titulo}</h1>;
}
