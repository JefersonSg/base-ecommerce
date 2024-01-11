import styles from './TituloSessao.module.css';

export function TituloSessao({ titulo }: { titulo: string }) {
  return <h2 className={styles.tituloSessao}>{titulo}</h2>;
}
