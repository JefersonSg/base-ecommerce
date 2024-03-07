import BotaoSessao from '@/src/components/compartilhado/botoes/BotaoSessao';
import styles from './Section.module.css';
import { getAllActiveProducts } from '@/src/shared/api/GETS';
import { type ProductApi } from '@/src/shared/helpers/interfaces';
import React from 'react';
import Produto from '@/src/components/loja/card-product/Produto';

async function Section({
  nomeSessao,
  quantidadeItens,
  IdSessao
}: {
  nomeSessao: string;
  quantidadeItens: number;
  IdSessao: string;
}) {
  const data: { products: ProductApi[] } = await getAllActiveProducts();

  return (
    <div className={styles.section}>
      <h2 className="titulo_sessao">{nomeSessao}</h2>

      <div className={styles.produtos}>
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
      <BotaoSessao texto="Todos os produtos" />
    </div>
  );
}

export default Section;
