import Image from 'next/image';
import styles from './FotosProduto.module.css';
import Slide from './SlideFotos';

function FotosProduto() {
  return (
    <div className={styles.fotosProduto}>
      <Image
        className={styles.fotoPrincipal}
        alt="Foto do produto"
        src={'/produto/produto1.png'}
        width={350}
        height={350}
      />
      <Slide />
    </div>
  );
}

export default FotosProduto;
