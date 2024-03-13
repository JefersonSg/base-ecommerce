/* eslint-disable @typescript-eslint/no-misused-promises */
import Image from 'next/image';
import styles from './Produto.module.css';

import Link from 'next/link';
import Like from '../../lottie/Like';
import { type ProductApi } from '@/src/shared/helpers/interfaces';

interface Props {
  productData: ProductApi;
}

function Produto({ productData }: Props) {
  const { _id, images, name, price, promotion, promotionalPrice } = productData;
  const promotionPorcent = () => {
    if (promotionalPrice && promotion) {
      const diferenca = price - promotionalPrice;
      const porcentagem = (diferenca / price) * 100;
      console.log(diferenca, name);
      return porcentagem.toFixed(2);
    }
    return undefined;
  };

  promotionPorcent();
  return (
    <Link
      href={{ pathname: '/produto', query: { _id } }}
      className={styles.produto}
    >
      <Like productId={_id} />
      <div className={styles.imagem_div}>
        <span className={styles.promotion}>Pro</span>
        {images && (
          <Image
            className={styles.imagem}
            alt="Imagem do produto"
            src={images[0]}
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
  );
}

export default Produto;
