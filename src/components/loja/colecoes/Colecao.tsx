import Image from 'next/image';
import styles from './Colecao.module.css';

interface colecao {
  nome: string;
  img: string;
}

function Colecao({ nome, img }: colecao) {
  return (
    <div className={styles.colecao}>
      <Image
        className={styles.imagem}
        alt="Foto de capa da coleção"
        src={`/colecoes/${img}.png`}
        width={300}
        height={160}
      />
      <div className={styles.degrade}></div>
      <p className={styles.nome}>{nome}</p>
    </div>
  );
}

export default Colecao;
