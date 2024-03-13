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
      return porcentagem.toFixed(0);
    }
    return null;
  };

  return (
    <Link
      href={{ pathname: '/produto', query: { _id } }}
      className={`${styles.produto} ${
        promotionPorcent() ? styles.promotion_active : ''
      }`}
    >
      <Like productId={_id} />
      <div className={styles.imagem_div}>
        {promotionPorcent() ? (
          <span className={styles.promotion}>{`-${promotionPorcent()}%`}</span>
        ) : (
          ''
        )}
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

        <div
          className={`${styles.div_preco} ${
            promotionPorcent() ? styles.promocao_preco : ''
          }`}
        >
          <span className={`${styles.preco}`}>R$ {price.toFixed(2)}</span>
          {promotionPorcent() ? <p>R$ {promotionalPrice}</p> : ''}
        </div>
      </div>
    </Link>
  );
}

export default Produto;
