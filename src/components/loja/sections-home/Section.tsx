import BotaoSessao from '@/src/components/compartilhado/botoes/BotaoSessao';
import styles from './Section.module.css';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import React from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

import SlideProduct from './slide-produto';

async function Section({
  data,
  nomeSessao
}: {
  data: { products: ProductApi[] };
  nomeSessao: string;
}) {
  return (
    <div className={styles.section}>
      <h2 className="titulo_sessao">{nomeSessao}</h2>

      <div className={`${styles.gallery_layout_container} ${styles.home}`}>
        {data?.products?.map(
          (product, index) =>
            index <= 3 && (
              <Produto
                key={product._id}
                _id={product._id}
                link={product._id}
                name={product.name}
                price={product.price.toFixed(2).toString().replace('.', ',')}
                promotion={product.promotion}
                img={product.images}
              />
            )
        )}
      </div>
      <SlideProduct data={data} />
      <div className={styles.botao_sessao}>
        <BotaoSessao texto="Todos os produtos" />
      </div>
    </div>
  );
}

export default Section;
