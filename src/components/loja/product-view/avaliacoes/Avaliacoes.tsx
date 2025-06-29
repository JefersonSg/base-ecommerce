'use client';
import Separador from '@/src/components/compartilhado/Separador';
import styles from './Avaliacoes.module.css';
import Comentarios from './comentarios/Comentarios';
import Media from './media/Media';

function Avaliacoes() {
  return (
    <div className={styles.avaliacoes_container}>
      <Separador />
      <h1 className={styles.titulo_avaliação}>Avaliações</h1>
      <Media />
      <Comentarios />
    </div>
  );
}

export default Avaliacoes;
