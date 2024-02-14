'use client';

import styles from './interacoes.module.css';
import Estrelas from './Estrelas';
import Favotiro from './Favotiro';
import Compartilhar from './Compartilhar';
import Update from './Update';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useParams } from 'next/navigation';
async function Interacoes() {
  const isAdmin = Cookies.get('isAdmin');
  const { id }: { id: string } = useParams();

  return (
    <div className={styles.interatividades}>
      <Estrelas />
      <div className={styles.interacao}>
        {isAdmin && (
          <Link href={`/dashboard/produtos/${id}`}>
            <Update />
          </Link>
        )}
        <Favotiro />
        <Compartilhar />
      </div>
    </div>
  );
}

export default Interacoes;
