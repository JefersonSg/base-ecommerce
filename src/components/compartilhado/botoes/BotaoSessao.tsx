import Link from 'next/link';
import styles from './BotaoSessao.module.css';

function BotaoSessao({ texto, link }: { texto: string; link: string }) {
  return (
    <Link href={'produtos/' + link}>
      <button className={styles.botao}>{texto}</button>
    </Link>
  );
}

export default BotaoSessao;
