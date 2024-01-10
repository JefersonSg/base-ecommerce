import Image from 'next/image';
import styles from './Vantagem.module.css';

function Vantagem({
  titulo,
  texto,
  image
}: {
  titulo: string;
  texto: string;
  image: string;
}) {
  return (
    <div className={styles.vantagem}>
      <Image
        alt={`imagem de ${image}`}
        src={`/banner/vantagens/${image}.svg`}
        width={65}
        height={35}
      />
      <div>
        <h2>{titulo}</h2>
        <p>{texto}</p>
      </div>
    </div>
  );
}

export default Vantagem;
