import styles from './InformacoesProduto.module.css';
import Image from 'next/image';

interface infosProduto {
  cor: string;
  tamanho: string;
  comentario: string;
}

function InformacoesProduto({ cor, tamanho, comentario }: infosProduto) {
  return (
    <div className={styles.review}>
      <div className={styles.informacoes_produto}>
        <span>
          <p className={'texto'}>{`Cor: ${cor}`}</p>
        </span>
        <span>
          <p className={'texto'}>{`Tamanho: ${tamanho}`}</p>
        </span>
      </div>
      <div className={styles.comentario}>
        <p className={'texto'}>{comentario}</p>
      </div>
      <Image
        className={styles.image_review}
        alt="Imagem review do produto"
        src={'/produto/produto1.png'}
        width={104}
        height={132}
      />
    </div>
  );
}

export default InformacoesProduto;
