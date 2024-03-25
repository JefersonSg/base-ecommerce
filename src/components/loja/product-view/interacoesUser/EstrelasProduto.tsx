import Estrelas from '@/src/components/compartilhado/estrelas/Estrelas';
import Link from 'next/link';
import styles from './interacoes.module.css';

export default async function EstrelasProduto({ stars }: { stars: number }) {
  return (
    <>
      <Link className={styles.estrelas} href={'#avaliacoes'} scroll={true}>
        <Estrelas stars={stars} type={1} />
      </Link>
    </>
  );
}
