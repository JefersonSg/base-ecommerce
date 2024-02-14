import Image from 'next/image';
import styles from './Favorito.module.css';

function Update() {
  return (
    <div className={styles.update}>
      <Image
        alt="Foto de Lapis para editar o produto"
        src={'/dashboard/edit.svg'}
        width={18}
        height={16}
      />
    </div>
  );
}

export default Update;
