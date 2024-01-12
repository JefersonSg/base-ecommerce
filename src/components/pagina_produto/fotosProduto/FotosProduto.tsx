import Image from 'next/image';
import styles from './FotosProduto.module.css';
import Slide from './Slide';

function FotosProduto() {
  return (
    <div className={styles.fotosProduto}>
      <Image
        alt="Foto do produto"
        src={'/produto/produto1.png'}
        width={327}
        height={312}
      />
      <Slide />
    </div>
  );
}

export default FotosProduto;
