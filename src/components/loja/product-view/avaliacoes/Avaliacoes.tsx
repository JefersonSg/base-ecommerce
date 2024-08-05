'use client';
import TituloSection from '../sections-page-product/TituloSection';
import styles from './Avaliacoes.module.css';
import Comentarios from './comentarios/Comentarios';
import Media from './media/Media';

function Avaliacoes() {
  return (
    <div className={styles.avaliacoes_container}>
      <div className={styles.titulo}>
        <TituloSection texto="Avaliações" />
      </div>
      <Media />
      <Comentarios />
    </div>
  );
}

export default Avaliacoes;
