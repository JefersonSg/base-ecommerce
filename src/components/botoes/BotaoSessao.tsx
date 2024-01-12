import styles from './BotaoSessao.module.css';

function BotaoSessao({ texto }: { texto: string }) {
  return <button className={styles.botao}>{texto}</button>;
}

export default BotaoSessao;
