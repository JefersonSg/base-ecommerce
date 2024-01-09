import styles from './TituloArea.module.css';

export function TituloArea({ titulo }: { titulo: string }) {
  return <h1 className={styles.tituloArea}>{titulo}</h1>;
}
