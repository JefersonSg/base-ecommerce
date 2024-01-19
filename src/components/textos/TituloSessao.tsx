import styles from './TituloSessao.module.css';

export function TituloSessao({ titulo }: { titulo: string }) {
  return <h2 className={styles.titulo_sessao}>{titulo}</h2>;
}
