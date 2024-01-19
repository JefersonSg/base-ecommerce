import Link from 'next/link';
import styles from './BotaoSessao.module.css';

function BotaoSessao({ texto }: { texto: string }) {
  return (
    <Link href={'/produtos'}>
      <button className={styles.botao}>{texto}</button>
    </Link>
  );
}

export default BotaoSessao;
