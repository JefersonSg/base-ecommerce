/* eslint-disable @typescript-eslint/no-misused-promises */
import Image from 'next/image';
import styles from './Produto.module.css';

import Link from 'next/link';
import Like from '../../lottie/Like';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import { convertNumberInReal } from '@/src/shared/functions/convertNumberInReal';

interface Props {
  productData: ProductApi;
}

function Produto({ productData }: Props) {
  const { _id, images, name, price, coverPhoto1, promotion, promotionalPrice } =
    productData;

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
      href={`/produtos/produto/${_id}`}
      className={`${styles.produto} ${
        promotionPorcent() ? styles.promotion_active : ''
      }`}
    >
      <div className={styles.like}>
        <Like productId={_id} />
      </div>
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
            src={coverPhoto1?.length ? coverPhoto1 : images[0]}
            width={185}
            height={243}
            quality={75}
            placeholder="empty"
            sizes="(max-width: 1024px) 25vw, 50vw"
            property="true"
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
          <span className={`${styles.preco}`}>
            R$ {convertNumberInReal(price)}
          </span>
          {promotionPorcent() ? (
            <p>R$ {convertNumberInReal(promotionalPrice ?? 0)}</p>
          ) : (
            ''
          )}
        </div>
      </div>
    </Link>
  );
}

export default Produto;
