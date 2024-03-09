/* eslint-disable @typescript-eslint/no-misused-promises */
import Image from 'next/image';
import styles from './Produto.module.css';

import Link from 'next/link';
import Like from '../../lottie/Like';

function Produto({
  _id,
  img,
  name,
  price,
  promotion,
  link
}: {
  _id: string;
  img?: string[];
  name: string;
  price: string;
  link: string;
  promotion: boolean;
}) {
  return (
    <div>
      <Link
        href={{ pathname: '/produto', query: { _id: link } }}
        className={styles.produto}
      >
        <Like productId={_id} />
        <div className={styles.imagem_div}>
          {img && (
            <Image
              className={styles.imagem}
              alt="Imagem do produto"
              src={img[0]}
              width={185}
              height={243}
            />
          )}
        </div>
        <div className={styles.infos}>
          <p className={styles.nome_produto}>{name}</p>
          <span className={styles.preco}>R$ {price}</span>
        </div>
      </Link>
    </div>
  );
}

export default Produto;
