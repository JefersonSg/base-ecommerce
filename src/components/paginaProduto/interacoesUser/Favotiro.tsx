import Image from 'next/image';
import styles from './Favorito.module.css';

function Favotiro() {
  return (
    <div className={styles.favorito}>
      <Image
        alt="Foto de coração"
        src={'/produto/pagina/favorito.svg'}
        width={18}
        height={16}
      />
    </div>
  );
}

export default Favotiro;
