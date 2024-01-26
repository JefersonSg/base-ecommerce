import Image from 'next/image';
import styles from './Estrelas.module.css';

function Estrelas() {
  return (
    <div className={styles.estrelas}>
      <Image
        alt="estrela cheia"
        src={'/produto/pagina/comentarios/estrela.svg'}
        width={16}
        height={16}
      />
      <Image
        alt="estrela cheia"
        src={'/produto/pagina/comentarios/estrela.svg'}
        width={16}
        height={16}
      />

      <Image
        alt="estrela cheia"
        src={'/produto/pagina/comentarios/estrela.svg'}
        width={16}
        height={16}
      />
      <Image
        alt="estrela cheia"
        src={'/produto/pagina/comentarios/estrela.svg'}
        width={16}
        height={16}
      />
      <Image
        alt="estrela cheia"
        src={'/produto/pagina/comentarios/meia_estrela.svg'}
        width={16}
        height={16}
      />
    </div>
  );
}

export default Estrelas;
