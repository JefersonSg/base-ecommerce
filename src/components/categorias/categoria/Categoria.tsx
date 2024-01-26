import Image from 'next/image';
import styles from './Categoria.module.css';

function Categoria({ nome, img }: { nome: string; img: string }) {
  return (
    <li className={styles.categoria}>
      <Image
        className={styles.imagemCategoria}
        alt={`imagem da categoria ${nome}`}
        src={`/categorias/${img}.png`}
        width={104}
        height={104}
      />
      <span>{nome}</span>
    </li>
  );
}

export default Categoria;
