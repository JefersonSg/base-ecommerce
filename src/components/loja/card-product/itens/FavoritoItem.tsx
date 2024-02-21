import Image from 'next/image';
import styles from './Favorito.module.css';

function FavoritoItem() {
  return (
    <div className={styles.favorito}>
      <Image
        alt="Imagem de coração"
        src="/produto/favorito.svg"
        width={17}
        height={14}
      />
    </div>
  );
}

export default FavoritoItem;
