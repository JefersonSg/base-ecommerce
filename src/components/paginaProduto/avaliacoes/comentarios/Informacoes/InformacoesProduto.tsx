import { Texto } from '@/src/components/textos/Texto';
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
          <Texto texto={`Cor: ${cor}`} />
        </span>
        <span>
          <Texto texto={`Tamanho: ${tamanho}`} />
        </span>
      </div>
      <div className={styles.comentario}>
        <Texto texto={comentario} />
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
