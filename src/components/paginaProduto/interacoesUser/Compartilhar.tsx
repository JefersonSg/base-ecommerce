import Image from 'next/image';
import styles from './Compartilhar.module.css';

function Compartilhar() {
  return (
    <div className={styles.compartilhar}>
      <Image
        alt="Foto de coração"
        src={'/produto/pagina/compartilhar.svg'}
        width={18}
        height={16}
      />
    </div>
  );
}

export default Compartilhar;
