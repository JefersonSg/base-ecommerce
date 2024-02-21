import Image from 'next/image';
import styles from './Produto.module.css';

import Link from 'next/link';
import Like from '../../lottie/Like';

interface produto {
  img?: string[];
  name: string;
  price: string;
  link: string;
  promotion: boolean;
}

function Produto({ img, name, price, promotion, link }: produto) {
  return (
    <Link
      href={{ pathname: '/produto', query: { _id: link } }}
      className={styles.produto}
    >
      <Like />
      <div className={styles.imagem_div}>
        {img && (
          <Image
            className={styles.imagem}
            alt="Imagem do produto"
            src={img[0] ?? ''}
            width={144}
            height={206}
          />
        )}
      </div>
      <div className={styles.infos}>
        <p className={styles.nome_produto}>{name}</p>
        <span className={styles.preco}>R$ {price}</span>
      </div>
    </Link>
  );
}

export default Produto;
